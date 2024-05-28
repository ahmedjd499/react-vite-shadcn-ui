import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import Login from "./pages/Login";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle></ModeToggle>
      <BrowserRouter>
        <Routes>
          <Route element={<Signup />} path="signup" />
          <Route element={<Login />} path="login" />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
