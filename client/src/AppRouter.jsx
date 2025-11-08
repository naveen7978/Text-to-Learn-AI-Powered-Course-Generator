import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import CourseView from "./pages/CourseView";
import LessonView from "./pages/LessonView";
import LessonTestPage from "./pages/LessonTestPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./pages/LoadingScreen";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { isLoading } = useAuth0();

  // ✅ Nothing renders until Auth0 fully initialized
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
        { index: true, element: <Home /> },
        { path: "courses/:courseId", element: <CourseView /> },
        {
          path: "courses/:courseId/module/:moduleIndex/lesson/:lessonIndex",
          element: <LessonView />,
        },
        { path: "lesson/test", element: <LessonTestPage /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRoutes;
