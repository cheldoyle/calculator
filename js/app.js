let displayNumID = document.getElementById("displayNums");
let inputButt = document.querySelectorAll('input[id="inputButt"]');
let inputButtNum = document.querySelectorAll('input[id="inputButtNum"]');
let displayCalc = document.getElementById("displayCurrentNums");
let displayFirst = "";
let displaySec = "";
let numHolder = "";
let equationHolder = "";
let buttEquate = "";
let buttDown = "";
let isNotEqual = true;


inputButtNum.forEach(button => {
    button.addEventListener('click', () => {
        if (!isNotEqual) {
            numHolder = "";
            equationHolder = "";
            displayNumID.value = "";
            displayCalc.value = "";
        }
        buttDown = button.value;
        let potentialNum = numHolder + buttDown;
        let validNumPattern = /^-?\d*\.?\d*$/;
        if (validNumPattern.test(potentialNum)) {
        numHolder = potentialNum;
        displayNumID.value = numHolder;
        }
    });
});

inputButt.forEach(button => {
    button.addEventListener('click', () => {
        buttDown = button.value;

        if (buttDown == "C") {
            displayNumID.value = "";
            equationHolder = "";
            numHolder = "";
            buttEquate = "";
            displayCalc.value = "";
            isNotEqual = true;
            return;
        }

        if (buttDown == "del" && numHolder != "") {
            numHolder = numHolder.slice(0, -1);
            displayNumID.value = numHolder;
            isNotEqual = true;
            return;
        }

        if (numHolder != "") {
            if (numHolder == ".") {
                numHolder = 0;
            }
            if (equationHolder != "" && buttEquate != "") {
                displaySec = numHolder;
                equationHolder = parseFloat(equationHolder);
                numHolder = parseFloat(numHolder);

                if (buttEquate == "+") {
                    equationHolder += numHolder;
                } else if (buttEquate == "-") {
                    equationHolder -= numHolder;
                } else if (buttEquate == "X") {
                    equationHolder *= numHolder;
                } else if (buttEquate == "÷") {
                    equationHolder /= numHolder;
                }

                displayCalc.value = displayFirst;
                displayNumID.value = equationHolder;
                numHolder = "";
            } else {
                equationHolder = numHolder;
                numHolder = "";
            }
        }

        if (buttDown != "=") {
            buttEquate = buttDown;
            isNotEqual = true;
            displayFirst = equationHolder;
            displayCalc.value = displayFirst + " " + buttEquate + " " + displaySec;
        } else {
            displayNumID.value = equationHolder;
            displayCalc.value = displayFirst + " " + buttEquate + " " + displaySec;
            numHolder = equationHolder;
            equationHolder = "";
            buttEquate = "";
            isNotEqual = false;
        }
    });
});
