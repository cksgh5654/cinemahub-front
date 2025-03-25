import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/Layout";
import ErrorPage from "../pages/ErrorPage";
import MainPage from "../pages/MainPage";
import CinemaReviewPage from "../pages/CinemaReviewPage";
// import MyPage from '../pages/MyPage';
import useLoginStore from "../store/useStore";
import { getFetchUserSession } from "../apis/login";
import { useEffect } from "react";
import PrivateRouter from "./PrivateRouter";
import AgreePolicy from "../pages/AgreePolicy";
import AdminPage from "../pages/AdminPage";
import ProfilePage from "../pages/ProfilePage";
import GenrePage from "../pages/GenrePage";

const RouteProvider = () => {
  const login = useLoginStore((state) => state.login);
  const logout = useLoginStore((state) => state.logout);

  useEffect(() => {
    const checkSession = async () => {
      if (window.location.pathname === "/callback") {
        // 리다이렉트 후 경로
        console.log("Redirect detected, checking session");
        try {
          const response = await getFetchUserSession();
          if (!response.result) {
            console.log("No session, refreshing...");
            window.location.reload();
          }
        } catch (err) {
          console.error("Session check failed:", err);
        }
      }
    };
    checkSession();
  }, []);

  const handleUserSession = async () => {
    try {
      const response = await getFetchUserSession();

      if (response.result) {
        login();
      } else {
        logout();
      }
    } catch (e) {}
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <PrivateRouter element={<MainPage />} />,
        },
        {
          path: "/genre/:genre",
          element: <GenrePage />,
        },
        {
          path: "/review",
          element: <CinemaReviewPage />,
        },
        {
          path: "/login",
          element: <PrivateRouter element={<Login />} />,
        },
        {
          path: "/register",
          element: <PrivateRouter element={<Register />} />,
        },
        {
          path: "/policy",
          element: <AgreePolicy />,
        },
        {
          path: "/profile/:nickname",
          element: <ProfilePage />,
        },
        {
          path: "/search",
          element: <SearchPage />,
        },
        {
          path: "/admin",
          element: <AdminPage />,
        },
      ],
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  useEffect(() => {
    handleUserSession();

    window.addEventListener("reload", () => {});
  }, []);

  return <RouterProvider router={router} />;
};

export default RouteProvider;
