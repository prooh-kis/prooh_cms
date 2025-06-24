const cleanUrl = (path) => {
  const baseUrl = process.env.REACT_APP_PROOH_SERVER?.replace(
    /[\"\']/g,
    ""
  ).replace(/\/$/, "");
  return `${baseUrl}${path}`;
};

export const queriesV2 = cleanUrl("/api/v2/landing");
export const monitoringV2 = cleanUrl("/api/v2/monitoring");
export const screenV2 = cleanUrl("/api/v2/screens");
export const campaignV2 = cleanUrl("/api/v2/campaigns");
export const creativeV2 = cleanUrl("/api/v2/creatives");
export const userV1 = cleanUrl("/api/v1/users");
export const analyticsV1 = cleanUrl("/api/v1/analytics");
export const planningRouterURL = cleanUrl("/api/v2/planning");
export const monitoringURL = cleanUrl("/api/v2/monitoring");
export const dashboardURL = cleanUrl("/api/v2/dashboard");
export const couponURL = cleanUrl("/api/v2/coupon");
export const clientAgencyURL = cleanUrl("/api/v2/clientAgency");
export const analyticsURL = cleanUrl("/api/v1/analytics");
export const billInvoiceURL = cleanUrl("/api/v2/billInvoice");
export const awsV1 = cleanUrl("/api/v1/aws");

export const cmsURL = "https://prooh-cms.vercel.app/sign-in";
export const planningURL = "https://plan.prooh.ai/sign-up";
export const dmpURL = "https://prooh-dmp.vercel.app/";
