import { DEPARTMENT_FACULTY_LIST, DepartmentFacultyGroup, FacultyMember } from '../data/facultyData';

const STORAGE_KEY_FACULTY = 'tcea_custom_faculty_list_v1';
const STORAGE_KEY_SYNC_URL = 'tcea_faculty_sync_url_v1';
const STORAGE_KEY_AUTO_SYNC = 'tcea_faculty_auto_sync_enabled_v1';
const STORAGE_KEY_LAST_SYNC = 'tcea_faculty_last_sync_timestamp_v1';

// Custom event for reactive UI updates
const FACULTY_UPDATE_EVENT = 'tcea_faculty_data_updated';

/**
 * Retrieves the currently saved faculty groups or defaults to initial roster
 */
export function getSavedFacultyGroups(): DepartmentFacultyGroup[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_FACULTY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading saved faculty data:', e);
  }
  return DEPARTMENT_FACULTY_LIST;
}

/**
 * Saves modified faculty groups to localStorage and notifies listeners
 */
export function saveFacultyGroups(groups: DepartmentFacultyGroup[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_FACULTY, JSON.stringify(groups));
    window.dispatchEvent(new CustomEvent(FACULTY_UPDATE_EVENT, { detail: groups }));
  } catch (e) {
    console.error('Error saving faculty data:', e);
  }
}

/**
 * Resets faculty groups back to the initial official catalog
 */
export function resetFacultyGroupsToDefault(): DepartmentFacultyGroup[] {
  try {
    localStorage.removeItem(STORAGE_KEY_FACULTY);
    window.dispatchEvent(new CustomEvent(FACULTY_UPDATE_EVENT, { detail: DEPARTMENT_FACULTY_LIST }));
  } catch (e) {
    console.error('Error resetting faculty data:', e);
  }
  return DEPARTMENT_FACULTY_LIST;
}

/**
 * Gets configured sync URL (Google Sheets CSV or JSON URL)
 */
export function getSyncUrl(): string {
  try {
    return localStorage.getItem(STORAGE_KEY_SYNC_URL) || '';
  } catch {
    return '';
  }
}

/**
 * Saves sync URL
 */
export function setSyncUrl(url: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_SYNC_URL, url.trim());
  } catch (e) {
    console.error('Error saving sync URL:', e);
  }
}

/**
 * Checks if auto-sync on app load is enabled
 */
export function isAutoSyncEnabled(): boolean {
  try {
    const val = localStorage.getItem(STORAGE_KEY_AUTO_SYNC);
    return val === null ? true : val === 'true';
  } catch {
    return true;
  }
}

/**
 * Sets auto-sync flag
 */
export function setAutoSyncEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY_AUTO_SYNC, enabled ? 'true' : 'false');
  } catch (e) {
    console.error('Error setting auto-sync flag:', e);
  }
}

/**
 * Gets last sync timestamp
 */
export function getLastSyncTimestamp(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY_LAST_SYNC);
  } catch {
    return null;
  }
}

/**
 * Parses Google Sheets CSV or standard CSV
 * Expected format: Department/Branch (e.g. ME / CSE), Teacher Name, Designation, Qualification
 */
export function parseCSVToFaculty(csvText: string, currentGroups: DepartmentFacultyGroup[]): DepartmentFacultyGroup[] {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) {
    throw new Error('CSV file is empty or does not contain data rows.');
  }

  // Deep clone current structure so department metadata and aliases are preserved
  const updatedGroups: DepartmentFacultyGroup[] = currentGroups.map((g) => ({
    ...g,
    faculties: [],
  }));

  // Helper to parse CSV line handling quotes
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim().replace(/^"|"$/g, ''));
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim().replace(/^"|"$/g, ''));
    return result;
  };

  const headerLine = lines[0].toLowerCase();
  const hasHeader =
    headerLine.includes('name') ||
    headerLine.includes('dept') ||
    headerLine.includes('designation') ||
    headerLine.includes('branch');

  const startIndex = hasHeader ? 1 : 0;

  for (let i = startIndex; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    if (cols.length < 2) continue;

    const deptRaw = cols[0].trim();
    const name = cols[1].trim();
    const designation = cols[2] ? cols[2].trim() : 'Faculty';
    const qualification = cols[3] ? cols[3].trim() : '';

    if (!name) continue;

    // Find corresponding department group
    const targetGroup = updatedGroups.find((g) => {
      const dLower = deptRaw.toLowerCase();
      return (
        g.shortCode.toLowerCase() === dLower ||
        g.aliases.some((a) => a.toLowerCase() === dLower) ||
        g.departmentName.toLowerCase().includes(dLower)
      );
    });

    if (targetGroup) {
      targetGroup.faculties.push({
        name,
        designation,
        ...(qualification ? { qualification } : {}),
      });
    }
  }

  // Verify that at least one faculty member was parsed
  const totalParsed = updatedGroups.reduce((acc, g) => acc + g.faculties.length, 0);
  if (totalParsed === 0) {
    throw new Error('No valid faculty records found in CSV. Ensure columns: Department, Name, Designation, Qualification.');
  }

  // For any department with 0 parsed members, retain previous faculty so data is not accidentally wiped out
  return updatedGroups.map((g) => {
    if (g.faculties.length === 0) {
      const prev = currentGroups.find((pg) => pg.shortCode === g.shortCode);
      return prev ? { ...g, faculties: prev.faculties } : g;
    }
    return g;
  });
}

