import { Route, Routes } from "react-router-dom";

import { Landing } from "@/components/component/landing";
import { Navbar } from "@/components/component/navbar";

const Main = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Landing />}  index/>
      </Routes>
    </>
  );
};

export default Main;
