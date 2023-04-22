import React, { useEffect } from "react";
import {Button, Container, Row, Col} from 'react-bootstrap'

const instyle = {
    marginBottom: '5px'
}

function Questions(props) {

    useEffect(() => {
        if(props.points <= 0) {
            props.setCompleted(false);
        }
    }, [props]);

    function handleClick() {
        props.onDelete(props.id);
    }

    function handleEdit() {
        props.onEdit(props.id)
    }

    return (
		<div>
			<Container>
				<Row>
					<Col sm={9}>
						{" "}
						<span style={{ fontWeight: 500, fontSize: 25 }}>
							{props.id + 1}.{props.Question}
              {props.points >= 0 && <span style={{fontSize: 18 }}> [ {props.points}pts ]</span>}
            </span>
					</Col>
					<Col sm={3} style={{ textAlign: "right" }}>
						<Button variant="danger" size="sm" onClick={handleClick}>
							Delete
						</Button>{" "}
						<Button variant="secondary" size="sm" onClick={handleEdit}>
							Edit
						</Button>
					</Col>
				</Row>
			</Container>
			<Container>
				Question Type:{" "}
				{(props.Type === "TF" && <span>True or False</span>) ||
					(props.Type === "SC" && <span>Single Choice</span>) ||
					(props.Type === "MC" && <span>Multiple Choice</span>) ||
					(props.Type === "FR" && <span>Free Response</span>)}
				{props.Choice1 === ' ' ? null : props.Choice1 !== "" && <p style={instyle}>1. {props.Choice1}</p>}
				{props.Choice2 !== "" && <p style={instyle}>2. {props.Choice2}</p>}
				{props.Choice3 !== "" && <p style={instyle}>3. {props.Choice3}</p>}
				{props.Choice4 !== "" && <p style={instyle}>4. {props.Choice4}</p>}
				{props.Choice5 !== "" && <p style={instyle}>5. {props.Choice5}</p>}
				{props.Choice6 !== "" && <p style={instyle}>6. {props.Choice6}</p>}
				{props.AnswerKey !== "" && <p>Answer Key: {props.AnswerKey}</p>}
			</Container>
		</div>
	);
}

export default Questions;
