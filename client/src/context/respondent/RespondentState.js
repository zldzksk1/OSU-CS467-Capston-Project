import { React, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import RespondentContext from "./RespondentContext";
import RespondentReducer from "./RespondentReducer";

import {
	CLEAR_ERRORS,
	CREATE_RESPONDENT,
	RESPONDENT_ERROR,
	LOAD_RESPONDENTS,
	GET_RESPONDENT_QUIZ,
	RESPONDENT_LOADED,
	TAKE_QUIZ,
	GET_RESPONDENT_QUIZ_ANSWERED,
	UPDATE_RESPONDENT_QUIZ,
	GET_RESPONDENT_INFO,
	GET_QUIZ_FROM_RESP,
	GET_QUIZ_ERROR,
} from "../types";

//create custom hook for respondent context
export const useRespondent = () => {
	const { state, dispatch } = useContext(RespondentContext);
	return [state, dispatch];
};

var RESPONDENT_ROUTE = "";
if (process.env.NODE_ENV === "production") {
	RESPONDENT_ROUTE = "/api/respondent";
} else {
	RESPONDENT_ROUTE = "http://localhost:7000/api/respondent";
}

//create respondent info taken before quiz
export const respondentInfo = async (dispatch, formData, iv, hashKey, quizId) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		const res = await axios.post(
			`${RESPONDENT_ROUTE}/${iv}/userInfo/${hashKey}/quiz/${quizId}`,
			formData,
			config
		);

		dispatch({
			type: CREATE_RESPONDENT,
			payload: res.data,
		});

		loadRespondent(dispatch, iv, hashKey, quizId);
	} catch (err) {
		dispatch({
			type: RESPONDENT_ERROR,
			payload: err.response.data.msg || err.response.data.errors[0].msg,
		});
	}
};

//Load User info if exists
export const getRespondentInfo = async (dispatch, iv, hashKey, quizId) => {
	try {
		const res = await axios.get(
			`${RESPONDENT_ROUTE}/${iv}/userInfo/${hashKey}/quiz/${quizId}`
		);

		dispatch({
			type: GET_RESPONDENT_INFO,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: RESPONDENT_ERROR,
			payload: err.response.data.msg || err.response.data.errors[0].msg,
		});
	}
};

export const getRespondentQuiz = async (dispatch, iv, hashKey, quizId) => {
	try {
		const res = await axios.get(
			`${RESPONDENT_ROUTE}/${iv}/takeQuiz/${hashKey}/quiz/${quizId}`
		);

		dispatch({
			type: GET_RESPONDENT_QUIZ,
			payload: res.data.quiz_resp,
		});
		loadRespondent(dispatch, iv, hashKey, quizId);
	} catch (err) {
		dispatch({
			type: RESPONDENT_ERROR,
			payload: err.response.data.msg || err.response.data.errors[0].msg,
		});
	}
};

export const getRespondentQuizById = async (dispatch, respondentId, quizId) => {
	try {
		const res = await axios.get(
			`${RESPONDENT_ROUTE}/${respondentId}/quiz/${quizId}`
		);

		dispatch({
			type: GET_RESPONDENT_QUIZ_ANSWERED,
			payload: res.data.quiz_resp_ans,
		});
		loadRespondentById(dispatch, respondentId, quizId);
	} catch (err) {
		dispatch({
			type: RESPONDENT_ERROR,
			payload: err.response.data.msg || err.response.data.errors[0].msg,
		});
	}
};

export const loadRespondentById = async (dispatch, respondentId, quizId) => {
	try {
		const res = await axios.get(
			`${RESPONDENT_ROUTE}/${respondentId}/quiz/${quizId}`
		);

		dispatch({
			type: RESPONDENT_LOADED,
			payload: res.data.respondent,
		});
	} catch (err) {
		dispatch({
			type: RESPONDENT_ERROR,
			payload: err.response.data.msg || err.response.data.errors[0].msg,
		});
	}
};

//Load User
export const loadRespondent = async (dispatch, iv, hashKey, quizId) => {
	try {
		const res = await axios.get(
			`${RESPONDENT_ROUTE}/${iv}/takeQuiz/${hashKey}/quiz/${quizId}`
		);

		dispatch({
			type: RESPONDENT_LOADED,
			payload: res.data.respondent,
		});
	} catch (err) {
		dispatch({
			type: RESPONDENT_ERROR,
			payload: err.response.data.msg || err.response.data.errors[0].msg,
		});
	}
};

//Load User
export const loadRespondents = async (dispatch, quizId) => {
	try {
		const res = await axios.get(`${RESPONDENT_ROUTE}/quiz/${quizId}`);

		dispatch({
			type: LOAD_RESPONDENTS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: RESPONDENT_ERROR,
			payload: err.response.data.msg || err.response.data.errors[0].msg,
		});
	}
};

export const updateRespondentQuiz = async (
	dispatch,
	respondentId,
	quizId,
	data
) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const res = await axios.put(
			`${RESPONDENT_ROUTE}/${respondentId}/quiz/${quizId}`,
			data,
			config
		);
		dispatch({
			type: UPDATE_RESPONDENT_QUIZ,
			payload: res.data,
		});
		// console.log(res.data);
	} catch (err) {
		dispatch({
			type: RESPONDENT_ERROR,
			payload: err.response.data.msg || err.response.data.errors[0].msg,
		});
	}
};
export const takeQuiz = async (dispatch, formData, iv, hashKey, quizId) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const res = await axios.patch(
			`${RESPONDENT_ROUTE}/${iv}/takeQuiz/${hashKey}/quiz/${quizId}`,
			formData,
			config
		);

		dispatch({
			type: TAKE_QUIZ,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: RESPONDENT_ERROR,
			payload: err.response.data.msg || err.response.data.errors[0].msg,
		});
		console.log(err.response);
	}
};

//get quiz
export const getQuiz = async (dispatch, _id) => {
    try {
		const res = await axios.get(`${RESPONDENT_ROUTE}/getquiz/${_id}`);

		dispatch({
            type: GET_QUIZ_FROM_RESP,
			payload: res.data,
        });
        console.log(res.data)
	} catch (err) {
		dispatch({
			type: GET_QUIZ_ERROR,
			payload: err.response.data.msg || err.response.data.errors[0].msg,
		});
	}
};

export const clearErrors = (dispatch) => dispatch({ type: CLEAR_ERRORS });

const RespondentState = (props) => {
	const initialState = {
		respondents: null,
		respondent: null,
		quiz_resp_all: null,
		quiz_resp: null,
		quiz_resp_ans: null,
		error: null,
		loading: true,
		updateFinish: false,
		quiz: null,
		quiz_error: null
	};

	const [state, dispatch] = useReducer(RespondentReducer, initialState);

	return (
		<RespondentContext.Provider
			value={{
				state: state,
				dispatch,
			}}
		>
			{props.children}
		</RespondentContext.Provider>
	);
};

export default RespondentState;
