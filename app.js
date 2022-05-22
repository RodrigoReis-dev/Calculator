      //* ------------------ //
     //?    Calculator JS   //
    //* ------------------ //

    
// Store and declare variables
const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")


//constructor method
class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText
    this.currentOperationText = currentOperationText
    this.currentOperation = ''
  }

  // Add digit to calculator screen
  addDigit(digit) {
    // Check if current operation already has a dot
    if (digit === '.' && currentOperationText.innerText.includes('.')) {
      return
    }
    this.currentOperation = digit
    this.updateScreen()
  }

  // Process all calculator operations
  processOperation(operation){

    // Check if current is empty
    if (this.currentOperationText.innerText === '' && operation !== 'C') {
      // Change operation
      if (this.previousOperationText.innerText !== '') {
            this.changeOperation(operation)
      }
      return
    }
    
    //Get current and previous values
    let operationValue
    const previous = +this.previousOperationText.innerText.split(' ')[0]
    const current = +this.currentOperationText.innerText

    switch(operation) {
      case '+':
        operationValue = previous + current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case '-':
        operationValue = previous - current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case '/':
        operationValue = previous / current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case '*':
        operationValue = previous * current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case 'DEL':
        this.processDelOperator();
        break
      case 'CE':
        this.processClearCurrentOperation();
        break
      case 'C':
        this.processClearOperation();
        break
        case '=':
          this.processEqualOperation();  
        break
        default:
          return
    }
  }

  // Change values of the calculator screen
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
    ){

    if(operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation
    } else {
      // Check if values is zero, if it is just add current value
      if (previous === 0) {
        operationValue = current
      }

      // Add current value to previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`
      this.currentOperationText.innerText = ''
    }   
  }

  //Change math operation
  changeOperation(operation) {
    const mathOperations = ['+', '-', '/', '*']
    if (!mathOperations.includes(operation)) {
      return
    }

    // 123 OPERATION
    this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
  }

  // Delete the last digit
  processDelOperator() {
    this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
  }

  // Clear current operation
  processClearCurrentOperation() {
    this.currentOperationText.innerText = ''
  }

  // Clear all operations
  processClearOperation() {
    this.currentOperationText.innerText = ''
    this.previousOperationText.innerText = ''
  }

  // Process an operation using equal
  processEqualOperation() {
    const operation = this.previousOperationText.innerText.split(' ')[1]
    this.processOperation(operation)
  }
}


const calc = new Calculator(previousOperationText, currentOperationText)


// Function forEach with addEvemntlistener on click
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
   });
});