/**
 * Fetches and updates faculty list from an online URL (Google Sheets or JSON)
 */
export async function syncFacultyFromRemote(
  url: string,
  currentGroups: DepartmentFacultyGroup[]
): Promise<{ success: boolean; totalCount: number; message: string; groups: DepartmentFacultyGroup[] }> {
  const cleanUrl = url.trim();
  if (!cleanUrl) {
    throw new Error('Sync URL is empty');
  }

  // Format Google Sheets URL: if user pasted a standard Google Sheet edit link, convert to CSV export link
  let fetchUrl = cleanUrl;
  if (cleanUrl.includes('docs.google.com/spreadsheets/d/')) {
    const match = cleanUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (match && match[1]) {
      const sheetId = match[1];
      // If it doesn't already have export?format=csv
      if (!cleanUrl.includes('export?format=csv') && !cleanUrl.includes('output=csv')) {
        fetchUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
      }
    }
  }

  const response = await fetch(fetchUrl, {
    cache: 'no-cache',
    headers: { Accept: 'text/csv, application/json, text/plain' },
  });

  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status}: Failed to fetch from remote URL`);
  }

  const contentType = response.headers.get('content-type') || '';
  const text = await response.text();

  let newGroups: DepartmentFacultyGroup[];

  if (contentType.includes('application/json') || text.trim().startsWith('[') || text.trim().startsWith('{')) {
    // JSON format
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      // Check if it's DepartmentFacultyGroup[] or flat array
      if (parsed[0] && Array.isArray(parsed[0].faculties)) {
        newGroups = parsed as DepartmentFacultyGroup[];
      } else {
        // Flat array of faculty objects
        newGroups = currentGroups.map((g) => ({ ...g, faculties: [] }));
        for (const item of parsed) {
          const dept = (item.department || item.dept || item.branch || '').toString().toLowerCase();
          const target = newGroups.find((g) => g.shortCode.toLowerCase() === dept || g.aliases.includes(dept));
          if (target && item.name) {
            target.faculties.push({
              name: item.name,
              designation: item.designation || 'Faculty',
              qualification: item.qualification,
            });
          }
        }
      }
    } else {
      throw new Error('Invalid JSON format for faculty directory.');
    }
  } else {
    // CSV format (Google Sheets)
    newGroups = parseCSVToFaculty(text, currentGroups);
  }

  const totalCount = newGroups.reduce((acc, g) => acc + g.faculties.length, 0);

  // Save to localStorage
  saveFacultyGroups(newGroups);
  setSyncUrl(cleanUrl);
  localStorage.setItem(STORAGE_KEY_LAST_SYNC, new Date().toLocaleString());

  return {
    success: true,
    totalCount,
    message: `Successfully synchronized ${totalCount} faculty members from remote source.`,
    groups: newGroups,
  };
}

/**
 * Finds matching department group by name or alias against a dynamic list
 */
export function getFacultyGroupFromList(
  groups: DepartmentFacultyGroup[],
  deptQuery: string
): DepartmentFacultyGroup | undefined {
  if (!deptQuery || !deptQuery.trim()) return undefined;
  const raw = deptQuery.trim().toLowerCase();
  const clean = raw.replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
  const words = clean.split(' ');

  // 1. Exact match on shortCode (e.g. 'me', 'ece')
  const codeMatch = groups.find(
    (g) => g.shortCode.toLowerCase() === raw || words.includes(g.shortCode.toLowerCase())
  );
  if (codeMatch) return codeMatch;

  // 2. Exact match on aliases
  const aliasMatch = groups.find((g) =>
    g.aliases.some((a) => a.toLowerCase() === raw || clean === a.toLowerCase())
  );
  if (aliasMatch) return aliasMatch;

  // 3. Partial or substring match in aliases or full department name
  return groups.find((group) => {
    const deptNorm = group.departmentName.toLowerCase();
    if (deptNorm.includes(raw) || raw.includes(deptNorm)) return true;
    return group.aliases.some((alias) => {
      const a = alias.toLowerCase();
      return clean.includes(a) || words.includes(a);
    });
  });
}
