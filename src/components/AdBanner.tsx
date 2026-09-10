import React, { useEffect, useRef } from 'react';
import { ADMOB_CONFIG } from '../config/admobConfig';

interface AdBannerProps {
  className?: string;
  adSlot?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  className = '',
  adSlot = ADMOB_CONFIG.adSlot,
}) => {
  const adRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
      }
    } catch (err) {
      // Ignore ads script errors in development / preview or ad-block environments
      console.debug('AdMob/AdSense push note:', err);
    }
  }, []);

  return (
    <div
      className={`w-full max-w-4xl mx-auto my-4 overflow-hidden rounded-2xl border border-white/70 bg-white/45 backdrop-blur-md p-2.5 shadow-sm text-center ${className}`}
      id="admob-banner-container"
    >
      <div className="flex items-center justify-between px-2 mb-1.5 text-[10px] font-semibold text-slate-400">
        <span className="uppercase tracking-wider">ADVERTISEMENT</span>
        <span className="text-[9px] text-slate-400/80">Google Ad</span>
      </div>

      <div className="min-h-[90px] w-full flex items-center justify-center bg-white/30 rounded-xl overflow-hidden">
        {/* Google AdSense / Web Responsive Banner */}
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', minWidth: '280px', width: '100%', minHeight: '90px' }}
          data-ad-client={ADMOB_CONFIG.publisherId}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};
