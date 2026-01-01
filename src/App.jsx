import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';
import SmoothScroll from './components/SmoothScroll';
import AdminToolbar from './components/AdminToolbar';

// Layout
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import DoctorSpeaks from './pages/DoctorSpeaks';
import VideoDetail from './pages/VideoDetail';
import FAQ from './pages/FAQ';
import LensSelection from './pages/LensSelection';
import EyeOperations from './pages/EyeOperations';
import OperationDetail from './pages/OperationDetail';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import Admin from './pages/Admin';
import QRPage from './pages/QRPage';

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <SmoothScroll>
          <Router>
            <Routes>
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/doctor-speaks" element={<Layout><DoctorSpeaks /></Layout>} />
              <Route path="/doctor-speaks/:id" element={<Layout><VideoDetail /></Layout>} />
              <Route path="/faq" element={<Layout><FAQ /></Layout>} />
              <Route path="/lens-selection" element={<Layout><LensSelection /></Layout>} />
              <Route path="/eye-operations" element={<Layout><EyeOperations /></Layout>} />
              <Route path="/eye-operations/:slug" element={<Layout><OperationDetail /></Layout>} />
              <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
              <Route path="/login" element={<Layout><Login /></Layout>} />
              <Route path="/admin" element={<Layout><Admin /></Layout>} />
              <Route path="/qrpage" element={<QRPage />} />
            </Routes>
            <AdminToolbar />
          </Router>
        </SmoothScroll>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;

