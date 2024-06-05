import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/common/Signup";
import { ThemeProvider } from "./components/component/theme-provider";
import Login from "./pages/common/Login";
import { NotFound } from "./pages/common/not-found";
import './App.css';
import { Landing } from "./pages/common/landing";
import { Toaster } from "react-hot-toast";
import Main from "./pages/common/Main";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster position="top-center" reverseOrder={true} />

      <BrowserRouter>
        <Routes>
        <Route element={<Landing />} index />

          <Route element={<Main />} path="/main/*" />
          <Route element={<Signup />} path="/signup" />
          <Route element={<Login />} path="/login" />
          <Route element={<NotFound />} path="*" />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
