import { useEffect, useState } from "react";
import "./Calculator.css";

function Calculator() {
	const [input1, setInput1] = useState(NaN);
	const [input2, setInput2] = useState(NaN);
	const [isInputsValid, setIsInputsValid] = useState(false);
	const [selectedButton, setSelectedButton] = useState(null);
	const [resultString, setResultString] = useState("");

	useEffect(() => {
		if (isNaN(input1) || isNaN(input2)) {
			setIsInputsValid(false);
			setResultString("");
		} else {
			setIsInputsValid(true);
			if (selectedButton != null) {
				let result = "";
				switch (selectedButton) {
					case "additionButton":
						result = getFormattedResultString("+", input1 + input2);
						break;
					case "subtractionButton":
						result = getFormattedResultString("-", input1 - input2);
						break;
					case "multiplyButton":
						result = getFormattedResultString("*", input1 * input2);
						break;
					case "divisionButton":
						result = getFormattedResultString("/", input1 / input2);
						break;
					default:
						break;
				}
				setResultString(result);
			}
		}
	}, [input1, input2, selectedButton]);

	return (
		<div className="calculator">
			<h1 style={{ color: "blue" }}> Calculator</h1>
			<label htmlFor="input1">Input 1 </label>
			<input type="number" id="input1" onChange={handleInputChange}></input>
			<br></br>
			<br></br>
			<label htmlFor="input2">Input 2 </label>
			<input type="number" id="input2" onChange={handleInputChange}></input>
			<br></br>
			<br></br>
			<button
				name="additionButton"
				disabled={!isInputsValid}
				onClick={handleButtonClick}
				style={
					isInputsValid && selectedButton === "additionButton"
						? { backgroundColor: "yellow" }
						: { backgroundColor: "white" }
				}
			>
				+
			</button>
			<button
				name="subtractionButton"
				disabled={!isInputsValid}
				onClick={handleButtonClick}
				style={
					isInputsValid && selectedButton === "subtractionButton"
						? { backgroundColor: "yellow" }
						: { backgroundColor: "white" }
				}
			>
				-
			</button>
			<button
				name="multiplyButton"
				disabled={!isInputsValid}
				onClick={handleButtonClick}
				style={
					isInputsValid && selectedButton === "multiplyButton"
						? { backgroundColor: "yellow" }
						: { backgroundColor: "white" }
				}
			>
				*
			</button>
			<button
				name="divisionButton"
				disabled={!isInputsValid}
				onClick={handleButtonClick}
				style={
					isInputsValid && selectedButton === "divisionButton"
						? { backgroundColor: "yellow" }
						: { backgroundColor: "white" }
				}
			>
				/
			</button>
			<br></br>
			<label htmlFor="result">Result </label>
			<input  id="result" value={resultString}></input>
		</div>
	);

	function handleInputChange(event) {
		let inputId = event.target.id;
		let parsedValue = parseFloat(event.target.value);
		if (inputId === "input1") {
			setInput1(parsedValue);
		}
		if (inputId === "input2") {
			setInput2(parsedValue);
		}
	}

	function handleButtonClick(event) {
		setSelectedButton(event.target.name);
	}

	function getFormattedResultString(operator, result) {
		return input1 + " " + operator + " " + input2 + " = " + result;
	}
}

export default Calculator;
