import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Login from "./components/sessions/Login";
import Logout from "./components/sessions/Logout";
import Guides from "./components/content/guides/Guides";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import CharacterEdit from "./components/content/characters/CharacterEdit";
import CharacterNew from "./components/content/characters/CharacterNew";
import Home from "./components/content/landingPage/Home";
import Dashboard from "./components/content/dashboard/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <main className="Container">
          <Dashboard />
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/Guides" element={<Guides />} />
            <Route path="/logout" element={<Logout />} />

            {/* Admin-only routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/Characters/new" element={<CharacterNew />} />
              <Route path="/Characters/:id/edit" element={<CharacterEdit />} />
            </Route>
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
