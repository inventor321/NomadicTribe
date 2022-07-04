import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import Home from "./Pages/Home";
import MainPage from "./Pages/MainPage";

function App() {
  return (
    <Router>
      <div className="container">
        <br/>
        <Routes>
          <Route path="/NomadiTribe" element={<Home />} />
          <Route path="/NomadiTribe/MainPage" element={<MainPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App