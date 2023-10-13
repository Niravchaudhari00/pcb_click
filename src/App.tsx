import { Route, Routes } from "react-router-dom";
import SingIn from "./page/SingIn";

import ProtectedRoute from "./components/core/auth/ProtectedRoute";
import Dashboard from "./components/core/dashboard/Dashboard";
import Home from "./page/Home";
import LoadingBar from "react-top-loading-bar";
import { useSelector } from "react-redux";
import { rootState } from "./redux/store";
import Role from "./components/core/dashboard/Role";
import Permission from "./components/core/dashboard/Permission";
import UserManagement from "./components/core/dashboard/UserManagement";
import Module from "./components/core/module/Module";

function App() {
  const { progress } = useSelector((state: rootState) => state.auth);
  return (
    <div>
      <LoadingBar
        color="#f119"
        progress={progress}
        shadow={true}
        height={2}
        onLoaderFinished={() => progress + 20}
      />
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
            <Route path="/user-management" element={<UserManagement />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
