import { Route, Routes, Navigate } from "react-router-dom";
import { Navbar } from "@/components/component/navbar";
import { useUserStore } from "@/store/User";
import { ToDos } from "../todo-app/to-dos";
import { YoutubeDownloader } from "../youtube-downloader/youtube-downloader";
import { HomeApps } from "../home-apps/home-apps";
import TikTakToe from "../tik-tak-toe/tik-tak-toe";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Mines from "../mines-game/Mines";
const useAuth = () => {
  const navigate = useNavigate();

  const isTokenExpired = useCallback((token) => {
    if (!token) return true;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  }, []);

  const authenticate = useCallback(() => {
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (token && user && !isTokenExpired(token)) {
      useUserStore.setState({ user, token });
      return true;
    } else {
      useUserStore.setState({ user: null, token: null });
      return false;
    }
  }, [isTokenExpired]);

  useEffect(() => {
    const checkAuth = () => {
      if (!authenticate()) {
        navigate("/login");
      }
    };

    checkAuth();
    const intervalId = setInterval(checkAuth, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [authenticate, navigate]);

  const user = useUserStore((state) => state.user);
  return { user, isAuthenticated: !!user };
};

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    console.log('redirecting to login');
    return <Navigate to="/login" />;
  }

  return children;
};

const Main = () => {
  return (
    <PrivateRoute>
      <Navbar />
      <Routes>
        <Route element={<HomeApps />} path="/home" />
        <Route element={<ToDos />} path="todos" />
        <Route element={<YoutubeDownloader />} path="media-downloader" />
        <Route element={<TikTakToe />} path="tic-tak-toe/:gameId_param?" />
        <Route element={<Mines />} path="mines-game" />
      </Routes>
    </PrivateRoute>
  );
};

export default Main;