import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import { ThemeProvider } from "./components/theme-provider";
import Login from "./pages/Login";
import { NotFound } from "./components/component/not-found";
import './App.css';
import Main from "./pages/Main";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
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
