"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

interface GHLFormProps {
  src: string;
  id: string;
  formName: string;
  formId: string;
}

export default function GHLForm({ src, id, formName, formId }: GHLFormProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const lastHeight = useRef<number>(0);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newHeight = entry.contentRect.height;
        // If height drops significantly, form was submitted — scroll wrapper into view
        if (lastHeight.current > 0 && newHeight < lastHeight.current - 100) {
          setTimeout(() => {
            wrapperRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
        lastHeight.current = newHeight;
      }
    });

    observer.observe(iframe);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef}>
      <iframe
        ref={iframeRef}
        src={src}
        style={{ width: "100%", height: "100%", minHeight: "600px", border: "none", borderRadius: "8px", display: "block" }}
        id={id}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={formName}
        data-layout-iframe-id={id}
        data-form-id={formId}
        title={formName}
        scrolling="no"
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </div>
  );
}
