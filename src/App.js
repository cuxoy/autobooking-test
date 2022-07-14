import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Main";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:first/:second/:third" element={<Main />} />
        <Route path="/:first/:second" element={<Main />} />
        <Route path="/:first" element={<Main />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
