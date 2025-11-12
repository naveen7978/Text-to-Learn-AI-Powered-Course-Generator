// client/src/AppRouter.jsx
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// Layouts & Pages
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import CourseView from "./pages/CourseView";
import LessonView from "./pages/LessonView";

import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./pages/LoadingScreen";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { isLoading } = useAuth0();

  // Wait for Auth0 to initialize
  if (isLoading) {
    return <LoadingScreen />;
  }

  const router = createBrowserRouter([
    { path: "/login", element: <LoginPage /> },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        // Home - Generate courses
        { index: true, element: <Home /> },

        // Course details (view modules)
        { path: "courses/:courseId", element: <CourseView /> },

        {
          path: "courses/:courseId/lesson/:lessonId",
          element: <LessonView />,
        },

        //  Testing routes

        //  Fallback
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRoutes;
