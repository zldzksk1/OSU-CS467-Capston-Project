import React, { useState } from "react";
import Radium from "radium";
import {
	Form,
	Button,
	Container,
	InputGroup,
	FormControl,
	FormGroup,
} from "react-bootstrap";

const resizeLeft = {
    float: "left",
    width: "30%",
    '@media (max-width: 1410px)': {
        width: "100%",
      },
}

const resizeRight = {
    float: "right",
    width: "70%",
    '@media (max-width: 1410px)': {
        width: "100%",
      },
}

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
			height: 4,
			marginTop: 0,
		}}
	/>
);

const instyle = {
	marginBottom: 5,
};

function DynamicForm(props) {

	const [multi, setMulti] = useState({
		multiAnswer: [],
		Check1: false,
		Check2: false,
		Check3: false,
		Check4: false,
		Check5: false,
		Check6: false,
	});

	//question data need to be saved
	const [note, setNote] = useState({
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
		//below is for form control vars
		Sel1Open: true,
		Sel2Open: true,
		Sel3Open: true,
		Sel4Open: true,
		Sel5Open: true,
		Sel6Open: true,
		AnsKeyOpen: true,
		addOpen: true,
	});

	function handleInput(name, value) {
		switch (name) {
			case "Type":
				if (value === "FR") {
					note.addOpen = true;
					note.Choice1 = " ";
					note.Choice2 = "";
					note.Choice3 = "";
					note.Choice4 = "";
					note.Choice5 = "";
					note.Choice6 = "";
					note.AnswerKey = "";
					note.AnsKeyOpen = false;
					note.Sel1Open = true;
					note.Sel2Open = true;
					note.Sel3Open = true;
					note.Sel4Open = true;
					note.Sel5Open = true;
					return (note.Sel6Open = true);
				}
				if (value === "TF") {
					note.Choice1 = "True";
					note.Choice2 = "False";
					note.Choice3 = "";
					note.Choice4 = "";
					note.Choice5 = "";
					note.Choice6 = "";
					note.AnswerKey = "";
					note.addOpen = true
					note.AnsKeyOpen = false;
					note.Sel1Open = true;
					note.Sel2Open = true;
					note.Sel3Open = true;
					note.Sel4Open = true;
					note.Sel5Open = true;
					return (note.Sel6Open = true);
				}
				if (value === "SC") {
					note.Choice1 = "";
					note.Choice2 = "";
					note.Choice3 = "";
					note.Choice4 = "";
					note.Choice5 = "";
					note.Choice6 = "";
					note.AnswerKey = "";
					note.addOpen = true
					note.Sel1Open = false;
					note.Sel2Open = true;
					note.Sel3Open = true;
					note.Sel4Open = true;
					note.Sel5Open = true;
					return (note.Sel6Open = true);
				}
				if (value === "MC") {
					note.Choice1 = "";
					note.Choice2 = "";
					note.Choice3 = "";
					note.Choice4 = "";
					note.Choice5 = "";
					note.Choice6 = "";
					note.AnswerKey = "";
					note.addOpen = true
					note.Sel1Open = false;
					note.Sel2Open = true;
					note.Sel3Open = true;
					note.Sel4Open = true;
					note.Sel5Open = true;
					return (note.Sel6Open = true);
				}
				return ;
			case "Choice1":
				note.AnsKeyOpen = false;
				return (note.Sel2Open = false);
			case "Choice2":
				return (note.Sel3Open = false);
			case "Choice3":
				return (note.Sel4Open = false);
			case "Choice4":
				return (note.Sel5Open = false);
			case "Choice5":
				return (note.Sel6Open = false);
			case "AnswerKey":
				if(note.AnswerKey.length === 0){
					return (note.addOpen = true);
				}else{
					return (note.addOpen = false);
				}
            default:
                return;
		}
	};

	function checkMulti(name, type){
		if(note.Type === "TF")
		{
			return
		}
		if(type === "radio"){
			switch (name) {
				case "A":
					multi.Check1 = true;
					multi.Check2 = false;
					multi.Check3 = false;
					multi.Check4 = false;
					multi.Check5 = false;
					multi.Check6 = false;
					note.Sel1Open = true;
					note.Sel2Open = note.Choice1 === "" ? true : false;
					note.Sel3Open = note.Choice2 === "" ? true : false;
					note.Sel4Open = note.Choice3 === "" ? true : false;
					note.Sel5Open = note.Choice4 === "" ? true : false;
					note.Sel6Open = note.Choice5 === "" ? true : false;
					return;
				case "B":
					multi.Check1 = false;
					multi.Check2 = true;
					multi.Check3 = false;
					multi.Check4 = false;
					multi.Check5 = false;
					multi.Check6 = false;
					note.Sel1Open = note.Choice1 === "" ? true : false;
					note.Sel2Open = true;
					note.Sel3Open = note.Choice2 === "" ? true : false;
					note.Sel4Open = note.Choice3 === "" ? true : false;
					note.Sel5Open = note.Choice4 === "" ? true : false;
					note.Sel6Open = note.Choice5 === "" ? true : false;
					return;
				case "C":
					multi.Check1 = false;
					multi.Check2 = false;
					multi.Check3 = true;
					multi.Check4 = false;
					multi.Check5 = false;
					multi.Check6 = false;
					note.Sel1Open = note.Choice1 === "" ? true : false;
					note.Sel2Open = note.Choice2 === "" ? true : false;
					note.Sel3Open = true;
					note.Sel4Open = note.Choice3 === "" ? true : false;
					note.Sel5Open = note.Choice4 === "" ? true : false;
					note.Sel6Open = note.Choice5 === "" ? true : false;
					return;
				case "D":
					multi.Check1 = false;
					multi.Check2 = false;
					multi.Check3 = false;
					multi.Check4 = true;
					multi.Check5 = false;
					multi.Check6 = false;
					note.Sel1Open = note.Choice1 === "" ? true : false;
					note.Sel2Open = note.Choice2 === "" ? true : false;
					note.Sel3Open = note.Choice3 === "" ? true : false;
					note.Sel4Open = true;
					note.Sel5Open = note.Choice4 === "" ? true : false;
					note.Sel6Open = note.Choice5 === "" ? true : false;
					return;
				case "E":
					multi.Check1 = false;
					multi.Check2 = false;
					multi.Check3 = false;
					multi.Check4 = false;
					multi.Check5 = true;
					multi.Check6 = false;
					note.Sel1Open = note.Choice1 === "" ? true : false;
					note.Sel2Open = note.Choice2 === "" ? true : false;
					note.Sel3Open = note.Choice3 === "" ? true : false;
					note.Sel4Open = note.Choice4 === "" ? true : false;
					note.Sel5Open = true;
					note.Sel6Open = note.Choice5 === "" ? true : false;
					return;
				case "F":
					multi.Check1 = false;
					multi.Check2 = false;
					multi.Check3 = false;
					multi.Check4 = false;
					multi.Check5 = false;
					multi.Check6 = true;
					note.Sel1Open = note.Choice1 === "" ? true : false;
					note.Sel2Open = note.Choice2 === "" ? true : false;
					note.Sel3Open = note.Choice3 === "" ? true : false;
					note.Sel4Open = note.Choice4 === "" ? true : false;
					note.Sel5Open = note.Choice5 === "" ? true : false;
					note.Sel6Open = true;
					return;
				default:
					return;
				}
		}
		else{
			switch (name) {
				case "A":
					if(multi.Check1 == false)
					{
	
						multi.Check1 = true;
						note.Sel1Open = true;
					} else{
						multi.Check1 = false;
						note.Sel1Open = false;
					}
					return;
				case "B":
					if(multi.Check2 == false)
					{
						multi.Check2 = true;
						note.Sel2Open = true;
					} else{
						multi.Check2 = false;
						note.Sel2Open = false;
					}
					return;
				case "C":
					if(multi.Check3 == false)
					{
						multi.Check3 = true;
						note.Sel3Open = true;
					} else{
						multi.Check3 = false;
						note.Sel3Open = false;
					}
					return;
				case "D":
					if(multi.Check4 == false)
					{
						multi.Check4 = true;
						note.Sel4Open = true;
					} else{
						multi.Check4 = false;
						note.Sel4Open = false;
					}
					return;
				case "E":
					if(multi.Check5 == false)
					{
						multi.Check5 = true;
						note.Sel5Open = true;
					} else{
						multi.Check5 = false;
						note.Sel5Open = false;
					}
					return;
				case "F":
					if(multi.Check6 == false)
					{
						multi.Check6 = true;
						note.Sel6Open = true;
					} else{
						multi.Check6 = false;
						note.Sel6Open = false;
					}
					return;
				default:
					return;
	
			}
		}
	};


	function handleMultiChange(event) {

		var type = event.target.type;
		
		checkMulti(event.target.getAttribute("id"), type);

		if(type === "radio"){
			handleChange(event)
			return
		}


		let newArray = [...multi.multiAnswer, event.target.value];
		if (multi.multiAnswer.includes(event.target.value)) {
		  newArray = newArray.filter(ans => ans !== event.target.value);
		} 
		
		setMulti((prevMulti)=>{
			return {
				...prevMulti,
				multiAnswer:newArray,
			}
		})

		if(newArray.length)
		{
			note.AnswerKey = newArray.toString();
		}
		else
		{
			note.AnswerKey = "";
		}
		handleChange("","AnswerKey",note.AnswerKey);
		return
	}

	function handleChange(event, type, val1) {

		//this is to control the multitple answerkey
		if(type === "AnswerKey")
		{
			handleInput(type);
			setNote((prevNote) => {
				return {
					...prevNote,
					AnswerKey: val1,
				};
			});
		}
		else{
			const { name, value } = event.target;
			// prevent a user from adding a question without answer key
			if(value.length === 0)
			{
				note[name] = "";
			}
			//assgin value in advance to update the add button
			if(name === "AnswerKey"){
				note[name] = value;	
			}
			handleInput(name, value);
			setNote((prevNote) => {
				return {
					...prevNote,
					[name]: value,
				};
			});
		}
		 
	}

	function FormRenderCheck(type){
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
							Value = {note.Choice1}
							disabled= {note.Choice1 == "" ? true : false}
							inline = {true}
							onChange={handleMultiChange}
						 />
						 <Form.Check
						 	type = {type}
							id = "B"
							label="B"
	                        name='AnswerKey'
							Value = {note.Choice2}
							disabled= {note.Choice2 == "" ? true : false}
							inline = {true}
							onChange={handleMultiChange}
						 />
						<Form.Check
							type = {type}
							id = "C"
							label="C"
	                        name='AnswerKey'
							Value = {note.Choice3}
							disabled= {note.Choice3 == "" ? true : false}
							inline = {true}
							onChange={handleMultiChange}
						 />
						 <Form.Check
							type = {type}
							id = "D"
							label="D"
	                        name='AnswerKey'
							Value = {note.Choice4}
							disabled= {note.Choice4 == "" ? true : false}
							inline = {true}
							onChange={handleMultiChange}
						 />
						 <Form.Check
						 	type = {type}
						 	id = "E"
							label="E"
	                        name='AnswerKey'
							Value = {note.Choice5}
							disabled= {note.Choice5 == "" ? true : false}
							inline = {true}
							onChange={handleMultiChange}
						 />
						 <Form.Check
						 	type = {type}
						 	id = "F"
							label="F"
	                        name='AnswerKey'
							Value = {note.Choice6}
							disabled= {note.Choice6 == "" ? true : false}
							inline = {true}
							onChange={handleMultiChange}
						 />
						 </div>
					</InputGroup>
				</Form.Group>

		)
	}

	function submitNote(event) {

		setMulti({
			multiAnswer:[],
			Check1: false,
			Check2: false,
			Check3: false,
			Check4: false,
			Check5: false,
			Check6: false,
		});

		props.onAdd(note);

		setNote({
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
			addOpen: true,
		});
		event.preventDefault();
	}

	return (
		<div>
			<div>
				<div style={resizeLeft}>
					<Container style={{ marginBottom: 15 }}>
						<span className="mb-0 h3">Create your quiz</span>
					</Container>
					<Container>
						Please read this carefully and follow the instructions to create your
						quiz. <br />
						<br />
						1. Enter a prompt under Question. <br />
						2. Decide the points for the question. <br />
						3. Select question type from the Type dropdown. <br />
						4. Fill in the answer choices up to 6.<br />
						5. Select the answer key based on the selection. <br />
						6. Click Add Question to add question to the quiz.
						<br />
						<br />
						Free response questions need to be graded manually.
						<br />
						<br />
						After you finish with quiz creation, please review and edit
						your questions as needed. Once you
						finalized your review, please click Complete to save.
					</Container>
				</div>
				<div style={resizeRight}>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Question:</Form.Label>
 							<Form.Control
								type="text"
								name="Question"
								onChange={handleChange}
								value={note.Question}
								placeholder="Quiz Question"
							/>
						</Form.Group>
                        <InputGroup className="mb-3">
                                <InputGroup.Text>Points</InputGroup.Text>
                                <Form.Control
                                    type="number" 
                                    inputmode="numeric" 
                                    name="points"
                                    onChange={handleChange}
                                    value={note.points}
                                />
                                <InputGroup.Text>Type</InputGroup.Text>
                                <Form.Select
                                    name="Type"
                                    onChange={handleChange}
                                    value={note.Type}
                                >
                                    <option value="NA" selected hidden>
                                        Select here
                                    </option>
                                    <option value="TF">True or False</option>
                                    <option value="SC">Single Choice</option>
                                    <option value="MC">Multiple Selection</option>
                                    <option value="FR">Free Response</option>
                                </Form.Select>
                        </InputGroup>
						<Form.Group>
							<Form.Control
								type="text"
								name="Choice1"
								onChange={handleChange}
								value={note.Choice1}
								placeholder="Selection A"
								style={instyle}
								disabled={note.Sel1Open}
							/>
							<Form.Control
								type="text"
								name="Choice2"
								onChange={handleChange}
								value={note.Choice2}
								placeholder="Selection B"
								style={instyle}
								disabled={note.Sel2Open}
							/>
							<Form.Control
								type="text"
								name="Choice3"
								onChange={handleChange}
								value={note.Choice3}
								placeholder="Selection C"
								style={instyle}
								disabled={note.Sel3Open}
							/>
							<Form.Control
								type="text"
								name="Choice4"
								onChange={handleChange}
								value={note.Choice4}
								placeholder="Selection D"
								style={instyle}
								disabled={note.Sel4Open}
							/>
							<Form.Control
								type="text"
								name="Choice5"
								onChange={handleChange}
								value={note.Choice5}
								placeholder="Selection E"
								style={instyle}
								disabled={note.Sel5Open}
							/>
							<Form.Control
								type="text"
								name="Choice6"
								onChange={handleChange}
								value={note.Choice6}
								placeholder="Selection F"
								style={instyle}
								disabled={note.Sel6Open}
							/>
						</Form.Group>
						<InputGroup className="mb-3">
							{note.Type == "TF" && FormRenderCheck("radio")}
							{note.Type == "SC" && FormRenderCheck("radio")}
						 	{note.Type == "MC" && FormRenderCheck("checkbox")}
							{note.Type == "FR" && (
								<FormControl
								type="text"
								name="AnswerKey"
								onChange={handleChange}
								value={note.AnswerKey}
								placeholder="AnswerKey"
								disabled={note.AnsKeyOpen}
								/>
							)}
							<Button
								variant="warning"
								id="button-addon2"
								onClick={submitNote}
								disabled={note.addOpen}
							>
								Add Question
							</Button>
						</InputGroup>
					</Form>
				</div>
			</div>
			<div
				style={{
					marginBottom: "auto",
					width: "100%",
					height: "auto",
					display: "",
				}}
			>
				<p>&nbsp;</p>
				<ColoredLine color="#FFC300" />
			</div>
		</div>
	);
}

export default Radium(DynamicForm);
