class Calculator {
    constructor(previousOperandTextElement , currentOperandTextElement ) {
        this.previosOperandTextElement = previosOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
    }

    clear()
    {
      this.currentOperand = ''
      this.previosOperand = ''
      this.operation = undefined
    }

    delete()
    {
       this.currentOperand = this.currentOperand.toString().slice
    }

    appendNumber(Number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + Number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand === '')return
        if(this.previousOperand !== ''){
            this.compute()

        }
        this.operation = operation
        this.previosOperand = this.currentOperand
        this.currentOperand =''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previosOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break

            case '-':
                computation = prev - current
                break
            
            case '*':
                computation = prev * current
                break
    
            case '/':
                computation = prev / current
                break
            
            default:
                return
    
        }

        this.currentOperand = computation
        this.operation = undefined
        this.previosOperandTextElement = ''

    }
    
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.spilt('.')[0])
        const decimalDigits = stringNumber.spilt('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits:0})
        }
        if(decimalDigits != null) {
            return '${integerDisplay}.${decimalDigits}'
        }else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
         this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousOperandTextElement.innerText = '${this.getDisplayNumber(this.previousOperand)} ${this.operation}'
        } else {
            this.previosOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelectorAll('[data-equals]')
const deleteButton = document.querySelectorAll('[data-delete]')
const allClearButton = document.querySelectorAll('[data-all-clear]')
const previosOperandTextElement = document.querySelectorAll('[data-previous-operand]')
const currentOperandTextElement = document.querySelectorAll('[data-current-operand]')

const calculator = new Calculator(previosOperandTextElement , currentOperandTextElement)

numberButtons.forEach(button  => {
    button.addEventListener('click' , () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button  => {
    button.addEventListener('click' , () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
