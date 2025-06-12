import './Navbar.css';
import { UserButton } from "@clerk/clerk-react";
import O_Oracle_Icon from "../../assets/OdeOracle.png";

export default function Navbar() {
    return (
        <div className="navbar-container">
            {/* Logo Container */}
            <div className="navbar-logo-container">
                <img src={O_Oracle_Icon} alt="Logo" className="navbar-logo-icon" />
                <span className="navbar-logo-text">| Oracules Manager</span>
            </div>

            {/* User Container */}
            <UserButton
                appearance={{
                    elements: {
                        userButtonPopoverActionButton__manageAccount: {
                            width: "100%"
                        },
                        userButtonPopoverActionButton__signOut: {
                            width: "100%"
                        }
                    },
                    layout: {
                        unsafe_disableDevelopmentModeWarnings: true,
                    }
                }}
                redirectUrl="/"
            />
        </div>
    );
}
