import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Header from "./components/HeaderBar";
import MilkHistory from "./components/MilkHistory";
import Home from "./components/Home";
import NotAvailable from "./components/NotAvailable";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/milk-tracking" element={<MilkHistory />} />
          <Route path="*" element={<NotAvailable />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
