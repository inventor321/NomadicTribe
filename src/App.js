import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import MagicRuins from "./Pages/MagicRuins";
import MainPage from "./Pages/MainPage";
import GameOver from "./Pages/GameOver";
import Explore from "./Pages/Explore";
import TechTree from "./Pages/TechTree";



function App() {
  return (
    <Router>
      <div className="container">
        <br/>
        <Routes>
          <Route path="/NomadicTribe" element={<MainPage />} />
          <Route path="/GameOver" element={<GameOver />} />
          <Route path="/MagicRuins" element={<MagicRuins />} />
          <Route path="/Explore" element={<Explore />} />
          <Route path="/TechTree" element={<TechTree />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App