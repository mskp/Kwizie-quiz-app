/**
 * Validates quiz data to ensure that it meets specific criteria.
 * @param {Object} quizData - The quiz data object to be validated.
 * @returns {Object} - Returns an object with success flag and error message if validation fails.
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

  // Return true if all validation criteria are met, otherwise false
  if (!isValidTitle) {
    // Return an error message if the quiz title is invalid
    return {
      error: "Invalid Title",
      success: false
    };
  }

  if (!isValidQuestion) {
    // Return an error message if any quiz question is invalid
    return {
      error: "Invalid Question",
      success: false
    };
  }

  if (!hasValidNumberOfOptions) {
    // Return an error message if the number of options in any question is invalid
    return {
      error: "Invalid Number Of Options",
      success: false
    };
  }

  // Check whether all the options have proper values.
  const hasAnyEmptyOption = quizData.questionOptions.some(question =>
    question["options"].some(
      option => option.trim() === ""
    )
  );

  if (hasAnyEmptyOption) {
    // Return an error message if any option is empty in the quiz questions
    return {
      error: "Quiz questions cannot contain empty options",
      success: false
    }
  }

  const hasEmptyCorrectOption = quizData.questionOptions.some(question => question.correctAnswer.trim() === '');

  if (hasEmptyCorrectOption) {
    // Return an error message if any question has an empty correct answer
    return {
      error: "Please select at least one correct answer per question",
      success: false
    }
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
