import { Route, Routes, Navigate, redirect, Outlet } from "react-router-dom";
import { Navbar } from "@/components/component/navbar";
import { useUserStore } from "@/store/User";
import { ToDos } from "./to-dos";

const Main = () => {
  const user = useUserStore((state)=>state.user);
  if (!user) {
return   <Navigate to='/login' />
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<ToDos />} path="todos" />
      </Routes>
    </>
  );
};

export default Main;
