import './Displays.css';
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import LeftBar from '../LeftBar/LeftBar';
import Dashboard from '../Dashboard/Dashboard';
import Report from '../Report/Report';


export default function Displays({ userType }) {
    return (
      <>
        <SignedOut>
          <Navigate to="/" replace />
        </SignedOut>

        <SignedIn>
          <div className="displays">
            <div className='displays-main'>
              <Navbar />
              <div className="displays-main-container">
                <LeftBar userType={userType} />
                <Routes>
                  <Route path="/dashboard" element={<Dashboard userType={userType} />} />
                  {userType == "manager" &&
                    <Route path="/report" element={<Report />} />
                  }
                </Routes>
                <Outlet />
              </div>
            </div>
          </div>
        </SignedIn>
      </>
    );
}