import React, { useState, useEffect } from "react";
import {
	Button,
	Modal,
	Form,
	FormControl,
	InputGroup,
	Container,
	Row,
	Col,
} from "react-bootstrap";
import Radium from "radium";

import Questions from "../layouts/Questions";
import DynamicForm from "../layouts/DynamicForm";
import CreateQuizAlert from "../Alerts/AlertCreateQuiz";
import {
	clearErrors,
	createQuiz,
	useQuizzes,
} from "../../context/quiz/QuizState";
import AlertQuizSubmit from "../Alerts/AlertQuizSubmit";

const answerKeyWidth = { 
	padding:"5px", 
	border:"1px solid rgba(0, 0, 0, .2)",
	'@media (max-width: 800px)': {
        width: "200",
      },
	'@media (max-width: 470px)': {
        width: "50",
      },
}


const ColoredLine = ({ color }) => (
	<hr
		style={{
			color: color,
			backgroundColor: color,
			height: 1,
		}}
	/>
);

function CreateQuiz(props) {
	const [notes, setNotes] = useState([]);
	const [quizState, quizDispatch] = useQuizzes();
	const [title, setTitle] = useState("");
	const [timeLimit, setTimeLimit] = useState(0);
	const [alert, setShowAlert] = useState(false);
	const [quizCreatedModal, setQuizCreatedModal] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [completed, setCompleted] = useState(false);

	const { error } = quizState;

	useEffect(() => {
		if (error) {
			setShowAlert(true);
			setTimeout(() => {
				clearErrors(quizDispatch);
				setShowAlert(false);
			}, 5000);
		}
	}, [error, quizDispatch, completed]);

	//Temp data to hold edit data
	const [tempNote, setTemp] = useState({
		id: 0,
		Question: "",
        points: 0,
		Type: "NA",
		Choice1: "",
		Choice2: "",
		Choice3: "",
		Choice4: "",
		Choice5: "",
		Choice6: "",
		AnswerKey: "",
		Sel2Open: true,
		Sel3Open: true,
		Sel4Open: true,
		Sel5Open: true,
		Sel6Open: true,
		AnsKeyOpen: true,
		show: false,
		addOpen: true,
	});

	const [multi, setMulti] = useState({
		multiAnswer: [],
		Check1: false,
		Check2: false,
		Check3: false,
		Check4: false,
		Check5: false,
		Check6: false,
	});

	// function to sync the temp with actual data
	function tempSync(passedNotes) {
		tempNote.Question = passedNotes[tempNote.id].Question;
		tempNote.points = passedNotes[tempNote.id].points;
		tempNote.Type = passedNotes[tempNote.id].Type;
		tempNote.Choice1 = passedNotes[tempNote.id].Choice1;
		tempNote.Choice2 = passedNotes[tempNote.id].Choice2;
		tempNote.Choice3 = passedNotes[tempNote.id].Choice3;
		tempNote.Choice4 = passedNotes[tempNote.id].Choice4;
		tempNote.Choice5 = passedNotes[tempNote.id].Choice5;
		tempNote.Choice6 = passedNotes[tempNote.id].Choice6;
		tempNote.AnswerKey = passedNotes[tempNote.id].AnswerKey;
		tempNote.Sel1Open = passedNotes[tempNote.id].Sel1Open;
		tempNote.Sel2Open = passedNotes[tempNote.id].Sel2Open;
		tempNote.Sel3Open = passedNotes[tempNote.id].Sel3Open;
		tempNote.Sel4Open = passedNotes[tempNote.id].Sel4Open;
		tempNote.Sel5Open = passedNotes[tempNote.id].Sel5Open;
		tempNote.Sel6Open = passedNotes[tempNote.id].Sel6Open;
		tempNote.AnsKeyOpen = passedNotes[tempNote.id].AnsKeyOpen;
		tempNote.addOpen = passedNotes[tempNote.id].addOpen;
		multi.multiAnswer = passedNotes[tempNote.id].AnswerKey.split(",")
		updateMulti()
	}
	function updateMulti(){
		multi.multiAnswer.includes(tempNote.Choice1) ? multi.Check1 = true : multi.Check1 = false
		multi.multiAnswer.includes(tempNote.Choice2) ? multi.Check2 = true : multi.Check2 = false
		multi.multiAnswer.includes(tempNote.Choice3) ? multi.Check3 = true : multi.Check3 = false
		multi.multiAnswer.includes(tempNote.Choice4) ? multi.Check4 = true : multi.Check4 = false
		multi.multiAnswer.includes(tempNote.Choice5) ? multi.Check5 = true : multi.Check5 = false
		multi.multiAnswer.includes(tempNote.Choice6) ? multi.Check6 = true : multi.Check6 = false
		tempNote.Sel1Open = multi.Check1
		tempNote.Sel2Open = multi.Check2
		tempNote.Sel3Open = multi.Check3
		tempNote.Sel4Open = multi.Check4
		tempNote.Sel5Open = multi.Check5
		tempNote.Sel6Open = multi.Check6
	}

	function checkMulti(name, type){
		if(tempNote.Type === "TF")
		{
			return
		}
		if(type === "radio"){
			console.log("hi")
			switch (name) {
				case "A":
					multi.Check1 = true;
					multi.Check2 = false;
					multi.Check3 = false;
					multi.Check4 = false;
					multi.Check5 = false;
					multi.Check6 = false;
					tempNote.Sel1Open = true;
					tempNote.Sel2Open = tempNote.Choice1 === "" ? true : false;
					tempNote.Sel3Open = tempNote.Choice2 === "" ? true : false;
					tempNote.Sel4Open = tempNote.Choice3 === "" ? true : false;
					tempNote.Sel5Open = tempNote.Choice4 === "" ? true : false;
					tempNote.Sel6Open = tempNote.Choice5 === "" ? true : false;
					return;
				case "B":
					multi.Check1 = false;
					multi.Check2 = true;
					multi.Check3 = false;
					multi.Check4 = false;
					multi.Check5 = false;
					multi.Check6 = false;
					tempNote.Sel1Open = tempNote.Choice1 === "" ? true : false;
					tempNote.Sel2Open = true;
					tempNote.Sel3Open = tempNote.Choice2 === "" ? true : false;
					tempNote.Sel4Open = tempNote.Choice3 === "" ? true : false;
					tempNote.Sel5Open = tempNote.Choice4 === "" ? true : false;
					tempNote.Sel6Open = tempNote.Choice5 === "" ? true : false;
					return;
				case "C":
					multi.Check1 = false;
					multi.Check2 = false;
					multi.Check3 = true;
					multi.Check4 = false;
					multi.Check5 = false;
					multi.Check6 = false;
					tempNote.Sel1Open = tempNote.Choice1 === "" ? true : false;
					tempNote.Sel2Open = tempNote.Choice2 === "" ? true : false;
					tempNote.Sel3Open = true;
					tempNote.Sel4Open = tempNote.Choice3 === "" ? true : false;
					tempNote.Sel5Open = tempNote.Choice4 === "" ? true : false;
					tempNote.Sel6Open = tempNote.Choice5 === "" ? true : false;
					return;
				case "D":
					multi.Check1 = false;
					multi.Check2 = false;
					multi.Check3 = false;
					multi.Check4 = true;
					multi.Check5 = false;
					multi.Check6 = false;
					tempNote.Sel1Open = tempNote.Choice1 === "" ? true : false;
					tempNote.Sel2Open = tempNote.Choice2 === "" ? true : false;
					tempNote.Sel3Open = tempNote.Choice3 === "" ? true : false;
					tempNote.Sel4Open = true;
					tempNote.Sel5Open = tempNote.Choice4 === "" ? true : false;
					tempNote.Sel6Open = tempNote.Choice5 === "" ? true : false;
					return;
				case "E":
					multi.Check1 = false;
					multi.Check2 = false;
					multi.Check3 = false;
					multi.Check4 = false;
					multi.Check5 = true;
					multi.Check6 = false;
					tempNote.Sel1Open = tempNote.Choice1 === "" ? true : false;
					tempNote.Sel2Open = tempNote.Choice2 === "" ? true : false;
					tempNote.Sel3Open = tempNote.Choice3 === "" ? true : false;
					tempNote.Sel4Open = tempNote.Choice4 === "" ? true : false;
					tempNote.Sel5Open = true;
					tempNote.Sel6Open = tempNote.Choice5 === "" ? true : false;
					return;
				case "F":
					multi.Check1 = false;
					multi.Check2 = false;
					multi.Check3 = false;
					multi.Check4 = false;
					multi.Check5 = false;
					multi.Check6 = true;
					tempNote.Sel1Open = tempNote.Choice1 === "" ? true : false;
					tempNote.Sel2Open = tempNote.Choice2 === "" ? true : false;
					tempNote.Sel3Open = tempNote.Choice3 === "" ? true : false;
					tempNote.Sel4Open = tempNote.Choice4 === "" ? true : false;
					tempNote.Sel5Open = tempNote.Choice5 === "" ? true : false;
					tempNote.Sel6Open = true;
					return;
				default:
					return;
				}
		}
		else{
			switch (name) {
				case "A":
					if(multi.Check1 === false)
					{
	
						multi.Check1 = true;
						tempNote.Sel1Open = true;
					} else{
						multi.Check1 = false;
						tempNote.Sel1Open = false;
					}
					return;
				case "B":
					if(multi.Check2 === false)
					{
						multi.Check2 = true;
						tempNote.Sel2Open = true;
					} else{
						multi.Check2 = false;
						tempNote.Sel2Open = false;
					}
					return;
				case "C":
					if(multi.Check3 === false)
					{
						multi.Check3 = true;
						tempNote.Sel3Open = true;
					} else{
						multi.Check3 = false;
						tempNote.Sel3Open = false;
					}
					return;
				case "D":
					if(multi.Check4 === false)
					{
						multi.Check4 = true;
						tempNote.Sel4Open = true;
					} else{
						multi.Check4 = false;
						tempNote.Sel4Open = false;
					}
					return;
				case "E":
					if(multi.Check5 === false)
					{
						multi.Check5 = true;
						tempNote.Sel5Open = true;
					} else{
						multi.Check5 = false;
						tempNote.Sel5Open = false;
					}
					return;
				case "F":
					if(multi.Check6 === false)
					{
						multi.Check6 = true;
						tempNote.Sel6Open = true;
					} else{
						multi.Check6 = false;
						tempNote.Sel6Open = false;
					}
					return;
				default:
					return;
			}
		}
	};
	
	

	function handleMultiChange(event) {
		var type = event.target.type

		checkMulti(event.target.getAttribute("id"), type);
		let newArray = [...multi.multiAnswer, event.target.value];
		if (multi.multiAnswer.includes(event.target.value)) {
		  newArray = newArray.filter(ans => ans !== event.target.value);
		} 
		
		if(type === "radio"){
			createTemp(event)
			return
		}

		setMulti((prevMulti)=>{
			return {
				...prevMulti,
				multiAnswer:newArray,
			}
		})

		if(newArray.length)
		{
			tempNote.AnswerKey = newArray.toString();
		}
		else
		{
			tempNote.AnswerKey = "";
		}
		createTemp("","AnswerKey",tempNote.AnswerKey);
		return
	}

	function FormRenderCheck(type){
		if(type === "checkbox"){
			return(
				<Form.Group>
					<InputGroup >
						<InputGroup.Text>Anwser Key</InputGroup.Text>
							<div style={answerKeyWidth}>
							<Form.Check
								type = {type}
								id = "A"
								label="A"
								name='AnswerKey'
								Value = {tempNote.Choice1}
								disabled= {tempNote.Choice1 == "" ? true : false}
								checked= {multi.multiAnswer.includes(tempNote.Choice1) ? true : false}
								inline = {true}
								onChange={handleMultiChange}
							 />
							 <Form.Check
								 type = {type}
								id = "B"
								label="B"
								name='AnswerKey'
								Value = {tempNote.Choice2}
								disabled= {tempNote.Choice2 == "" ? true : false}
								checked= {multi.multiAnswer.includes(tempNote.Choice2) ? true : false}
								inline = {true}
								onChange={handleMultiChange}
	
							 />
							<Form.Check
								type = {type}
								id = "C"
								label="C"
								name='AnswerKey'
								Value = {tempNote.Choice3}
								disabled= {tempNote.Choice3 == "" ? true : false}
								checked= {multi.multiAnswer.includes(tempNote.Choice3) ? true : false}
	
								inline = {true}
								onChange={handleMultiChange}
							 />
							 <Form.Check
								type = {type}
								id = "D"
								label="D"
								name='AnswerKey'
								Value = {tempNote.Choice4}
								disabled= {tempNote.Choice4 == "" ? true : false}
								checked= {multi.multiAnswer.includes(tempNote.Choice4) ? true : false}
								inline = {true}
								onChange={handleMultiChange}
							 />
							 <Form.Check
								 type = {type}
								 id = "E"
								label="E"
								name='AnswerKey'
								Value = {tempNote.Choice5}
								disabled= {tempNote.Choice5 == "" ? true : false}
								checked= {multi.multiAnswer.includes(tempNote.Choice5) ? true : false}
								inline = {true}
								onChange={handleMultiChange}
							 />
							 <Form.Check
								 type = {type}
								 id = "F"
								label="F"
								name='AnswerKey'
								Value = {tempNote.Choice6}
								disabled= {tempNote.Choice6 == "" ? true : false}
								checked= {multi.multiAnswer.includes(tempNote.Choice6) ? true : false}
								inline = {true}
								onChange={handleMultiChange}
							 />
							 </div>
						</InputGroup>
					</Form.Group>
			)
		}else{
			return(
				<Form.Group>
					<InputGroup >
						<InputGroup.Text>Anwser Key</InputGroup.Text>
							<div style={answerKeyWidth}>
							<Form.Check
								type = {type}
								id = "A"
								label="A"
								name='AnswerKey'
								Value = {tempNote.Choice1}
								disabled= {tempNote.Choice1 == "" ? true : false}
								checked= {tempNote.AnswerKey == tempNote.Choice1 ? true : false}
								inline = {true}
								onChange={handleMultiChange}
							 />
							 <Form.Check
								type = {type}
								id = "B"
								label="B"
								name='AnswerKey'
								Value = {tempNote.Choice2}
								disabled= {tempNote.Choice2 == "" ? true : false}
								checked= {tempNote.AnswerKey == tempNote.Choice2 ? true : false}
								inline = {true}
								onChange={handleMultiChange}
	
							 />
							<Form.Check
								type = {type}
								id = "C"
								label="C"
								name='AnswerKey'
								Value = {tempNote.Choice3}
								disabled= {tempNote.Choice3 == "" ? true : false}
								checked= {tempNote.AnswerKey == tempNote.Choice3 ? true : false}
								inline = {true}
								onChange={handleMultiChange}
							 />
							 <Form.Check
								type = {type}
								id = "D"
								label="D"
								name='AnswerKey'
								Value = {tempNote.Choice4}
								disabled= {tempNote.Choice4 == "" ? true : false}
								checked= {tempNote.AnswerKey == tempNote.Choice4 ? true : false}
								inline = {true}
								onChange={handleMultiChange}
							 />
							 <Form.Check
								 type = {type}
								 id = "E"
								label="E"
								name='AnswerKey'
								Value = {tempNote.Choice5}
								disabled= {tempNote.Choice5 == "" ? true : false}
								checked= {tempNote.AnswerKey == tempNote.Choice5 ? true : false}
								inline = {true}
								onChange={handleMultiChange}
							 />
							 <Form.Check
								 type = {type}
								 id = "F"
								label="F"
								name='AnswerKey'
								Value = {tempNote.Choice6}
								disabled= {tempNote.Choice6 == "" ? true : false}
								checked= {tempNote.AnswerKey == tempNote.Choice6 ? true : false}
								inline = {true}
								onChange={handleMultiChange}
							 />
							 </div>
						</InputGroup>
					</Form.Group>
			)
		}
	}

	//function to modal to get a new data input from a user
	function getUpdateData(questionArr) {
		return (
			<div>
				<Modal size="lg" show={tempNote.show}>
					<Container>
						<Form>
							<Form.Group className="mb-3">
								<Form.Label>Question:</Form.Label>
								<Form.Control
									type="text"
									name="Question"
									onChange={createTemp}
									value={tempNote.Question}
								/>
							</Form.Group>
							<InputGroup className="mb-3">
                                <InputGroup.Text>Points</InputGroup.Text>
                                <Form.Control
                                    type="number" 
                                    inputmode="numeric" 
                                    name="points"
									onChange={createTemp}
									value={tempNote.points}
                                />
                                <InputGroup.Text>Type</InputGroup.Text>
                                <Form.Select
                                    name="Type"
									onChange={createTemp}
									value={tempNote.Type}
                                >
                                    <option value="NA" selected hidden>
                                        Select here
                                    </option>
                                    <option value="TF">True or False</option>
                                    <option value="SC">Single Choice</option>
                                    <option value="MC">Multiple Choice</option>
                                    <option value="FR">Free Response</option>
                                </Form.Select>
                        	</InputGroup>
							<Form.Group  style={{paddingBottom:10}}>
								<Form.Control
									type="text"
									name="Choice1"
									onChange={createTemp}
									value={tempNote.Choice1}
									placeholder="Selection A"
									disabled={tempNote.Type === "TF" ? true : tempNote.Sel1Open}
								/>
								<Form.Control
									type="text"
									name="Choice2"
									onChange={createTemp}
									value={tempNote.Choice2}
									placeholder="Selection B"
									disabled={tempNote.Type === "TF" ? true : tempNote.Sel2Open}
								/>
								<Form.Control
									type="text"
									name="Choice3"
									onChange={createTemp}
									value={tempNote.Choice3}
									placeholder="Selection C"
									disabled={tempNote.Type === "TF" ? true : tempNote.Sel3Open}
								/>
								<Form.Control
									type="text"
									name="Choice4"
									onChange={createTemp}
									value={tempNote.Choice4}
									placeholder="Selection D"
									disabled={tempNote.Type === "TF" ? true : tempNote.Sel4Open}
								/>
								<Form.Control
									type="text"
									name="Choice5"
									onChange={createTemp}
									value={tempNote.Choice5}
									placeholder="Selection E"
									disabled={tempNote.Type === "TF" ? true : tempNote.Sel5Open}
								/>
								<Form.Control
									type="text"
									name="Choice6"
									onChange={createTemp}
									value={tempNote.Choice6}
									placeholder="Selection F"
									disabled={tempNote.Type === "TF" ? true : tempNote.Sel6Open}
								/>
							</Form.Group>
							<InputGroup className="mb-3">
							{tempNote.Type === "TF" && FormRenderCheck("radio")}
							{tempNote.Type === "SC" && FormRenderCheck("radio")}
						 	{tempNote.Type === "MC" && FormRenderCheck("checkbox")}
							{tempNote.Type === "FR" && (
								<FormControl
								type="text"
								name="AnswerKey"
								onChange={createTemp}
								value={tempNote.AnswerKey}
								placeholder="AnswerKey"
								disabled={tempNote.AnsKeyOpen}
								/>
							)}
								<Button
									variant="warning"
									id="button-addon2"
									onClick={() => changeData(questionArr[tempNote.id])}
									disabled={tempNote.addOpen}
								>
									Save
								</Button>
								<Button
									variant="danger"
									id="button-addon2"
									value={"close"}
									onClick={editCnl}
								>
									Cancel
								</Button>
							</InputGroup>
						</Form>
					</Container>
				</Modal>
			</div>
		);
	}

	//this is a form input handler
	function handleInput(name, value) {
		switch (name) {
			case "Type":
				if (value === "FR") {
					tempNote.addOpen = true;
					tempNote.Choice1 = " ";
					tempNote.Choice2 = "";
					tempNote.Choice3 = "";
					tempNote.Choice4 = "";
					tempNote.Choice5 = "";
					tempNote.Choice6 = "";
					tempNote.AnswerKey = "";
					tempNote.AnsKeyOpen = false;
					tempNote.Sel1Open = true;
					tempNote.Sel2Open = true;
					tempNote.Sel3Open = true;
					tempNote.Sel4Open = true;
					tempNote.Sel5Open = true;
					return (tempNote.Sel6Open = true);
				}
				if (value === "TF") {
					tempNote.Choice1 = "True";
					tempNote.Choice2 = "False";
					tempNote.Choice3 = "";
					tempNote.Choice4 = "";
					tempNote.Choice5 = "";
					tempNote.Choice6 = "";
					tempNote.addOpen = true
					tempNote.AnswerKey = "";
					tempNote.AnsKeyOpen = true;
					tempNote.Sel1Open = true;
					tempNote.Sel2Open = true;
					tempNote.Sel3Open = true;
					tempNote.Sel4Open = true;
					tempNote.Sel5Open = true;
					return (tempNote.Sel6Open = true);
				}
				if (value === "SC") {
					tempNote.Choice1 = "";
					tempNote.Choice2 = "";
					tempNote.Choice3 = "";
					tempNote.Choice4 = "";
					tempNote.Choice5 = "";
					tempNote.Choice6 = "";
					tempNote.addOpen = true
					tempNote.AnswerKey = "";
					tempNote.Sel1Open = false;
					tempNote.Sel2Open = true;
					tempNote.Sel3Open = true;
					tempNote.Sel4Open = true;
					tempNote.Sel5Open = true;
					return (tempNote.Sel6Open = true);
				}
				if (value === "MC") {
					tempNote.Choice1 = "";
					tempNote.Choice2 = "";
					tempNote.Choice3 = "";
					tempNote.Choice4 = "";
					tempNote.Choice5 = "";
					tempNote.Choice6 = "";
					tempNote.AnswerKey = "";
					tempNote.addOpen = true
					tempNote.Sel1Open = false;
					tempNote.Sel2Open = true;
					tempNote.Sel3Open = true;
					tempNote.Sel4Open = true;
					tempNote.Sel5Open = true;
					return (tempNote.Sel6Open = true);
				}
				return ;
			case "Choice1":
				tempNote.AnsKeyOpen = false;
				return (tempNote.Sel2Open = false);
			case "Choice2":
				return (tempNote.Sel3Open = false);
			case "Choice3":
				return (tempNote.Sel4Open = false);
			case "Choice4":
				return (tempNote.Sel5Open = false);
			case "Choice5":
				return (tempNote.Sel6Open = false);
			case "AnswerKey":
				if(tempNote.AnswerKey.length == 0)
				{
					return (tempNote.addOpen = true);
				} else {
					return (tempNote.addOpen = false);
				}
			default:
				return;
		}
	}

	// it creats tempQuestion data
	function createTemp(event, type, val1) {

		if(type === "AnswerKey")
		{
			handleInput(type);
			setTemp((preveTemp) => {
				return {
					...preveTemp,
					AnswerKey: val1,
				};
			});
		}
		else{
			const { name, value } = event.target;	
			// prevent a user from adding a question without answer key
			if(value.length == 0)
			{
				tempNote[name] = "";
			}

			//assgin value in advance to update the add button
			if(name === "AnswerKey"){
				tempNote[name] = value;	
			}

			handleInput(name, value);
			setTemp((preveTemp) => {
				return {
					...preveTemp,
					[name]: value,
				};
			});
		}


	}

	//just return current notes to re-render data
	function reRender() {
		setNotes((Notes) => {
			return [...Notes];
		});
	}

	//Change actual data that needs to be saved
	function changeData(actualData) {
		actualData.Question = tempNote.Question;
		actualData.points = tempNote.points;
		actualData.Type = tempNote.Type;
		actualData.Choice1 = tempNote.Choice1;
		actualData.Choice2 = tempNote.Choice2;
		actualData.Choice3 = tempNote.Choice3;
		actualData.Choice4 = tempNote.Choice4;
		actualData.Choice5 = tempNote.Choice5;
		actualData.Choice6 = tempNote.Choice6;
		actualData.AnswerKey = tempNote.AnswerKey;
		actualData.Sel2Open = tempNote.Sel2Open;
		actualData.Sel3Open = tempNote.Sel3Open;
		actualData.Sel4Open = tempNote.Sel4Open;
		actualData.Sel5Open = tempNote.Sel5Open;
		actualData.Sel6Open = tempNote.Sel6Open;
		actualData.AnsKeyOpene = tempNote.AnsKeyOpene;
		setTemp({
			id: 0,
			Question: "",
			points: 0,
			Type: "NA",
			Choice1: "",
			Choice2: "",
			Choice3: "",
			Choice4: "",
			Choice5: "",
			Choice6: "",
			AnswerKey: "",
			Sel2Open: true,
			Sel3Open: true,
			Sel4Open: true,
			Sel5Open: true,
			Sel6Open: true,
			AnsKeyOpen: true,
			show: false,
		});
		setMulti({
			multiAnswer:[],
			Check1: false,
			Check2: false,
			Check3: false,
			Check4: false,
			Check5: false,
			Check6: false,
		});

		reRender();
	}

	function addNote(newNote) {
		setNotes((prevNotes) => {
			return [...prevNotes, newNote];
		});
	}

	function deleteNote(id) {
		setNotes((prevNotes) => {
			return prevNotes.filter((noteItem, index) => {
				return index !== id;
			});
		});
	}

	function editNote(id) {
		tempNote.show = true;
		tempNote.id = id;
		tempSync(notes);

		reRender();
	}

	function editCnl() {
		tempNote.show = false;
		setTemp({
			id: 0,
			Question: "",
            points: "",
			Type: "NA",
			Choice1: "",
			Choice2: "",
			Choice3: "",
			Choice4: "",
			Choice5: "",
			Choice6: "",
			AnswerKey: "",
			Sel1Open: true,
			Sel2Open: true,
			Sel3Open: true,
			Sel4Open: true,
			Sel5Open: true,
			Sel6Open: true,
			AnsKeyOpen: true,
			show: false,
		});
		reRender();
	}

	function formatQuestions(notes) {
		var questionArray = [];
		for (var i = 0; i < notes.length; i++) {
			var questionObj = {};
			// questionObj["question_id"] = toString(i);
			questionObj["question"] = notes[i]["Question"];
			questionObj["questionType"] = notes[i]["Type"];
			// add answer options
			questionObj["answerOptions"] = [];
			for (var j = 1; j <= 6; j++) {
				var answer = "Choice" + j;
				if (notes[i][answer] !== "") {
					questionObj["answerOptions"].push(notes[i][answer]);
				}
			}
			questionObj["answer"] = notes[i]["AnswerKey"]
				.split(",")
				.map((input) => input.trim());;
			questionObj["points"] = notes[i]["points"];

			questionArray.push(questionObj);
		}

		return questionArray;
	}

	function getTotalPoints(questions) {
		let totalPoints = 0;
		for (var i = 0; i < questions.length; i++) {
			totalPoints += parseInt(questions[i].points, 10);
		}
		return totalPoints;
	}

	const onTitleChange = (e) => {
		setTitle(e.target.value);
		clearErrors(quizDispatch);
        setCompleted(true);
        setShowAlert(false);
	};

	const onTimeLimitChange = (e) => {
		setTimeLimit(Math.trunc(e.target.value));
		clearErrors(quizDispatch);
        setCompleted(true);
        setShowAlert(false);
	};

	function onSubmit(event) {
		event.preventDefault();

		if (!error) {
			const questions = formatQuestions(notes);
			const totalScore = getTotalPoints(questions);

			createQuiz(quizDispatch, {
				title,
				questions,
				timeLimit,
				totalScore,
			});

            if(title !== '' && timeLimit > 0 && completed) {
                setConfirmMessage(
                    "You have successfully created your quiz! " + 
                    "Please click 'OK' to navigate to your dashboard. " + 
                    "You can see newly created quiz and send out to your candidates on Past Quizzes page."
                    );
                setQuizCreatedModal(true);

                setTitle("");
                setTimeLimit(0);
            }
		}
	}

	return (
		<div>
			<CreateQuizAlert
				error={error}
				alert={alert}
				setShowAlert={setShowAlert}
			/>
            <AlertQuizSubmit 
                confirmMessage={confirmMessage}
                alert={quizCreatedModal}
                setShowAlert={setQuizCreatedModal}
                submitTest={null}
            />
			<DynamicForm onAdd={addNote} />
			<br />
			<Form onSubmit={onSubmit}>
				<Row className="align-items-center">
					<Col xs={9}>
						<Form.Control
							className="mb-2"
							type="text"
							name="title"
							onChange={onTitleChange}
							value={title}
							placeholder="Quiz Title"
						/>
					</Col>
					<Col xs="auto">
						<InputGroup className="mb-2">
							<FormControl
								type="text"
								name="timeLimit"
								value={timeLimit}
								onChange={onTimeLimitChange}
								placeholder="Quiz Duration"
							/>
							<InputGroup.Text>Minutes</InputGroup.Text>
						</InputGroup>
					</Col>
				</Row>
			</Form>
			<ColoredLine color="grey" />

			{notes.map((noteItem, index) => {
				return (
					<div>
						<Questions
							key={index}
							id={index}
							Question={noteItem.Question}
							points={noteItem.points}
							Type={noteItem.Type}
							Choice1={noteItem.Choice1}
							Choice2={noteItem.Choice2}
							Choice3={noteItem.Choice3}
							Choice4={noteItem.Choice4}
							Choice5={noteItem.Choice5}
							Choice6={noteItem.Choice6}
							AnswerKey={noteItem.AnswerKey}
							onDelete={deleteNote}
							onEdit={editNote}
							setCompleted={setCompleted}
						/>
						<ColoredLine color="grey" />
					</div>
				);
			})}
			{notes.length >= 1 && getUpdateData(notes)}
			{notes.length >= 1 && (
				<div style={{ textAlign: "right" }}>
					<Button variant="warning" type="submit" onClick={onSubmit}>
						Complete
					</Button>
				</div>
			)}
		</div>
	);
}

export default Radium(CreateQuiz);
