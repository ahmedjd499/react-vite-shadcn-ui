import { Route, Routes, Navigate, redirect, Outlet } from "react-router-dom";
import { Landing } from "@/components/component/landing";
import { Navbar } from "@/components/component/navbar";
import { ToDos } from "@/components/component/to-dos";
import { useUserStore } from "@/store/User";

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
