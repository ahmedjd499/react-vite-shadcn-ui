import { Route, Routes, Navigate } from "react-router-dom";
import { Navbar } from "@/components/component/navbar";
import { useUserStore } from "@/store/User";
import { ToDos } from "../todo-app/to-dos";
import { YoutubeDownloader } from "../youtube-downloader/youtube-downloader";

const Main = () => {
  const authenticate = useUserStore((state) => state.authenticate);
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);


  if (!user || !token || !authenticate()) {
    return <Navigate to="/login" />;
  } else
    return (
      <>
        <Navbar />
        <Routes>
          <Route element={<ToDos />} path="todos" />
          <Route element={<YoutubeDownloader />} path="youtube-downloader" />
        </Routes>
      </>
    );
};
export default Main;
