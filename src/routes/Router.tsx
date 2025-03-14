import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  CampaignDetailsPage,
  CampaignsPage,
  CreateCampaignPage,
  EditCampaign,
  ForgetPassword,
  MonitoringPage,
  MyCreativesPage,
  MyRequests,
  PageNotFound,
  ScreenDetailsPage,
  ScreensPage,
  UpdatePassword,
  VerifyEmail,
} from "../pages";

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
  SCREENS_LIST_FOR_SECONDARY_USER,
  USERS,
  PLAY_LIVE_URL,
  MY_REQUESTS,
} from "./routes";
// layout
import { AppDashBoardLayout } from "../layout/AppDashBoardLayout";
import { PublicRoute } from "../layout/PublicRoute";

import { SignIn } from "../pages/AuthPage/SignIn";
import { SignUp } from "../pages/AuthPage/SignUp";
import { MyUsers } from "../pages/MyUser";
import { PlayLiveUrl } from "../pages/PageNotFound/PlayLiveUrl";

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
            <PublicRoute>
              <VerifyEmail />
            </PublicRoute>
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
            <PublicRoute>
              <UpdatePassword />
            </PublicRoute>
          }
        />
        <Route
          path={USERS}
          element={
            <AppDashBoardLayout value="Users">
              <MyUsers />
            </AppDashBoardLayout>
          }
        />
        <Route
          path={SCREENS_LIST}
          element={
            <AppDashBoardLayout value="Screens">
              <ScreensPage />
            </AppDashBoardLayout>
          }
        />

        <Route
          path={SCREENS_DETAILS}
          element={
            <AppDashBoardLayout value="Screens">
              <ScreenDetailsPage />
            </AppDashBoardLayout>
          }
        />

        <Route
          path={CAMPAIGNS_LIST}
          element={
            <AppDashBoardLayout value="Campaigns">
              <CampaignsPage />
            </AppDashBoardLayout>
          }
        />
        <Route
          path={CAMPAIGNS_DETAILS}
          element={
            <AppDashBoardLayout value="Campaigns">
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
            <AppDashBoardLayout value="Screens">
              <ScreensPage />
            </AppDashBoardLayout>
          }
        />

        <Route
          path={MY_CREATIVES}
          element={
            <AppDashBoardLayout value="Creatives">
              <MyCreativesPage />
            </AppDashBoardLayout>
          }
        />
        <Route
          path={MY_REQUESTS}
          element={
            <AppDashBoardLayout value="Requests">
              <MyRequests />
            </AppDashBoardLayout>
          }
        />
        <Route
          path={SCREEN_CAMPAIGN_MONITORING}
          element={
            <AppDashBoardLayout value="Monitoring">
              <MonitoringPage />
            </AppDashBoardLayout>
          }
        />

        <Route
          path={SCREENS_LIST_FOR_SECONDARY_USER}
          element={
            <PublicRoute>
              <ScreensPage />
            </PublicRoute>
          }
        />

        <Route
          path={PLAY_LIVE_URL}
          element={
            <PlayLiveUrl />
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
