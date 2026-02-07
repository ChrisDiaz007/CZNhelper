import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Login from "./components/sessions/Login";
import Logout from "./components/sessions/Logout";
import Guides from "./components/content/guides/guides";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import CharacterEdit from "./components/content/characters/CharacterEdit";
import CharacterNew from "./components/content/characters/CharacterNew";
import Home from "./components/content/landingPage/Home";
import Dashboard from "./components/content/dashboard/Dashboard";
import StrengthsNew from "./components/content/characters/StrengthsNew";
import StrengthsEdit from "./components/content/characters/StrengthsEdit";
import OverviewNew from "./components/content/characters/OverviewNew";
import OverviewEdit from "./components/content/characters/OverviewEdit";
import WeaknessNew from "./components/content/characters/WeaknessNew";
import WeaknessEdit from "./components/content/characters/WeaknessEdit";

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
              <Route
                path="/Characters/:id/strengths/new"
                element={<StrengthsNew />}
              />
              <Route
                path="/Characters/:id/strengths/edit"
                element={<StrengthsEdit />}
              />
              <Route
                path="/Characters/:id/overviews/new"
                element={<OverviewNew />}
              />
              <Route
                path="/Characters/:id/overviews/edit"
                element={<OverviewEdit />}
              />
              <Route
                path="/Characters/:id/weaknesses/new"
                element={<WeaknessNew />}
              />
              <Route
                path="/Characters/:id/weaknesses/edit"
                element={<WeaknessEdit />}
              />
            </Route>
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
