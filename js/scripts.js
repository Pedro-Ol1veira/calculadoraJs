let previusOperation = document.querySelector("#previous-operation");
let currentOperation = document.querySelector("#current-operation");
let arrButtons = document.querySelectorAll("#buttons-container button");

class Calculadora {
  constructor (currentOperation, previusOperation) {
    this.currentOperation = currentOperation;
    this.previusOperation = previusOperation;
    this.currentOperationCopy = "";
  }

  adicionarNumero(numeroDigitado) {
    if (numeroDigitado === "." && this.currentOperation.innerText.includes(".")) {
      return;
    }

    this.currentOperationCopy = numeroDigitado;
    this.mostarNaTela();
  }

  mostarNaTela(resultadoOperacao = null, previus = null, current = null, operacao = null) {
    if (resultadoOperacao == null) {
      this.currentOperation.innerText += this.currentOperationCopy;
    } else {
      if (previus == 0) {
        resultadoOperacao = current
      }
      this.previusOperation.innerText = `${resultadoOperacao} ${operacao}`
      this.currentOperation.innerText = "";
    }
  }

  operacoes(operacao) {
    if (this.currentOperation.innerText === "" && operacao !== "C") {
      if (this.previusOperation.innerText !== "") {
        this.trocarOperacao(operacao)
      }
      return;
    }

    let resultadoOperacao;
    let previus = +this.previusOperation.innerText.split(" ")[0];
    let current = +this.currentOperation.innerText;

    switch(operacao) {
      case "+":
        resultadoOperacao = previus + current;
        this.mostarNaTela(resultadoOperacao, previus, current, operacao);
        break;
      case "-":
        resultadoOperacao = previus - current;
        this.mostarNaTela(resultadoOperacao, previus, current, operacao);
        break;
      case "/":
        resultadoOperacao = previus / current;
        this.mostarNaTela(resultadoOperacao, previus, current, operacao);
        break;
      case "*":
        resultadoOperacao = previus * current;
        this.mostarNaTela(resultadoOperacao, previus, current, operacao);
        break;
      case "=":
        this.botaoIgual()
      break;
      case "DEL":
        this.botaoDel()
      break;
      case "C":
        this.botaoC()
      break;
      case "CE":
        this.botaoCe()
      break;
    }
  }

  botaoIgual() {
    const operacao = previusOperation.innerText.split(" ")[1];

    this.operacoes(operacao);
  }

  trocarOperacao(operacao) {
    const operacoesMatematicas = ["+", "-", "*", "/"];

    if (!operacoesMatematicas.includes(operacao)) {
      return;
    }
    
    this.previusOperation.innerText = this.previusOperation.innerText.slice(0, -1) + operacao

  }

  botaoDel() {
    this.currentOperation.innerText = this.currentOperation.innerText.slice(0, -1);
  }

  botaoC() {
    this.currentOperation.innerText = "";
    this.previusOperation.innerText = "";
  }

  botaoCe() {
    this.currentOperation.innerText = "";
  }
}

let calc = new Calculadora(currentOperation, previusOperation);


arrButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    
    let value = e.target.innerText;

    if(+value >= 0 || value === ".") {
      calc.adicionarNumero(value);
    } else {
      calc.operacoes(value);
    }
  })
})