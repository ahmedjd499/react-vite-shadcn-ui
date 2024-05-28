import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <ModeToggle ></ModeToggle>
      <BrowserRouter>
        <Routes>
          <Route Component={Signup} path="signup" />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
