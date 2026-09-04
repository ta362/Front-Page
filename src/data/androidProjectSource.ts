export interface AndroidProjectFile {
  path: string;
  name: string;
  language: 'kotlin' | 'xml' | 'gradle' | 'markdown' | 'properties';
  category: 'Kotlin UI' | 'Kotlin Logic' | 'Manifest & Gradle' | 'Resources' | 'Docs';
  content: string;
}

export const ANDROID_PACKAGE_NAME = 'com.tanmoystudio.coverpagegenerator';

export const ANDROID_PROJECT_FILES: AndroidProjectFile[] = [
  {
    path: 'app/src/main/AndroidManifest.xml',
    name: 'AndroidManifest.xml',
    language: 'xml',
    category: 'Manifest & Gradle',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.tanmoystudio.coverpagegenerator">

    <!-- Scoped storage & media permissions for modern Android (Android 7.0 - 14+) -->
    <!-- On Android 10+ (API 29+), MediaStore API is used and requires NO write permissions -->
    <uses-permission
        android:name="android.permission.WRITE_EXTERNAL_STORAGE"
        android:maxSdkVersion="28" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"
        android:maxSdkVersion="32" />
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.CoverPageGenerator">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:windowSoftInputMode="adjustResize"
            android:theme="@style/Theme.CoverPageGenerator">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>`
  },
  {
    path: 'app/build.gradle.kts',
    name: 'app/build.gradle.kts',
    language: 'gradle',
    category: 'Manifest & Gradle',
    content: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.compose.compiler)
}

android {
    namespace = "com.tanmoystudio.coverpagegenerator"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.tanmoystudio.coverpagegenerator"
        minSdk = 24 // Android 7.0 (Nougat)
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.getByName("debug")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
    }
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.ui.graphics)
    implementation(libs.androidx.compose.ui.tooling.preview)
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.compose.material.icons.extended)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    implementation(libs.androidx.datastore.preferences)
    implementation(libs.coil.compose)
    
    debugImplementation(libs.androidx.compose.ui.tooling)
    debugImplementation(libs.androidx.compose.ui.test.manifest)
}`
  },
  {
    path: 'gradle/libs.versions.toml',
    name: 'gradle/libs.versions.toml',
    language: 'gradle',
    category: 'Manifest & Gradle',
    content: `[versions]
agp = "8.3.2"
kotlin = "2.0.0"
coreKtx = "1.13.1"
lifecycleRuntimeKtx = "2.8.4"
activityCompose = "1.9.1"
composeBom = "2024.06.00"
material3 = "1.2.1"
datastore = "1.1.1"
coil = "2.6.0"

[libraries]
androidx-core-ktx = { group = "androidx.core", name = "core-ktx", version.ref = "coreKtx" }
androidx-lifecycle-runtime-ktx = { group = "androidx.lifecycle", name = "lifecycle-runtime-ktx", version.ref = "lifecycleRuntimeKtx" }
androidx-lifecycle-viewmodel-compose = { group = "androidx.lifecycle", name = "lifecycle-viewmodel-compose", version.ref = "lifecycleRuntimeKtx" }
androidx-activity-compose = { group = "androidx.activity", name = "activity-compose", version.ref = "activityCompose" }
androidx-compose-bom = { group = "androidx.compose", name = "compose-bom", version.ref = "composeBom" }
androidx-compose-ui = { group = "androidx.compose.ui", name = "ui" }
androidx-compose-ui-graphics = { group = "androidx.compose.ui", name = "ui-graphics" }
androidx-compose-ui-tooling = { group = "androidx.compose.ui", name = "ui-tooling" }
androidx-compose-ui-tooling-preview = { group = "androidx.compose.ui", name = "ui-tooling-preview" }
androidx-compose-ui-test-manifest = { group = "androidx.compose.ui", name = "ui-test-manifest" }
androidx-compose-material3 = { group = "androidx.compose.material3", name = "material3" }
androidx-compose-material-icons-extended = { group = "androidx.compose.material", name = "material-icons-extended" }
androidx-datastore-preferences = { group = "androidx.datastore", name = "datastore-preferences", version.ref = "datastore" }
coil-compose = { group = "io.coil-kt", name = "coil-compose", version.ref = "coil" }

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
compose-compiler = { id = "org.jetbrains.kotlin.plugin.compose", version.ref = "kotlin" }`
  },
  {
    path: 'app/src/main/java/com/tanmoystudio/coverpagegenerator/MainActivity.kt',
    name: 'MainActivity.kt',
    language: 'kotlin',
    category: 'Kotlin UI',
    content: `package com.tanmoystudio.coverpagegenerator

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.tanmoystudio.coverpagegenerator.ui.CoverPageGeneratorScreen
import com.tanmoystudio.coverpagegenerator.ui.theme.CoverPageGeneratorTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            CoverPageGeneratorTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    CoverPageGeneratorScreen()
                }
            }
        }
    }
}`
  },
  {
    path: 'app/src/main/java/com/tanmoystudio/coverpagegenerator/model/CoverPageData.kt',
    name: 'CoverPageData.kt',
    language: 'kotlin',
    category: 'Kotlin Logic',
    content: `package com.tanmoystudio.coverpagegenerator.model

import android.net.Uri

enum class SubmissionType(val displayName: String) {
    ASSIGNMENT("Assignment"),
    LAB_COPY("Lab Copy"),
    PROJECT_REPORT("Project Report"),
    THESIS("Thesis / Dissertation"),
    TERM_PAPER("Term Paper")
}

data class CoverPageData(
    val collegeName: String = "",
    val courseTitle: String = "",
    val courseCode: String = "",
    val submissionType: SubmissionType = SubmissionType.ASSIGNMENT,
    val facultyName: String = "",
    val designation: String = "",
    val department: String = "",
    val studentName: String = "",
    val studentId: String = "",
    val rollNumber: String = "",
    val registrationNumber: String = "",
    val semester: String = "",
    val session: String = "",
    val submissionDate: String = "", // Formatted as DD-MM-YYYY
    val logoUri: Uri? = null
) {
    fun isValid(): Boolean {
        return collegeName.isNotBlank() &&
               courseTitle.isNotBlank() &&
               courseCode.isNotBlank() &&
               facultyName.isNotBlank() &&
               studentName.isNotBlank() &&
               studentId.isNotBlank()
    }

    fun getValidationError(): String? {
        return when {
            collegeName.isBlank() -> "Please enter College / University Name."
            courseTitle.isBlank() -> "Please enter Course Title."
            courseCode.isBlank() -> "Please enter Course Code."
            facultyName.isBlank() -> "Please enter Faculty Name."
            studentName.isBlank() -> "Please enter Student Name."
            studentId.isBlank() -> "Please enter Student ID."
            else -> null
        }
    }
}`
  },
  {
    path: 'app/src/main/java/com/tanmoystudio/coverpagegenerator/ui/CoverPageGeneratorScreen.kt',
    name: 'CoverPageGeneratorScreen.kt',
    language: 'kotlin',
    category: 'Kotlin UI',
    content: `package com.tanmoystudio.coverpagegenerator.ui

import android.app.DatePickerDialog
import android.net.Uri
import android.widget.Toast
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.animation.*
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import coil.compose.AsyncImage
import com.tanmoystudio.coverpagegenerator.model.SubmissionType
import com.tanmoystudio.coverpagegenerator.ui.components.CoverPageA4Canvas
import com.tanmoystudio.coverpagegenerator.util.ImageExportManager
import com.tanmoystudio.coverpagegenerator.viewmodel.CoverPageViewModel
import java.util.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CoverPageGeneratorScreen(
    viewModel: CoverPageViewModel = viewModel()
) {
    val context = LocalContext.current
    val formState by viewModel.formState.collectAsState()
    val isPreviewGenerated by viewModel.isPreviewGenerated.collectAsState()
    var showClearDialog by remember { mutableStateOf(false) }
    var isExporting by remember { mutableStateOf(false) }

    // Image Picker for College Logo
    val photoPickerLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent()
    ) { uri: Uri? ->
        uri?.let { viewModel.updateLogo(it) }
    }

    // Date Picker Dialog
    val calendar = Calendar.getInstance()
    val datePickerDialog = DatePickerDialog(
        context,
        { _, year, month, dayOfMonth ->
            val formattedDate = String.format(Locale.US, "%02d-%02d-%04d", dayOfMonth, month + 1, year)
            viewModel.updateDate(formattedDate)
        },
        calendar.get(Calendar.YEAR),
        calendar.get(Calendar.MONTH),
        calendar.get(Calendar.DAY_OF_MONTH)
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = "Assignment / Lab Copy",
                            fontWeight = FontWeight.Bold,
                            fontSize = 18.sp
                        )
                        Text(
                            text = "Cover Page Generator (A4)",
                            fontSize = 13.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surfaceVariant
                ),
                actions = {
                    IconButton(onClick = { showClearDialog = true }) {
                        Icon(Icons.Default.DeleteOutline, contentDescription = "Clear Form")
                    }
                }
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .verticalScroll(rememberScrollState())
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Form Card
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
            ) {
                Column(
                    modifier = Modifier.padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Text(
                        text = "Academic Details",
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.primary,
                        fontSize = 16.sp
                    )

                    OutlinedTextField(
                        value = formState.collegeName,
                        onValueChange = { viewModel.updateCollegeName(it) },
                        label = { Text("College / University Name *") },
                        leadingIcon = { Icon(Icons.Default.AccountBalance, contentDescription = null) },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp)
                    )

                    OutlinedTextField(
                        value = formState.courseTitle,
                        onValueChange = { viewModel.updateCourseTitle(it) },
                        label = { Text("Course Title *") },
                        leadingIcon = { Icon(Icons.Default.Book, contentDescription = null) },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp)
                    )

                    OutlinedTextField(
                        value = formState.courseCode,
                        onValueChange = { viewModel.updateCourseCode(it) },
                        label = { Text("Course Code *") },
                        leadingIcon = { Icon(Icons.Default.Code, contentDescription = null) },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp)
                    )

                    // Submission Type Dropdown / Segmented buttons
                    Text("Submission Type", fontWeight = FontWeight.Medium, fontSize = 14.sp)
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        SubmissionType.values().take(2).forEach { type ->
                            FilterChip(
                                selected = formState.submissionType == type,
                                onClick = { viewModel.updateSubmissionType(type) },
                                label = { Text(type.displayName) },
                                modifier = Modifier.weight(1f)
                            )
                        }
                    }

                    Divider(modifier = Modifier.padding(vertical = 4.dp))

                    Text(
                        text = "Faculty Details (Submitted To)",
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.primary,
                        fontSize = 16.sp
                    )

                    OutlinedTextField(
                        value = formState.facultyName,
                        onValueChange = { viewModel.updateFacultyName(it) },
                        label = { Text("Faculty Name *") },
                        leadingIcon = { Icon(Icons.Default.Person, contentDescription = null) },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp)
                    )

                    OutlinedTextField(
                        value = formState.designation,
                        onValueChange = { viewModel.updateDesignation(it) },
                        label = { Text("Designation") },
                        leadingIcon = { Icon(Icons.Default.Badge, contentDescription = null) },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp)
                    )

                    OutlinedTextField(
                        value = formState.department,
                        onValueChange = { viewModel.updateDepartment(it) },
                        label = { Text("Department") },
                        leadingIcon = { Icon(Icons.Default.Business, contentDescription = null) },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp)
                    )

                    Divider(modifier = Modifier.padding(vertical = 4.dp))

                    Text(
                        text = "Student Details (Submitted By)",
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.primary,
                        fontSize = 16.sp
                    )

                    OutlinedTextField(
                        value = formState.studentName,
                        onValueChange = { viewModel.updateStudentName(it) },
                        label = { Text("Student Name *") },
                        leadingIcon = { Icon(Icons.Default.School, contentDescription = null) },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp)
                    )

                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        OutlinedTextField(
                            value = formState.studentId,
                            onValueChange = { viewModel.updateStudentId(it) },
                            label = { Text("Student ID *") },
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(10.dp)
                        )
                        OutlinedTextField(
                            value = formState.rollNumber,
                            onValueChange = { viewModel.updateRollNumber(it) },
                            label = { Text("Roll No") },
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(10.dp)
                        )
                    }

                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        OutlinedTextField(
                            value = formState.registrationNumber,
                            onValueChange = { viewModel.updateRegistrationNumber(it) },
                            label = { Text("Registration No") },
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(10.dp)
                        )
                        OutlinedTextField(
                            value = formState.semester,
                            onValueChange = { viewModel.updateSemester(it) },
                            label = { Text("Semester") },
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(10.dp)
                        )
                    }

                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        OutlinedTextField(
                            value = formState.session,
                            onValueChange = { viewModel.updateSession(it) },
                            label = { Text("Session") },
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(10.dp)
                        )
                        OutlinedTextField(
                            value = formState.submissionDate,
                            onValueChange = { viewModel.updateDate(it) },
                            label = { Text("Date (DD-MM-YYYY)") },
                            trailingIcon = {
                                IconButton(onClick = { datePickerDialog.show() }) {
                                    Icon(Icons.Default.CalendarToday, contentDescription = "Pick Date")
                                }
                            },
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(10.dp)
                        )
                    }

                    // Logo Upload Section
                    Text("College / University Logo", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        OutlinedButton(
                            onClick = { photoPickerLauncher.launch("image/*") },
                            shape = RoundedCornerShape(8.dp)
                        ) {
                            Icon(Icons.Default.UploadFile, contentDescription = null)
                            Spacer(Modifier.width(8.dp))
                            Text(if (formState.logoUri == null) "Select Logo" else "Change Logo")
                        }

                        if (formState.logoUri != null) {
                            AsyncImage(
                                model = formState.logoUri,
                                contentDescription = "Logo Preview",
                                modifier = Modifier
                                    .size(50.dp)
                                    .clip(RoundedCornerShape(8.dp))
                                    .border(1.dp, Color.LightGray, RoundedCornerShape(8.dp))
                            )
                            IconButton(onClick = { viewModel.updateLogo(null) }) {
                                Icon(Icons.Default.Close, contentDescription = "Remove Logo", tint = Color.Red)
                            }
                        }
                    }
                }
            }

            // Action Buttons
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Button(
                    onClick = {
                        val error = formState.getValidationError()
                        if (error != null) {
                            Toast.makeText(context, error, Toast.LENGTH_SHORT).show()
                        } else {
                            viewModel.generatePreview()
                            Toast.makeText(context, "Cover page preview generated!", Toast.LENGTH_SHORT).show()
                        }
                    },
                    modifier = Modifier
                        .weight(1f)
                        .height(52.dp),
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF1E88E5))
                ) {
                    Icon(Icons.Default.Visibility, contentDescription = null)
                    Spacer(Modifier.width(8.dp))
                    Text("Generate Preview", fontWeight = FontWeight.Bold)
                }

                Button(
                    onClick = {
                        if (!isPreviewGenerated) {
                            Toast.makeText(context, "Please generate preview first!", Toast.LENGTH_SHORT).show()
                            return@Button
                        }
                        isExporting = true
                        ImageExportManager.exportCoverPageToDownloads(
                            context = context,
                            coverData = formState,
                            onSuccess = { path ->
                                isExporting = false
                                Toast.makeText(context, "Cover page saved successfully to Downloads.", Toast.LENGTH_LONG).show()
                            },
                            onError = { err ->
                                isExporting = false
                                Toast.makeText(context, "Failed to save: $err", Toast.LENGTH_SHORT).show()
                            }
                        )
                    },
                    modifier = Modifier
                        .weight(1f)
                        .height(52.dp),
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF2E7D32)),
                    enabled = !isExporting
                ) {
                    if (isExporting) {
                        CircularProgressIndicator(modifier = Modifier.size(24.dp), color = Color.White)
                    } else {
                        Icon(Icons.Default.FileDownload, contentDescription = null)
                        Spacer(Modifier.width(8.dp))
                        Text("Download JPG", fontWeight = FontWeight.Bold)
                    }
                }
            }

            // A4 Preview Area
            AnimatedVisibility(
                visible = isPreviewGenerated,
                enter = fadeIn() + expandVertically()
            ) {
                Card(
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    elevation = CardDefaults.cardElevation(defaultElevation = 6.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(
                        modifier = Modifier.padding(16.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(
                            text = "A4 Live Preview (210mm x 297mm)",
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF1565C0),
                            modifier = Modifier.padding(bottom = 12.dp)
                        )
                        
                        // Custom Canvas view that renders exact A4 Academic Cover Page
                        CoverPageA4Canvas(
                            data = formState,
                            modifier = Modifier
                                .fillMaxWidth()
                                .aspectRatio(210f / 297f)
                                .clip(RoundedCornerShape(4.dp))
                        )
                    }
                }
            }
        }
    }

    // Clear Confirmation Dialog
    if (showClearDialog) {
        AlertDialog(
            onDismissRequest = { showClearDialog = false },
            title = { Text("Clear Form") },
            text = { Text("Are you sure you want to clear all fields and logo?") },
            confirmButton = {
                TextButton(onClick = {
                    viewModel.clearForm()
                    showClearDialog = false
                    Toast.makeText(context, "Form cleared.", Toast.LENGTH_SHORT).show()
                }) {
                    Text("Clear All", color = Color.Red)
                }
            },
            dismissButton = {
                TextButton(onClick = { showClearDialog = false }) {
                    Text("Cancel")
                }
            }
        )
    }
}`
  },
  {
    path: 'app/src/main/java/com/tanmoystudio/coverpagegenerator/ui/components/CoverPageA4Canvas.kt',
    name: 'CoverPageA4Canvas.kt',
    language: 'kotlin',
    category: 'Kotlin UI',
    content: `package com.tanmoystudio.coverpagegenerator.ui.components

import android.graphics.Typeface
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.drawIntoCanvas
import androidx.compose.ui.graphics.nativeCanvas
import com.tanmoystudio.coverpagegenerator.model.CoverPageData

@Composable
fun CoverPageA4Canvas(
    data: CoverPageData,
    modifier: Modifier = Modifier
) {
    Canvas(
        modifier = modifier.background(Color.White)
    ) {
        val w = size.width
        val h = size.height
        val centerX = w / 2f

        // Draw Academic Border
        val borderMargin = w * 0.04f
        val innerMargin = w * 0.048f

        drawRect(
            color = Color.Black,
            topLeft = Offset(borderMargin, borderMargin),
            size = Size(w - (2 * borderMargin), h - (2 * borderMargin)),
            style = androidx.compose.ui.graphics.drawscope.Stroke(width = 3.5f)
        )
        drawRect(
            color = Color.Black,
            topLeft = Offset(innerMargin, innerMargin),
            size = Size(w - (2 * innerMargin), h - (2 * innerMargin)),
            style = androidx.compose.ui.graphics.drawscope.Stroke(width = 1.2f)
        )

        drawIntoCanvas { canvas ->
            val nativeCanvas = canvas.nativeCanvas

            // Paint configurations with Times New Roman / Serif styling
            val textPaint = android.graphics.Paint().apply {
                color = android.graphics.Color.BLACK
                textAlign = android.graphics.Paint.Align.CENTER
                typeface = Typeface.create(Typeface.SERIF, Typeface.BOLD)
                isAntiAlias = true
            }

            var currentY = h * 0.09f

            // 1. SUBMISSION TYPE
            textPaint.textSize = w * 0.055f
            textPaint.isFakeBoldText = true
            nativeCanvas.drawText(data.submissionType.displayName.uppercase(), centerX, currentY, textPaint)

            // 2. COLLEGE NAME
            currentY += h * 0.05f
            textPaint.textSize = w * 0.052f
            data.collegeName.split("\\n").forEach { line ->
                nativeCanvas.drawText(line.trim(), centerX, currentY, textPaint)
                currentY += h * 0.035f
            }

            // 3. COURSE TITLE & CODE
            currentY += h * 0.02f
            textPaint.textSize = w * 0.038f
            nativeCanvas.drawText("Course Title: " + data.courseTitle, centerX, currentY, textPaint)

            currentY += h * 0.032f
            nativeCanvas.drawText("Course Code: " + data.courseCode, centerX, currentY, textPaint)

            // 4. SUBMITTED TO SECTION
            currentY = h * 0.44f
            textPaint.textSize = w * 0.046f
            textPaint.isFakeBoldText = true
            nativeCanvas.drawText("SUBMITTED TO", centerX, currentY, textPaint)

            currentY += h * 0.04f
            textPaint.textSize = w * 0.042f
            nativeCanvas.drawText(data.facultyName, centerX, currentY, textPaint)

            textPaint.typeface = Typeface.create(Typeface.SERIF, Typeface.NORMAL)
            textPaint.textSize = w * 0.034f
            if (data.designation.isNotBlank()) {
                currentY += h * 0.028f
                nativeCanvas.drawText(data.designation, centerX, currentY, textPaint)
            }
            if (data.department.isNotBlank()) {
                currentY += h * 0.028f
                nativeCanvas.drawText(data.department, centerX, currentY, textPaint)
            }
            if (data.collegeName.isNotBlank()) {
                currentY += h * 0.028f
                nativeCanvas.drawText(data.collegeName.replace("\\n", " "), centerX, currentY, textPaint)
            }

            // 5. SUBMITTED BY SECTION
            currentY = h * 0.67f
            textPaint.typeface = Typeface.create(Typeface.SERIF, Typeface.BOLD)
            textPaint.textSize = w * 0.046f
            nativeCanvas.drawText("SUBMITTED BY", centerX, currentY, textPaint)

            currentY += h * 0.04f
            textPaint.textSize = w * 0.042f
            nativeCanvas.drawText(data.studentName, centerX, currentY, textPaint)

            textPaint.typeface = Typeface.create(Typeface.SERIF, Typeface.NORMAL)
            textPaint.textSize = w * 0.034f

            val studentDetails = listOfNotNull(
                if (data.studentId.isNotBlank()) "Student ID: " + data.studentId else null,
                if (data.rollNumber.isNotBlank()) "Roll No: " + data.rollNumber else null,
                if (data.registrationNumber.isNotBlank()) "Registration No: " + data.registrationNumber else null,
                if (data.department.isNotBlank()) "Department: " + data.department else null,
                if (data.semester.isNotBlank()) "Semester: " + data.semester else null,
                if (data.session.isNotBlank()) "Session: " + data.session else null,
                if (data.submissionDate.isNotBlank()) "Date of Submission: " + data.submissionDate else null
            )

            studentDetails.forEach { detail ->
                currentY += h * 0.028f
                nativeCanvas.drawText(detail, centerX, currentY, textPaint)
            }
        }
    }
}`
  },
  {
    path: 'app/src/main/java/com/tanmoystudio/coverpagegenerator/util/ImageExportManager.kt',
    name: 'ImageExportManager.kt',
    language: 'kotlin',
    category: 'Kotlin Logic',
    content: `package com.tanmoystudio.coverpagegenerator.util

import android.content.ContentValues
import android.content.Context
import android.graphics.*
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.provider.MediaStore
import com.tanmoystudio.coverpagegenerator.model.CoverPageData
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.File
import java.io.FileOutputStream
import java.io.OutputStream

object ImageExportManager {

    /**
     * Renders A4 page at 2480 x 3508 pixels (Standard 300 DPI high-res A4)
     * and exports as JPEG into Downloads folder via modern MediaStore API.
     */
    fun exportCoverPageToDownloads(
        context: Context,
        coverData: CoverPageData,
        onSuccess: (String) -> Unit,
        onError: (String) -> Unit
    ) {
        try {
            // A4 dimensions in pixels at 300 DPI: 2480 x 3508
            val width = 2480
            val height = 3508

            val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
            val canvas = Canvas(bitmap)

            // Fill pure white background
            canvas.drawColor(android.graphics.Color.WHITE)

            // Draw Academic Double Border
            val outerMargin = width * 0.04f
            val innerMargin = width * 0.048f
            val borderPaint = Paint().apply {
                color = android.graphics.Color.BLACK
                style = Paint.Style.STROKE
                strokeWidth = 14f
                isAntiAlias = true
            }
            canvas.drawRect(outerMargin, outerMargin, width - outerMargin, height - outerMargin, borderPaint)

            borderPaint.strokeWidth = 4f
            canvas.drawRect(innerMargin, innerMargin, width - innerMargin, height - innerMargin, borderPaint)

            val textPaint = Paint().apply {
                color = android.graphics.Color.BLACK
                textAlign = Paint.Align.CENTER
                typeface = Typeface.create(Typeface.SERIF, Typeface.BOLD)
                isAntiAlias = true
            }

            val centerX = width / 2f
            var y = height * 0.09f

            // 1. SUBMISSION TYPE
            textPaint.textSize = 100f
            canvas.drawText(coverData.submissionType.displayName.uppercase(), centerX, y, textPaint)

            // 2. COLLEGE NAME
            y += 150f
            textPaint.textSize = 90f
            coverData.collegeName.split("\\n").forEach { line ->
                canvas.drawText(line.trim(), centerX, y, textPaint)
                y += 110f
            }

            // 3. COURSE
            y += 60f
            textPaint.textSize = 68f
            canvas.drawText("Course Title: " + coverData.courseTitle, centerX, y, textPaint)
            y += 90f
            canvas.drawText("Course Code: " + coverData.courseCode, centerX, y, textPaint)

            // 4. LOGO (if present)
            if (coverData.logoUri != null) {
                try {
                    val inputStream = context.contentResolver.openInputStream(coverData.logoUri)
                    val logoBitmap = BitmapFactory.decodeStream(inputStream)
                    inputStream?.close()
                    if (logoBitmap != null) {
                        val targetLogoSize = 480
                        val scaledLogo = Bitmap.createScaledBitmap(logoBitmap, targetLogoSize, targetLogoSize, true)
                        canvas.drawBitmap(scaledLogo, centerX - (targetLogoSize / 2f), y + 60f, null)
                    }
                } catch (e: Exception) {
                    // Fallback gracefully if logo stream cannot be decoded
                }
            }

            // 5. SUBMITTED TO
            y = height * 0.44f
            textPaint.textSize = 85f
            textPaint.typeface = Typeface.create(Typeface.SERIF, Typeface.BOLD)
            canvas.drawText("SUBMITTED TO", centerX, y, textPaint)

            y += 120f
            textPaint.textSize = 76f
            canvas.drawText(coverData.facultyName, centerX, y, textPaint)

            textPaint.typeface = Typeface.create(Typeface.SERIF, Typeface.NORMAL)
            textPaint.textSize = 62f
            if (coverData.designation.isNotBlank()) {
                y += 85f
                canvas.drawText(coverData.designation, centerX, y, textPaint)
            }
            if (coverData.department.isNotBlank()) {
                y += 85f
                canvas.drawText(coverData.department, centerX, y, textPaint)
            }
            if (coverData.collegeName.isNotBlank()) {
                y += 85f
                canvas.drawText(coverData.collegeName.replace("\\n", " "), centerX, y, textPaint)
            }

            // 6. SUBMITTED BY
            y = height * 0.67f
            textPaint.typeface = Typeface.create(Typeface.SERIF, Typeface.BOLD)
            textPaint.textSize = 85f
            canvas.drawText("SUBMITTED BY", centerX, y, textPaint)

            y += 120f
            textPaint.textSize = 76f
            canvas.drawText(coverData.studentName, centerX, y, textPaint)

            textPaint.typeface = Typeface.create(Typeface.SERIF, Typeface.NORMAL)
            textPaint.textSize = 62f

            val details = listOfNotNull(
                if (coverData.studentId.isNotBlank()) "Student ID: " + coverData.studentId else null,
                if (coverData.rollNumber.isNotBlank()) "Roll No: " + coverData.rollNumber else null,
                if (coverData.registrationNumber.isNotBlank()) "Registration No: " + coverData.registrationNumber else null,
                if (coverData.department.isNotBlank()) "Department: " + coverData.department else null,
                if (coverData.semester.isNotBlank()) "Semester: " + coverData.semester else null,
                if (coverData.session.isNotBlank()) "Session: " + coverData.session else null,
                if (coverData.submissionDate.isNotBlank()) "Date of Submission: " + coverData.submissionDate else null
            )

            details.forEach { detail ->
                y += 85f
                canvas.drawText(detail, centerX, y, textPaint)
            }

            // Save Bitmap to Downloads via MediaStore
            val filename = "Cover_Page_A4_" + System.currentTimeMillis() + ".jpg"
            var outputStream: OutputStream? = null
            var savedUri: Uri? = null

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                val contentValues = ContentValues().apply {
                    put(MediaStore.MediaColumns.DISPLAY_NAME, filename)
                    put(MediaStore.MediaColumns.MIME_TYPE, "image/jpeg")
                    put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS)
                }
                val resolver = context.contentResolver
                val uri = resolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, contentValues)
                if (uri != null) {
                    savedUri = uri
                    outputStream = resolver.openOutputStream(uri)
                }
            } else {
                val downloadsDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS)
                if (!downloadsDir.exists()) downloadsDir.mkdirs()
                val imageFile = File(downloadsDir, filename)
                outputStream = FileOutputStream(imageFile)
            }

            outputStream?.use { out ->
                bitmap.compress(Bitmap.CompressFormat.JPEG, 98, out)
            }

            onSuccess(filename)
        } catch (e: Exception) {
            onError(e.localizedMessage ?: "Unknown export error")
        }
    }
}`
  },
  {
    path: 'app/src/main/java/com/tanmoystudio/coverpagegenerator/util/PreferencesManager.kt',
    name: 'PreferencesManager.kt',
    language: 'kotlin',
    category: 'Kotlin Logic',
    content: `package com.tanmoystudio.coverpagegenerator.util

import android.content.Context
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import com.tanmoystudio.coverpagegenerator.model.CoverPageData
import com.tanmoystudio.coverpagegenerator.model.SubmissionType
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

val Context.dataStore by preferencesDataStore(name = "cover_page_prefs")

class PreferencesManager(private val context: Context) {

    companion object {
        val KEY_COLLEGE = stringPreferencesKey("college_name")
        val KEY_COURSE_TITLE = stringPreferencesKey("course_title")
        val KEY_COURSE_CODE = stringPreferencesKey("course_code")
        val KEY_SUBMISSION_TYPE = stringPreferencesKey("submission_type")
        val KEY_FACULTY = stringPreferencesKey("faculty_name")
        val KEY_DESIGNATION = stringPreferencesKey("designation")
        val KEY_DEPARTMENT = stringPreferencesKey("department")
        val KEY_STUDENT_NAME = stringPreferencesKey("student_name")
        val KEY_STUDENT_ID = stringPreferencesKey("student_id")
        val KEY_ROLL = stringPreferencesKey("roll_number")
        val KEY_REG = stringPreferencesKey("registration_number")
        val KEY_SEMESTER = stringPreferencesKey("semester")
        val KEY_SESSION = stringPreferencesKey("session")
        val KEY_DATE = stringPreferencesKey("submission_date")
    }

    val formDataFlow: Flow<CoverPageData> = context.dataStore.data.map { prefs ->
        CoverPageData(
            collegeName = prefs[KEY_COLLEGE] ?: "",
            courseTitle = prefs[KEY_COURSE_TITLE] ?: "",
            courseCode = prefs[KEY_COURSE_CODE] ?: "",
            submissionType = try {
                SubmissionType.valueOf(prefs[KEY_SUBMISSION_TYPE] ?: "ASSIGNMENT")
            } catch (e: Exception) {
                SubmissionType.ASSIGNMENT
            },
            facultyName = prefs[KEY_FACULTY] ?: "",
            designation = prefs[KEY_DESIGNATION] ?: "",
            department = prefs[KEY_DEPARTMENT] ?: "",
            studentName = prefs[KEY_STUDENT_NAME] ?: "",
            studentId = prefs[KEY_STUDENT_ID] ?: "",
            rollNumber = prefs[KEY_ROLL] ?: "",
            registrationNumber = prefs[KEY_REG] ?: "",
            semester = prefs[KEY_SEMESTER] ?: "",
            session = prefs[KEY_SESSION] ?: "",
            submissionDate = prefs[KEY_DATE] ?: ""
        )
    }

    suspend fun saveFormData(data: CoverPageData) {
        context.dataStore.edit { prefs ->
            prefs[KEY_COLLEGE] = data.collegeName
            prefs[KEY_COURSE_TITLE] = data.courseTitle
            prefs[KEY_COURSE_CODE] = data.courseCode
            prefs[KEY_SUBMISSION_TYPE] = data.submissionType.name
            prefs[KEY_FACULTY] = data.facultyName
            prefs[KEY_DESIGNATION] = data.designation
            prefs[KEY_DEPARTMENT] = data.department
            prefs[KEY_STUDENT_NAME] = data.studentName
            prefs[KEY_STUDENT_ID] = data.studentId
            prefs[KEY_ROLL] = data.rollNumber
            prefs[KEY_REG] = data.registrationNumber
            prefs[KEY_SEMESTER] = data.semester
            prefs[KEY_SESSION] = data.session
            prefs[KEY_DATE] = data.submissionDate
        }
    }

    suspend fun clearFormData() {
        context.dataStore.edit { it.clear() }
    }
}`
  },
  {
    path: 'app/src/main/java/com/tanmoystudio/coverpagegenerator/viewmodel/CoverPageViewModel.kt',
    name: 'CoverPageViewModel.kt',
    language: 'kotlin',
    category: 'Kotlin Logic',
    content: `package com.tanmoystudio.coverpagegenerator.viewmodel

import android.app.Application
import android.net.Uri
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.tanmoystudio.coverpagegenerator.model.CoverPageData
import com.tanmoystudio.coverpagegenerator.model.SubmissionType
import com.tanmoystudio.coverpagegenerator.util.PreferencesManager
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class CoverPageViewModel(application: Application) : AndroidViewModel(application) {
    private val prefsManager = PreferencesManager(application)

    private val _formState = MutableStateFlow(CoverPageData())
    val formState: StateFlow<CoverPageData> = _formState.asStateFlow()

    private val _isPreviewGenerated = MutableStateFlow(false)
    val isPreviewGenerated: StateFlow<Boolean> = _isPreviewGenerated.asStateFlow()

    init {
        // Load saved form data from local DataStore
        viewModelScope.launch {
            prefsManager.formDataFlow.collect { savedData ->
                if (savedData.collegeName.isNotBlank() || savedData.studentName.isNotBlank()) {
                    _formState.value = savedData
                }
            }
        }
    }

    fun updateCollegeName(value: String) = update { it.copy(collegeName = value) }
    fun updateCourseTitle(value: String) = update { it.copy(courseTitle = value) }
    fun updateCourseCode(value: String) = update { it.copy(courseCode = value) }
    fun updateSubmissionType(type: SubmissionType) = update { it.copy(submissionType = type) }
    fun updateFacultyName(value: String) = update { it.copy(facultyName = value) }
    fun updateDesignation(value: String) = update { it.copy(designation = value) }
    fun updateDepartment(value: String) = update { it.copy(department = value) }
    fun updateStudentName(value: String) = update { it.copy(studentName = value) }
    fun updateStudentId(value: String) = update { it.copy(studentId = value) }
    fun updateRollNumber(value: String) = update { it.copy(rollNumber = value) }
    fun updateRegistrationNumber(value: String) = update { it.copy(registrationNumber = value) }
    fun updateSemester(value: String) = update { it.copy(semester = value) }
    fun updateSession(value: String) = update { it.copy(session = value) }
    fun updateDate(value: String) = update { it.copy(submissionDate = value) }
    fun updateLogo(uri: Uri?) = update { it.copy(logoUri = uri) }

    private fun update(reducer: (CoverPageData) -> CoverPageData) {
        val updated = reducer(_formState.value)
        _formState.value = updated
        viewModelScope.launch {
            prefsManager.saveFormData(updated)
        }
    }

    fun generatePreview() {
        _isPreviewGenerated.value = true
    }

    fun clearForm() {
        _formState.value = CoverPageData()
        _isPreviewGenerated.value = false
        viewModelScope.launch {
            prefsManager.clearFormData()
        }
    }
}`
  },
  {
    path: 'app/src/main/res/values/strings.xml',
    name: 'strings.xml',
    language: 'xml',
    category: 'Resources',
    content: `<resources>
    <string name="app_name">Cover Page Generator</string>
    <string name="title_generator">Assignment / Lab Copy Cover Page Generator</string>
    <string name="generate_preview">Generate Preview</string>
    <string name="download_jpg">Download JPG</string>
    <string name="clear_form">Clear Form</string>
    <string name="preview_first_prompt">Please generate preview first.</string>
    <string name="save_success">Cover page saved successfully to Downloads.</string>
</resources>`
  },
  {
    path: 'app/src/main/res/values/colors.xml',
    name: 'colors.xml',
    language: 'xml',
    category: 'Resources',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="primary_blue">#1E88E5</color>
    <color name="primary_dark">#0D47A1</color>
    <color name="accent_green">#2E7D32</color>
    <color name="background_light">#F8FAFC</color>
    <color name="card_bg">#FFFFFF</color>
    <color name="text_primary">#0F172A</color>
    <color name="text_secondary">#475569</color>
</resources>`
  },
  {
    path: 'app/src/main/res/values/themes.xml',
    name: 'themes.xml',
    language: 'xml',
    category: 'Resources',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="Theme.CoverPageGenerator" parent="android:Theme.Material.Light.NoActionBar">
        <item name="android:statusBarColor">#0D47A1</item>
        <item name="android:windowLightStatusBar">false</item>
    </style>
</resources>`
  },
  {
    path: 'README.md',
    name: 'README.md',
    language: 'markdown',
    category: 'Docs',
    content: `# Assignment / Lab Copy Cover Page Generator (Android Native)

A production-ready native Android application built with **Kotlin** and **Jetpack Compose** that allows students to generate, preview, and download crisp A4 cover pages for university assignments and lab copies.

## Features
- **Modern Jetpack Compose UI**: Clean Material 3 cards, responsive layout, date picker, photo picker for college logo.
- **Strict A4 Layout**: Exact 210mm x 297mm aspect ratio rendering with academic serif typography.
- **High-Res MediaStore Export**: Renders at 300 DPI (2480x3508px) and saves directly to the Android \`Downloads\` folder.
- **Local Persistence**: Remembers entered form details across launches using AndroidX DataStore.
- **Zero WebView Dependency**: 100% native Android Kotlin rendering.

## How to Build & Run in Android Studio
1. Open **Android Studio** (Hedgehog / Iguana / Ladybug or newer).
2. Click **File -> New -> Open...** and select this extracted directory.
3. Allow Gradle to sync dependencies.
4. Connect an Android device or launch an emulator (Android 7.0+ / API 24+).
5. Click **Run 'app'** (Shift + F10) or build APK via **Build -> Build Bundle(s) / APK(s) -> Build APK(s)**.
`
  }
];
