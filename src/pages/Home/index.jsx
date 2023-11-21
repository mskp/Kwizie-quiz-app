// Importing the CSS module for styling
import styles from "./Home.module.css";

// Importing Link from react-router-dom for navigation
import { Link } from "react-router-dom";

// Defining the Home component
export default function Home() {
  return (
    // Creating a section with centered-boxes style
    <section className={styles.centered_boxes}>
      {/* Link to the Play Quiz page */}
      <Link to={"/play-quiz"} className={styles.box}>
        {/* Content inside the box, in this case, a title for playing a quiz */}
        <p className={styles.box_title}>Play Quiz</p>
      </Link>

      {/* Link to the Create Quiz page */}
      <Link to={"/create-quiz"} className={styles.box}>
        {/* Content inside the box, in this case, a title for creating a new quiz */}
        <p className={styles.box_title}>Create new quiz</p>
      </Link>

      {/* Link to the My Quizzes page */}
      <Link to={"/my-quizzes"} className={styles.box}>
        {/* Content inside the box, in this case, a title for viewing user's quizzes */}
        <p className={styles.box_title}>My Quizzes</p>
      </Link>
    </section>
  );
}
