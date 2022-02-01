import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SelfFeedback from "./pages/SelfFeedback";
import Feedback from "./pages/Feedback";
import ModuleFeedback from "./pages/ModuleFeedback";
import ClassFeedback from "./pages/ClassFeedback";
import MissingPage from "./pages/MissingPage";
import Layout from "./pages/Layout";

function App() {
  let id = "";
  // Retrieve id using auth token
  id = "T024681012";
  const [userId, setUserId] = useState(id);

  return (
    <Router>
      <Routes>
        <Route
          path="/feedback"
          element={<Layout userId={userId} setUserId={setUserId} />}
        >
          <Route index element={<SelfFeedback studentId={userId} />} />
          <Route path=":studentId" element={<Feedback userId={userId} />} />
          <Route
            path="module/:moduleId"
            element={<ModuleFeedback userId={userId} />}
          />
          <Route
            path="class/:classId"
            element={<ClassFeedback userId={userId} />}
          />
        </Route>
        <Route path="*" element={<MissingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
