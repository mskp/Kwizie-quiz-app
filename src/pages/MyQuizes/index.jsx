import ConfirmDeleteModal from "../../components/modals/ConfirmDeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { showDeleteModal } from "../../slices/modalsSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeStatus } from "../../slices/quizSlice";
import styles from "./MyQuizes.module.css";
import toast from "react-hot-toast";
import Switch from '@mui/material/Switch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from "@mui/material/IconButton";
import StyledButton from "../../components/StyledButton";

export default function MyQuizes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showDeleteModalState = useSelector((state) => state.deleteModal.value);
  const quizDetails = useSelector((state) => state.quiz.quizDetails);

  const [deleteQuizIndex, setDeleteQuizIndex] = useState(null);

  const handleShowModal = (index) => {
    setDeleteQuizIndex(index);
    dispatch(showDeleteModal());
  };

  const handleChangeStatus = (index) => {
    const status = quizDetails[index]?.status === 1 ? 0 : 1;
    dispatch(changeStatus({ index, status }));
    const quizTitle = quizDetails[index]?.quizTitle;

    if (status) {
      return toast.success(`Quiz - ${quizTitle} enabled`, { id: "status-toast" });
    }
    return toast.error(`Quiz - ${quizTitle} disabled`, { id: "status-toast" });
  };

  return (
    <>
      <section className={styles["my-quizes"]}>
        <header className={styles["my-quizes-header"]}>
          <h2 className={styles["title"]}>My Quizzes</h2>
          <StyledButton buttonText={"Create new quiz"} onClick={() => navigate("/create-quiz")} />
        </header>

        {quizDetails?.length && quizDetails?.length !== 0 ? (
          <div className={styles["table-container"]}>
            <table>
              <thead>
                <tr>
                  <th>Quiz No</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Created On</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {quizDetails.map((quiz, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td
                      style={
                        !quiz.status
                          ? { opacity: ".5", textDecoration: "line-through" }
                          : {}
                      }
                    >
                      {quiz.quizTitle}
                    </td>
                    <td>
                      <Switch
                        checked={quiz.status === 1}
                        onChange={() => {
                          handleChangeStatus(index);
                        }}
                        name="loading"
                        color="primary"
                      />
                    </td>

                    <td>{quiz.createdOn}</td>
                    <td
                      className={styles["action-btn"]}
                      onClick={() => handleShowModal(index)}
                    >
                      <IconButton style={{ color: "inherit" }}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </td>
                    <td
                      className={styles["action-btn"]}
                      onClick={() => navigate(`/edit-quiz/${index}`)}
                    >
                      <IconButton style={{ color: "inherit" }}>
                        <EditIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className={styles["not-found-text"]}>No quizzes found</p>
        )}
      </section>
      <ConfirmDeleteModal index={deleteQuizIndex} open={showDeleteModalState} />
    </>
  );
}
