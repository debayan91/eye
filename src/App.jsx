import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SmoothScroll from './components/SmoothScroll';


// Placeholder Layout (will be implemented next)
import Layout from './components/Layout';

// Placeholder Pages (will be created in Pages phase)
import Home from './pages/Home';
import DoctorSpeaks from './pages/DoctorSpeaks';
import VideoDetail from './pages/VideoDetail';
import FAQ from './pages/FAQ';
import LensSelection from './pages/LensSelection';
import EyeOperations from './pages/EyeOperations';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <SmoothScroll>
        <Router>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/doctor-speaks" element={<Layout><DoctorSpeaks /></Layout>} />
            <Route path="/doctor-speaks/:id" element={<Layout><VideoDetail /></Layout>} />
            <Route path="/faq" element={<Layout><FAQ /></Layout>} />
            <Route path="/lens-selection" element={<Layout><LensSelection /></Layout>} />
            <Route path="/eye-operations" element={<Layout><EyeOperations /></Layout>} />
            <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
          </Routes>
        </Router>
      </SmoothScroll>
    </AuthProvider>
  );
}

export default App;
