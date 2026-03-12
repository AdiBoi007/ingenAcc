import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import PlannerPage from "./pages/PlannerPage";
import CourseOverviewPage from "./pages/CourseOverviewPage";
import PracticeExamPage from "./pages/PracticeExamPage";
import TutorsPage from "./pages/TutorsPage";
import MarketplacePage from "./pages/MarketplacePage";
import TutorDashboardPage from "./pages/TutorDashboardPage";
import BatchClassCreationPage from "./pages/BatchClassCreationPage";
import OnboardingPage from "./pages/OnboardingPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public / Full-Screen Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* App Routes (With Sidebar/Navbar) */}
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/planner" element={<PlannerPage />} />
                <Route path="/course/:id" element={<CourseOverviewPage />} />
                <Route path="/practice" element={<PracticeExamPage />} />
                <Route path="/tutors" element={<TutorsPage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/tutor/dashboard" element={<TutorDashboardPage />} />
                <Route path="/tutor/batch-class/new" element={<BatchClassCreationPage />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
