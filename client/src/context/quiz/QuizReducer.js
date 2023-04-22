/* eslint-disable import/no-anonymous-default-export */
import {
	GET_QUIZZES,
	GET_QUIZ,
	UPDATE_QUIZ,
	DELETE_QUIZ,
	QUIZ_ERROR,
	CLEAR_ERRORS,
	CREATE_QUIZ,
} from "../types";

const QuizReducer = (state, action) => {
	switch (action.type) {
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		case GET_QUIZZES:
			return {
				...state,
				quizzes: action.payload,
			};
		case GET_QUIZ:
			return {
				...state,
				quiz: action.payload,
			};
		case DELETE_QUIZ:
			return {
				...state,
				quizzes: state.quizzes.filter((quiz) => quiz._id !== action.payload),
			};
		case QUIZ_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case CREATE_QUIZ:
			return {
				...state,
				quizzes: action.payload,
			};
		case UPDATE_QUIZ:
			return {
				...state,
				quiz: action.payload,
			};
		default:
			throw new Error(`Unsupported type of: ${action.type}`);
	}
};

export default QuizReducer;
