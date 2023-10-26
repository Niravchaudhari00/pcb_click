import { Route, Routes } from "react-router-dom";
import SingIn from "./page/SingIn";
import "../src/App.css";
import ProtectedRoute from "./components/core/auth/ProtectedRoute";
import Dashboard from "./components/core/dashboard/Dashboard";
import Home from "./page/Home";
import Role from "./components/core/role/Role";
import Permission from "./components/core/permission/Permission";
import UserManagement from "./components/core/user-management/UserManagement";
import Module from "./components/core/module/Module";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/sing-in" element={<SingIn />}></Route>

        {/* whithout login no access dashboard page */}
        <Route
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route path="/">
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/module" element={<Module />} />
            <Route path="/role" element={<Role />} />
            <Route path="/permission" element={<Permission />} />
            <Route path="/admin-user" element={<UserManagement />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
