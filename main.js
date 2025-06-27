let current = "0";
let previous = "";
let operation = undefined;
const buttons = document.querySelectorAll("button");
const resultDisplay = document.querySelector(".result-num p");
const calculateDisplay = document.querySelector(".calculate-num p");

function updateDisplay() {
    resultDisplay.innerText = `${previous}${operation || ""}${current}`;
}

function compute() {
    const prev = Number(previous);
    const curr = Number(current);
    let computationResult;

    if (operation === "+") {
        computationResult = prev + curr;
    } else if (operation === "-") {
        computationResult = prev - curr;
    } else if (operation === "×") {
        computationResult = prev * curr;
    } else if (operation === "÷") {
        computationResult = prev / curr;
    }
    if (computationResult.toString().length > 11) {
        computationResult = computationResult.toPrecision(11);
    }
    calculateDisplay.innerText = previous + operation + current;

    previous = "";
    operation = undefined;
    current = computationResult.toString();
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const result = button.innerText;
        if (result === "AC") {
            current = "0";
            previous = "";
            operation = undefined;
            calculateDisplay.innerText = "";
        } else if (result === "%") {
            current = current / 100;
        } else if (result === "⌫") {
            if (current.length === 1) {
                current = "0";
            } else {
                current = current.slice(0, -1);
            }
        } else if (["+", "-", "×", "÷"].includes(result)) {
            if (current === "") return;
            else if (previous !== "") {
                compute();
            }
            previous = current;
            operation = result;
            current = "";
        } else if (result === "=") {
            if (previous === "0" && current === "0") return;
            compute();
        } else {
            if (current === "0" && result !== ".") {
                current = result;
            } else {
                current += result;
            }
        }
        updateDisplay();
    });
});
