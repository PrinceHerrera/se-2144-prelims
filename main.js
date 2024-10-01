// retrieving the display and button elements
const display = document.querySelector('input[name="display"]');
const buttons = document.querySelectorAll('input[type="button"]');

let currentInput = ''; // current input taken
let turnedOff = false; // if the calculator is turned off when "bye" is pressed

// hello in different languages
const hello = ["Hello", "Konnichiwa", "Hola", "Bonjour", "Anyeong haseyo", "Shalom", "Guten Tag", "Selamat siang", "Merhaba"];

// updating display
function updateDisplay(value) {
    if (turnedOff) return; // disallow any input if this is true (turned off)
    if (currentInput.length >= 15) return; // limit the amount of characters

    currentInput += value;
    display.value = currentInput;
    display.scrollLeft = display.scrollWidth
    
}

// operations
function calculate() {
    try {
       
        // replacing the symbols with the valid operators
        let expression = currentInput.replace(/×/g, "*").replace(/÷/g, "/")
        let result = eval(expression)
        currentInput = parseFloat(result.toFixed(15)).toString().slice(0,15);; // limiting the output to 15 characters to prevent overflowing
        display.value = currentInput;
        if (result === Infinity || result === -Infinity || isNaN(result)) { // MathError if dividing by 0
            display.value = "MathError" 
            return
        }

    } catch (error) {
        display.value = 'SyntaxError';
    }
}

// special functions (ac, bye, hello, backspace)
function specialKeys(buttonValue) {
    if (buttonValue === 'AC') { // clear the display
        currentInput = '';
        display.value = '';
        turnedOff = false;
    } else if (buttonValue === '⬅') { // delete last entered character
        // Delete the last character
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
    } else if (buttonValue === 'Bye') {
        display.value = 'Goodbye';
        turnedOff = true;
        setTimeout(() => { display.value = ''; }, 1000); // time delay
    } else if (buttonValue === 'Hello') { // randomized hello from the list above
        const randomHello = hello[Math.floor(Math.random() * hello.length)];
        display.value = randomHello;
    }
}

// calculator keys event listeners
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.value;


        if (!isNaN(buttonValue) || buttonValue === '.') {
            updateDisplay(buttonValue);

        } else if (['+', '-', '×', '÷'].includes(buttonValue)) {
            // operator inputs and prevents multiple operators in a row
            if (!currentInput.endsWith(' ') && currentInput !== '') {
                currentInput += ` ${buttonValue} `;
                display.value = currentInput;
            }
        } else if (buttonValue === '=') {
            calculate();
            
        } else {
            specialKeys(buttonValue);
        }
    });
});
