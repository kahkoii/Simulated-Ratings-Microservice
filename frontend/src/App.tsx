import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import SelfFeedback from "./pages/SelfFeedback";
import Feedback from "./pages/Feedback";
import ModuleFeedback from "./pages/ModuleFeedback";
import ClassFeedback from "./pages/ClassFeedback";
import MissingPage from "./pages/MissingPage";
import Layout from "./pages/Layout";
import getUserId from "./endpoints/auth";

function App() {
  const [userId, setUserId] = useState<string>("");
  // Retrieve id using auth token
  // id being -1 means invalid login credentials or request failed
  useEffect(() => {
    getUserId()
      .then((id) => setUserId(id))
      .catch(() => setUserId("-1"));
  }, []);

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
