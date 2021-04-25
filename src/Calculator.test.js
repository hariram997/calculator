import { fireEvent, render } from "@testing-library/react";
import Calculator from "./Calculator";

describe("Calculator test", () => {
	test("should render two input box with  number type", () => {
		const { getByLabelText } = render(<Calculator />);

		const input1 = getByLabelText("Input 1");
		const input1Type = input1.getAttribute("type");
		const input2 = getByLabelText("Input 2");
		const input2Type = input2.getAttribute("type");

		expect(input1).toBeTruthy();
		expect(input1Type).toBe("number");
		expect(input2).toBeTruthy();
		expect(input2Type).toBe("number");
	});

	test("should render four buttons", () => {
		const { getByRole } = render(<Calculator />);

		expect(getByRole("button", { name: "+" })).toBeTruthy();
		expect(getByRole("button", { name: "-" })).toBeTruthy();
		expect(getByRole("button", { name: "*" })).toBeTruthy();
		expect(getByRole("button", { name: "/" })).toBeTruthy();
	});

	test("should enable buttons when both input values are valid", () => {
		const { getByLabelText, getByRole } = render(<Calculator />);
		const input1 = getByLabelText("Input 1");
		const input2 = getByLabelText("Input 2");
		const button = getByRole("button", { name: "+" });

		fireEvent.change(input1, { target: { value: 1 } });
		fireEvent.change(input2, { target: { value: 1 } });

		expect(button).toBeEnabled();
	});

	test("should render result when inputs are valid and an operation button is clicked", () => {
		const { getByLabelText, getByRole } = render(<Calculator />);
		const input1 = getByLabelText("Input 1");
		const input2 = getByLabelText("Input 2");
		const result = getByLabelText("Result");
		const addButton = getByRole("button", { name: "+" });

		fireEvent.change(input1, { target: { value: 1 } });
		fireEvent.change(input2, { target: { value: 1 } });
		fireEvent.click(addButton);

		expect(result.value).toBe("1 + 1 = 2");
	});

	test("should render updated result when either of the input changes", () => {
		const { getByLabelText, getByRole } = render(<Calculator />);
		const input1 = getByLabelText("Input 1");
		const input2 = getByLabelText("Input 2");
		const result = getByLabelText("Result");
		const addButton = getByRole("button", { name: "+" });

		fireEvent.change(input1, { target: { value: 1 } });
		fireEvent.change(input2, { target: { value: 1 } });
		fireEvent.click(addButton);
		fireEvent.change(input1, { target: { value: 2 } });

		expect(result.value).toBe("2 + 1 = 3");
	});

	test("should render updated result when another button is clicked", () => {
		const { getByLabelText, getByRole } = render(<Calculator />);
		const input1 = getByLabelText("Input 1");
		const input2 = getByLabelText("Input 2");
		const result = getByLabelText("Result");
		const addButton = getByRole("button", { name: "+" });
		const subButton = getByRole("button", { name: "-" });

		fireEvent.change(input1, { target: { value: 2 } });
		fireEvent.change(input2, { target: { value: 1 } });
		fireEvent.click(addButton);
		fireEvent.click(subButton);
		expect(result.value).toBe("2 - 1 = 1");
	});
});
