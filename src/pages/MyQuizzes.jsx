// Importing necessary dependencies and components
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { showDeleteModal } from "../slices/modalsSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeStatus } from "../slices/quizSlice";
import toast from "react-hot-toast";
import Switch from '@mui/material/Switch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from "@mui/material/IconButton";
import StyledButton from "../components/StyledButton";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Typography } from "@mui/material";

// Styled components for custom table cells and rows
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(30, 30, 30, 0.5)",
    color: "white",
    padding: "1.5rem",
    fontWeight: 700
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "white",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "rgba(59, 54, 53, 0.9)",
  color: "white",

  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// MyQuizzes component
export default function MyQuizzes() {
  // Redux hooks for dispatch and selector
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showDeleteModalState = useSelector((state) => state.deleteModal.value);
  const quizDetails = useSelector((state) => state.quiz.quizDetails);

  // State to track the index of the quiz to be deleted
  const [deleteQuizIndex, setDeleteQuizIndex] = useState(null);

  // Function to show delete modal
  const handleShowModal = (index) => {
    setDeleteQuizIndex(index);
    dispatch(showDeleteModal());
  };

  // Function to handle change in quiz status
  const handleChangeStatus = (index) => {
    const status = quizDetails[index]?.status === 1 ? 0 : 1;
    dispatch(changeStatus({ index, status }));
    const quizTitle = quizDetails[index]?.quizTitle;

    // Display a toast message based on the status change
    if (status) {
      return toast.success(`Quiz - ${quizTitle} enabled`, { id: "status-toast" });
    }
    return toast.error(`Quiz - ${quizTitle} disabled`, { id: "status-toast" });
  };

  return (
    <>
      {/* Section for rendering My Quizzes */}
      <section style={{
        padding: "1rem",
        width: "100vw",
        height: "100%",
      }}
      >
        {/* Header with title and button to create a new quiz */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <h2>My Quizzes</h2>
          <StyledButton buttonText={"Create new quiz"} onClick={() => navigate("/create-quiz")} />
        </Box>

        {/* Conditional rendering based on the presence of quizzes */}
        {quizDetails?.length && quizDetails?.length !== 0 ? (
          // Table for displaying quiz details
          <TableContainer>
            <Table sx={{ minWidth: 700, margin: "1rem 0" }} aria-label="customized table">
              <TableHead sx={{ border: "1px solid rgb(81, 81, 81)" }}>
                <TableRow>
                  {/* Table headers */}
                  <StyledTableCell align="center">Quiz No.</StyledTableCell>
                  <StyledTableCell align="center">Title</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Created On</StyledTableCell>
                  <StyledTableCell align="center" colSpan={2}>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ border: "1px solid rgb(81, 81, 81)" }}>
                {/* Mapping through quizDetails to render each quiz row */}
                {quizDetails.map((quiz, index) => (
                  <StyledTableRow key={index}>
                    {/* Displaying quiz details in each cell */}
                    <StyledTableCell component="th" scope="row" align="center">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center" style={
                      !quiz.status
                        ? { opacity: ".5", textDecoration: "line-through" }
                        : {}
                    }>{quiz.quizTitle}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Switch
                        checked={quiz.status === 1}
                        onChange={() => {
                          handleChangeStatus(index);
                        }}
                        name="loading"
                        color="success"
                      /></StyledTableCell>
                    <StyledTableCell align="center">{quiz.createdOn}</StyledTableCell>
                    {/* Buttons for deleting and editing a quiz */}
                    <StyledTableCell align="center" onClick={() => handleShowModal(index)}>
                      <IconButton style={{ color: "inherit" }}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell align="center" onClick={() => navigate(`/edit-quiz?q=${index}`)}>
                      <IconButton style={{ color: "inherit" }}>
                        <EditIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          // Message when no quizzes are found
          <Typography
            top={"10rem"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            fontSize={"2rem"}
            height={"20rem"}>
            No quizzes found
          </Typography>
        )}
      </section>

      {/* Modal for confirming quiz deletion */}
      <ConfirmDeleteModal index={deleteQuizIndex} open={showDeleteModalState} />
    </>
  );
}
