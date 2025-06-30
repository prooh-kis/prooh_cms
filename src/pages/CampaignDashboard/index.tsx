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
    const sendMessage = () => {
      if (!iframeRef.current?.contentWindow) return;
      
      const message = {
        type: "USERINFO_FOR_VENDOR_DASHBOARD",
        data: { userInfo },
        timestamp: new Date().toISOString(),
      };

      try {
        // Get the iframe's origin from its src
        const iframeSrc = iframeRef.current.src;
        const targetOrigin = new URL(iframeSrc).origin;
        
        iframeRef.current.contentWindow.postMessage(message, targetOrigin);
        console.log(`Message sent to iframe (${targetOrigin}):`, message);
      } catch (error) {
        console.error('Failed to post message to iframe:', error);
      }
    };

    const handleMessage = (event: MessageEvent) => {
      console.log(event)
      // Listen for a ready message from the iframe
      if (event.data === 'IFRAME_READY') {
        console.log('Received IFRAME_READY message, sending user info');
        sendMessage();
      }
    };

    // Add message listener
    window.addEventListener('message', handleMessage);

    // Initial send attempt (in case iframe is already loaded)
    const checkAndSend = () => {
      try {
        if (iframeRef.current?.contentWindow) {
          sendMessage();
        }
      } catch (e) {
        console.log('Iframe not ready, waiting for IFRAME_READY message...');
      }
    };

    // Try to send immediately (in case iframe is already loaded)
    checkAndSend();

    // Also try after a delay in case iframe loads slowly
    const timeoutId = setTimeout(checkAndSend, 2000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(timeoutId);
    };
  }, [userInfo]);
  return (
    <div>
      <iframe
        ref={iframeRef}
        className="w-full h-[100vh] border"
        // src={`https://plan.prooh.ai/campaignDashboard/${campaignId}?embed=true`}
        src={`https://developmentplanning.vercel.app/campaignDashboard/${campaignId}?embed=true`}

        // src={`http://localhost:3000/campaignDashboard/${campaignId}?embed=true`}

        title="Campaign Dashboard"
      />
    </div>
  );
};
