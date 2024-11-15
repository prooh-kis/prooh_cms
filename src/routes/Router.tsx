import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePageLayout } from "../components";

import {
  AuthPage,
  CreateCampaignPage,
  ForgetPassword,
  LandingPage,
  PageNotFound,
  ScreensPage,
  UpdatePassword,
  VerifyEmail,
} from "../pages";

import { PrivateRoute } from "./PrivateRoute";
import { AUTH, CREATE_CAMPAIGN, FORGET_PASSWORD, HOME, SCREENS_LIST, UPDATE_PASSWORD, VERIFY_EMAIL } from "./routes";

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
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
