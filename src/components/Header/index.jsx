import "./headerStyles.css";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getQuizData } from "../../slices/quizSlice";
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import ThemeToggleSwitch from "./ThemeToggleSwitch";

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

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode ? JSON.parse(storedDarkMode) : true;
  });
  const location = useLocation();
  const playerName = useSelector((state) => state.player.name);
  const quizData = useSelector(getQuizData) || [];
  const isPlayQuizPage = location.pathname === "/play-quiz";
  const isQuizDataEmpty = quizData.length === 0;

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newDarkMode = !prev;
      localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
      return newDarkMode;
    });
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  function handleMenuToggle() {
    setMenuOpen((prev) => !prev);

    if (!menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }

  function closeMenuWhenLinkOpened() {
    setMenuOpen(false);
    document.body.classList.remove("menu-open");
  }

  return (
    <header className="header">
      <Link
        to={isPlayQuizPage && !isQuizDataEmpty ? "#" : "/"}
        className="logo"
        onClick={closeMenuWhenLinkOpened}
      >
        Kwizie
      </Link>
      {isPlayQuizPage && !isQuizDataEmpty ? (
        playerName && (
          <div className="player-info">
            <p className="player-name">Player: {playerName}</p>
          </div>
        )
      ) : (
        <nav className="nav">
          <div className="buttons" style={{ display: "flex" }}>
            <ThemeToggleSwitch darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
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


