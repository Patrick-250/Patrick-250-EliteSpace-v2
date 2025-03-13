import { BrowserRouter as Router, Routes, Route } from "react-router";
import { MockComponent } from "../features/MockFeature/MockComponent";
import TestApiCall from "../features/TestApiCall/TestApiCall";
import SignupPage from "../features/auth/SignupPage";
import HomePage from "./routes/HomePage";
import Login from "../features/Login/Login";
import PasswordReset from "../features/PasswordReset/PasswordReset";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MockComponent />}></Route>
        {/* <Route path="/mock" element={<MockComponent />}></Route> */}
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/api-call" element={<TestApiCall />}></Route>
        {/* <Route path="/mock" element={<MockComponent />}></Route> */}
        <Route
          path="/"
          element={<HomePage />}
        ></Route>
        <Route
          path="/signup"
          element={<SignupPage />}
        />
        <Route
          path="/login"
          element={<Login />}
        ></Route>
        <Route path="/password-reset" element={<PasswordReset />}></Route>
       </Routes>
    </Router>
  );
}

export default AppRouter;
