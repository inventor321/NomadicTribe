import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import Home from "./Pages/Home";
import MainPage from "./Pages/MainPage";
import GameOver from "./Pages/GameOver";

function App() {
  return (
    <Router>
      <div className="container">
        <br/>
        <Routes>
          <Route path="/NomadicTribe" element={<Home />} />
          <Route path="/MainPage" element={<MainPage />} />
          <Route path="/GameOver" element={<GameOver />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App