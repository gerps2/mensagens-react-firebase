import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./presentation/context/AuthContext";
import Layout from "./presentation/components/Layout";
import PrivateRoute from "./presentation/routes/PrivateRoute";
import Login from "./presentation/pages/Login";
import Messages from "./presentation/pages/Messages";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute component={Messages} />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
