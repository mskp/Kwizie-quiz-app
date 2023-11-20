import styles from "./Home.module.css"; 
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className={styles["centered-boxes"]}>
      <Link to={"/play-quiz"} className={styles["box"]}>
        <p className={styles["box-title"]}>Play Quiz</p>
      </Link>
      <Link to={"/create-quiz"} className={styles["box"]}>
        <p className={styles["box-title"]}>Create new quiz</p>
      </Link>
      <Link to={"/my-quizzes"} className={styles["box"]}>
        <p className={styles["box-title"]}>My Quizzes</p>
      </Link>
    </section>
  );
}
