import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ContectHeader from "./components/ContectHeader";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contect";
import AdminPanel from "./pages/adminpages/AdminPanel";
import AdminLogin from "./pages/adminpages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./ScrollToTop";
import VacanciesPage from "./pages/Vacancies";
import VacancyDetailPage from "./pages/VacancyDetailPage";
import ApplyNow from "./pages/ApplyNow";
import AdminApplications from "./pages/adminpages/AdminApplications";

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <div className="flex flex-col min-h-screen">
        <ContectHeader />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/apply" element={<ApplyNow />} />
            <Route path="/vacancy/:id" element={<VacancyDetailPage />} />
            <Route path="/vacancies" element={<VacanciesPage />} />
            <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/admin/applications" element={<AdminApplications />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
