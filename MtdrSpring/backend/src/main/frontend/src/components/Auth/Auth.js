import './Auth.css';
import { useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const { isSignedIn, user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn && user) {
            navigate('/displays/dashboard');
        }
    }, [isSignedIn, user, navigate]);

    return (
        <div className='auth-main-container'>
            <Routes>
                <Route
                    path="/"
                    element={<SignIn
                        signUpUrl='/signup'
                        appearance={{
                            layout: {
                                unsafe_disableDevelopmentModeWarnings: true,
                            }
                        }}
                    />}
                />
                <Route
                    path="/signup"
                    element={<SignUp
                        signInUrl='/'
                        appearance={{
                            layout: {
                                unsafe_disableDevelopmentModeWarnings: true,
                            }
                        }}
                    />}
                />
            </Routes>
            <Outlet />
        </div>
    );
}