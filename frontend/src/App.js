import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NurseOverview from "./pages/NurseOverview";
import SiteOverview from './pages/SiteOverview';
// import SiteManagement from './pages/SiteManagement';
// import NurseManagement from './pages/NurseManagement';
import AssignmentManagement from './pages/AssignmentManagement';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/sites" element={<SiteManagement />} />
                <Route path="/nurses" element={<NurseManagement />} /> */}
                <Route path="/assignments" element={<AssignmentManagement />} />
                <Route path="/sites-list" element={<SiteOverview />} />
                <Route path="/nurses-list" element={<NurseOverview />} />
            </Routes>
        </Router>
    );
}

export default App;
