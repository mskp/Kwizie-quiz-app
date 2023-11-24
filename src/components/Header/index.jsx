// Importing styles and required components
import "./headerStyles.css";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getQuizData } from "../../slices/quizSlice";
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import ThemeToggleSwitch from "./ThemeToggleSwitch";

// Navigation details for the header links
const navDetails = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/play-quiz",
    name: "Play Quiz",
  },
  {
    path: "/my-quizzes",
    name: "My Quizzes",
  },
];

// Header Component
// Represents the header section of the application.

export default function Header() {
  // State for managing the menu open/close status
  const [menuOpen, setMenuOpen] = useState(false);

  // State for managing the dark mode
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode ? JSON.parse(storedDarkMode) : true;
  });

  // Effect to update the body class based on dark mode
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  // React Router hook for getting the current location
  const location = useLocation();

  // Redux selectors
  const playerName = useSelector((state) => state.player.name);
  const quizData = useSelector(getQuizData) || [];

  // Flags to check if the current page is the play quiz page and if quiz data is empty
  const isPlayQuizPage = (location.pathname === "/play-quiz");
  const isQuizDataEmpty = quizData.length === 0;

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newDarkMode = !prev;
      localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
      return newDarkMode;
    });
  };


  // Function to handle menu toggle
  function handleMenuToggle() {
    setMenuOpen((prev) => !prev);

    // Add or remove the "menu-open" class from the body
    if (!menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }

  // Function to close the menu when a link is opened
  function closeMenuWhenLinkOpened() {
    setMenuOpen(false);
    document.body.classList.remove("menu-open");
  }

  // Render the header
  return (
    <header className="header">
      {/* Link to the home page or disabled link if on play quiz page with no quiz data */}
      <Link
        to={isPlayQuizPage && !isQuizDataEmpty ? "#" : "/"}
        className="logo"
        onClick={closeMenuWhenLinkOpened}
      >
        Kwizie
      </Link>

      {/* Render player info if on play quiz page and there is quiz data */}
      {isPlayQuizPage && !isQuizDataEmpty ? (
        playerName && (
          <div className="player-info">
            <p className="player-name">Player: {playerName}</p>
          </div>
        )
      ) : (
        // Render navigation links and theme toggle switch
        <nav className="nav">
          <div className="buttons" style={{ display: "flex" }}>
            {/* Theme toggle switch */}
            <ThemeToggleSwitch darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            {/* Menu toggle button */}
            <button
              className={`menu-btn ${menuOpen ? "active" : ""}`}
              onClick={handleMenuToggle}
            >
              {menuOpen ? (
                <HighlightOffRoundedIcon className="menu-icon" />
              ) : (
                <MenuOpenRoundedIcon className="menu-icon" />
              )}
            </button>
          </div>

          {/* Navigation links */}
          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            {navDetails.map(({ name, path }) => (
              <li key={name}>
                <NavLink
                  onClick={closeMenuWhenLinkOpened}
                  className={`nav-link`}
                  to={path}
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
