import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useUser } from '@clerk/clerk-react';
import Auth from "./components/Auth/Auth";
import Displays from "./components/Displays/Displays";

export default function App() {
    const [userType, setUserType] = useState('developer');
    const { isSignedIn, user } = useUser();

    useEffect(() => {
      if (isSignedIn && user) {
          const role = user.publicMetadata?.role;
          if (role === 'manager') {
            setUserType('manager');
          } else {
            setUserType('developer');
          }
      }
    }, [isSignedIn, user]);
  
    return (
      <div className="app">
        <Routes>
          <Route path="/*" element={<Auth />} />
          <Route path="/displays/*" element={<Displays userType={userType} />} />
        </Routes>
      </div>
    );
}