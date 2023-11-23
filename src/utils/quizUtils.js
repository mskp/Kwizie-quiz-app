/**
 * Validates quiz data to ensure that it meets specific criteria.
 * @param {Object} quizData - The quiz data object to be validated.
 * @returns {Object} - Returns an object with a success flag and an error message if validation fails.
 */
export function validateQuizData(quizData) {
  // Validate the quiz title
  const isValidTitle =
    quizData.quizTitle &&
    typeof quizData.quizTitle === 'string' &&
    quizData.quizTitle.trim().length >= 10 &&
    quizData.quizTitle.trim().length <= 30;

  // Validate each question's length in the questionOptions array
  const isValidQuestion = quizData.questionOptions.length > 0 && quizData.questionOptions.every(
    (q) => q.question.trim().length >= 10 && q.question.trim().length <= 200
  );

  // Validate the number of options for each question in the questionOptions array
  const hasValidNumberOfOptions = quizData.questionOptions.every(
    (q) => q.options.length >= 2 && q.options.length <= 5
  );

  // Check if the quiz title is valid
  if (!isValidTitle) {
    // Return an error message if the quiz title is invalid
    return {
      success: false,
      error: "Title must be 10 to 30 characters long."
    };
  }

  // Check if each question is valid
  if (!isValidQuestion) {
    // Return an error message if any quiz question is invalid
    return {
      success: false,
      error: "Each question must be 10 to 200 characters long."
    };
  }

  // Check if the number of options for each question is valid
  if (!hasValidNumberOfOptions) {
    // Return an error message if the number of options in any question is invalid
    return {
      success: false,
      error: "Each question must have 2 to 5 options."
    };
  }

  // Check whether any options are empty
  const hasAnyEmptyOption = quizData.questionOptions.some(question =>
    question.options.some(
      option => option.trim() === ""
    )
  );

  // Return an error if any option is empty in the quiz questions
  if (hasAnyEmptyOption) {
    return {
      success: false,
      error: "Quiz questions must not have empty options."
    };
  }

  // Check if any question has an empty correct answer
  const hasEmptyCorrectOption = quizData.questionOptions.some(question => question.correctAnswer.trim() === '');

  // Return an error if any question has an empty correct answer
  if (hasEmptyCorrectOption) {
    return {
      success: false,
      error: "Choose at least one correct answer for each question."
    };
  }

  // If no errors, return success true
  return { success: true };
}


/**
 * Calculates the score of a quiz based on user answers.
 * @param {Array} quizData - The array containing quiz data.
 * @param {Array} userAnswers - The array containing user's answers.
 * @returns {number} - Returns the calculated quiz score.
 */
export function calculateQuizScore(quizData, userAnswers) {
  let score = 0;
  quizData.forEach((quiz, quizIndex) => {
    quiz?.questionOptions?.forEach((question, questionIndex) => {
      const selectedOption = userAnswers[quizIndex]?.[questionIndex];
      if (selectedOption === question.correctAnswer) {
        // Increase the score if the selected option matches the correct answer
        score++;
      }
    });
  });
  return score;
}

/**
 * Creates a deep copy of the provided data using JSON serialization.
 * @param {*} data - The data to be deep copied.
 * @returns {*} - Returns the deep copied data.
 */
export function createDeepCopy(data) {
  // Use JSON.stringify and JSON.parse to create a deep copy of the data
  return JSON.parse(JSON.stringify(data));
}
