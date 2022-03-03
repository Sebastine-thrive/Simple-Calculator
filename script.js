// Get previously- typed numbers
function getHistory() {
    return document.getElementById("history-value").innerText;
}
// Display typed numbers
function printHistory(num) {
    document.getElementById("history-value").innerText = num;
}

// Get currently-typed numbers
function getOutput() {
    return document.getElementById("output-value").innerText;
}
// Display current results
function printOutput(num) {
    // If the screen is currently empty
    if (num == "") {
        document.getElementById("output-value").innerText = num;
    }
    else {
        // Format the number
        document.getElementById("output-value").innerText = getFormattedNumber(num);
    }
}

// Format numbers in comma-separated form
function getFormattedNumber(num) {
    if (num == "-") {
        return "";
    }

    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
    
}

// Revert formatted numbers to normal for plain operational purposes
function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ''));
}

// Setting up the operators' functionality
var operator = document.getElementsByClassName("operator");
for (var i = 0, o = operator.length; i < o; i++) {
    operator[i].addEventListener('click', function () {

        if (this.id == "clear") {
            printHistory("");
            printOutput("");
        }

        // set backspace to delete a number from behind
        else if (this.id == "backspace") {
            var output = reverseNumberFormat(getOutput()).toString();
            // If output has value
            if (output) {
                output = output.slice(0, -1);
                printOutput(output);
            }

        }

        else {
            var output = getOutput();
            var history = getHistory();
            if (output == "" && history != "") {
                if (isNaN(history[history.length - 1])) {
                    history = history.slice(0, -1);
                }
            }

            if (output != "" || history != "") {
                // If output is not empty and history is not empty
                output = output == "" ?
                    // If output has a value
                    output : getFormattedNumber(output);
                history = history + output;
                if (this.id == "=") {
                    var result = eval(history);
                    printOutput(result);
                    printHistory(history);
                }

                else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }

    });
}

// Setting up the Numbers' functionality
var number = document.getElementsByClassName("number");
for (var i = 0, n = number.length; i < n; i++) {
    number[i].addEventListener('click', function () {
        var output = reverseNumberFormat(getOutput());
        if (output != NaN) { //if output is a number
            output = output + this.id;
            printOutput(output);
        }
        else if (output =="."){
            output = this.id;
            printOutput(output);
        }
    });
}

