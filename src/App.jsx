import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./scenes/HomePage/HomePage.jsx";
import ProfilePage from "./scenes/profilePage/ProfilePage.jsx";
import LoginPage from "./scenes/LoginPage/LoginPage.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
