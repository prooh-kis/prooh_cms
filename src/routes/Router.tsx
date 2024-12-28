import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePageLayout } from "../components";

import {
  AuthPage,
  CampaignDetailsPage,
  CampaignsPage,
  CreateCampaignPage,
  EditCampaign,
  ForgetPassword,
  MonitoringPage,
  MyCreativesPage,
  PageNotFound,
  ScreenDetailsPage,
  ScreensPage,
  UpdatePassword,
  VerifyEmail,
} from "../pages";

import { PrivateRoute } from "./PrivateRoute";
import {
  SIGN_IN,
  CAMPAIGNS_DETAILS,
  CAMPAIGNS_LIST,
  CREATE_CAMPAIGN,
  EDIT_CAMPAIGN,
  FORGET_PASSWORD,
  HOME,
  MY_CREATIVES,
  SCREEN_CAMPAIGN_MONITORING,
  SCREENS_DETAILS,
  SCREENS_LIST,
  UPDATE_PASSWORD,
  VERIFY_EMAIL,
  SIGN_UP,
} from "./routes";
import { PublicRoute } from "./PublicRoute";
import { SignIn } from "../pages/AuthPage/SignIn";
import { SignUp } from "../pages/AuthPage/SignUp";
import { AppDashBoardLayout } from "../pages/AppDashBoardLayout";

const Routers: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={SIGN_IN}
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />

        <Route
          path={SIGN_UP}
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
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
            <PublicRoute>
              <ForgetPassword />
            </PublicRoute>
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
          path={SCREENS_LIST}
          element={
            <AppDashBoardLayout>
              <ScreensPage />
            </AppDashBoardLayout>
          }
        />
        <Route
          path={SCREENS_DETAILS}
          element={
            <AppDashBoardLayout>
              <ScreenDetailsPage />
            </AppDashBoardLayout>
          }
        />

        <Route
          path={CAMPAIGNS_LIST}
          element={
            <AppDashBoardLayout>
              <CampaignsPage />
            </AppDashBoardLayout>
          }
        />
        <Route
          path={CAMPAIGNS_DETAILS}
          element={
            <AppDashBoardLayout>
              <CampaignDetailsPage />
            </AppDashBoardLayout>
          }
        />

        <Route
          path={CREATE_CAMPAIGN}
          element={
            <PublicRoute>
              <CreateCampaignPage />
            </PublicRoute>
          }
        />

        <Route
          path={EDIT_CAMPAIGN}
          element={
            <PublicRoute>
              <EditCampaign />
            </PublicRoute>
          }
        />

        <Route
          path={HOME}
          element={
            <AppDashBoardLayout>
              <ScreensPage />
            </AppDashBoardLayout>
          }
        />

        <Route
          path={EDIT_CAMPAIGN}
          element={
            <PublicRoute>
              <CreateCampaignPage />
            </PublicRoute>
          }
        />

        <Route
          path={MY_CREATIVES}
          element={
            <AppDashBoardLayout>
              <MyCreativesPage />
            </AppDashBoardLayout>
          }
        />
        <Route
          path={SCREEN_CAMPAIGN_MONITORING}
          element={
            <AppDashBoardLayout>
              <MonitoringPage />
            </AppDashBoardLayout>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
