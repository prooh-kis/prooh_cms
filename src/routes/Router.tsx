import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePageLayout } from "../components";

import {
  AuthPage,
  CampaignDetailsPage,
  CampaignsPage,
  CreateCampaignPage,
  ForgetPassword,
  LandingPage,
  MonitoringPage,
  MyCreativesPage,
  PageNotFound,
  ScreenDetailsPage,
  ScreensPage,
  UpdatePassword,
  VerifyEmail,
} from "../pages";

import { PrivateRoute } from "./PrivateRoute";
import { AUTH, CAMPAIGNS_DETAILS, CAMPAIGNS_LIST, CREATE_CAMPAIGN, FORGET_PASSWORD, HOME, MY_CREATIVES, SCREEN_CAMPAIGN_MONITORING, SCREENS_DETAILS, SCREENS_LIST, UPDATE_PASSWORD, VERIFY_EMAIL } from "./routes";

const Routers: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AUTH}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <AuthPage />
            </PrivateRoute>
          }
        />
        <Route
          path={VERIFY_EMAIL}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <VerifyEmail />
            </PrivateRoute>
          }
        />
        <Route
          path={FORGET_PASSWORD}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <ForgetPassword />
            </PrivateRoute>
          }
        />
            <Route
          path={UPDATE_PASSWORD}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <UpdatePassword />
            </PrivateRoute>
          }
        />
        <Route
          path={HOME}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <LandingPage />
            </PrivateRoute>
          }
        />

        <Route
          path={CREATE_CAMPAIGN}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <CreateCampaignPage />
            </PrivateRoute>
          }
        />

        <Route
          path={SCREENS_LIST}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <ScreensPage />
            </PrivateRoute>
          }
        />
        <Route
          path={SCREENS_DETAILS}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <ScreenDetailsPage />
            </PrivateRoute>
          }
        />

        <Route
          path={CAMPAIGNS_LIST}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <CampaignsPage />
            </PrivateRoute>
          }
        />
        <Route
          path={CAMPAIGNS_DETAILS}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <CampaignDetailsPage />
            </PrivateRoute>
          }
        />
        <Route
          path={MY_CREATIVES}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <MyCreativesPage />
            </PrivateRoute>
          }
        />
        <Route
          path={SCREEN_CAMPAIGN_MONITORING}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <MonitoringPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
