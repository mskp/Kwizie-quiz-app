/**
 * Validates quiz data to ensure that it meets specific criteria.
 * @param {Object} quizData - The quiz data object to be validated.
 * @returns {boolean} - Returns true if the quiz data is valid, otherwise false.
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
  if (!isValidTitle)
    return {
      error: "Invalid Title",
      success: false
    };

  if (!isValidQuestion) {
    return {
      error: "Invalid Question",
      success: false
    };
  }

  if (!hasValidNumberOfOptions) {
    return {
      error: "Invalid Number Of Options",
      success: false
    };
  }

  // Check weather all the options have proper values.
  const hasAnyEmptyOption = quizData.questionOptions.some(question =>
    question["options"].some(
      option => option.trim() === ""
    )
  );

  if (hasAnyEmptyOption) {
    return {
      error: "Quiz questions cannot contain contain empty options",
      success: false
    }
  }

  const hasEmptyCorrectOption = quizData.questionOptions.some(question => question.correctAnswer.trim() === '');

  if (hasEmptyCorrectOption) {
    return {
      error: "Please select atleast one correct answer per question",
      success: false
    }
  }

  // If no errors, return success true
  return { success: true };
}

export function calculateQuizScore(quizData, userAnswers) {
  let score = 0;
  quizData.forEach((quiz, quizIndex) => {
    quiz?.questionOptions?.forEach((question, questionIndex) => {
      const selectedOption = userAnswers[quizIndex]?.[questionIndex];
      if (selectedOption === question.correctAnswer) {
        score++;
      }
    });
  });
  return score;
}

export function createDeepCopy(data) {
  return JSON.parse(JSON.stringify(data))
}