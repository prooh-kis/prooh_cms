import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const CampaignDashboard = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { pathname } = useLocation();
  const campaignId = pathname.split("/")[2] || "";

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  useEffect(() => {
    const handleLoad = () => {
      // This message will be sent to the iframe
      const message = {
        type: "USERINFO_FOR_VENDOR_DASHBOARD",
        data: { userInfo },
        timestamp: new Date().toISOString(),
      };

      // Wait for the iframe to be fully loaded
      if (iframeRef.current && iframeRef.current.contentWindow) {
        // Send the message to the iframe
        iframeRef.current.contentWindow.postMessage(
          message,
          "https://cms.prooh.ai"
        );

        // Also log it in the parent console for debugging
        console.log("Message sent to iframe:", message);
      }
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener("load", handleLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", handleLoad);
      }
    };
  }, []);
  return (
    <div>
      <iframe
        ref={iframeRef}
        className="w-full h-[100vh] border"
        src={`https://plan.prooh.ai/campaignDashboard/${campaignId}?embed=true`}
        title="Campaign Dashboard"
      />
    </div>
  );
};
