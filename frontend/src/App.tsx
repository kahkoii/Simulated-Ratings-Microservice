import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelfFeedback from "./pages/SelfFeedback";
import Feedback from "./pages/Feedback";
import MissingPage from "./pages/MissingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/feedback">
          <Route index element={<SelfFeedback />} />
          <Route path=":studentId" element={<Feedback />} />
        </Route>
        <Route path="*" element={<MissingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
