const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechRecognitionResult = window.SpeechRecognitionResult || window.webkitSpeechRecognitionResult;
const box = document.querySelector(".box")
const paragrafo = document.createElement("p")

var numero = gerarNúmeroAleatório()

const recognition = new SpeechRecognition();
recognition.lang = 'pt-Br'

recognition.onresult = (event) => {
  const chute = event.results[0][0].transcript
  paragrafo.innerHTML = chute
  paragrafo.classList.add("mensagem")
  box.appendChild(paragrafo)
  verificaSeOChutePossuiUmValorValido(chute)
};

recognition.start()

function gerarNúmeroAleatório() {
  return parseInt(Math.random() * 1000 + 1)
}

function verificaSeOChutePossuiUmValorValido(chute) {
  const mensagemAbaixoDoNumero = document.querySelector("#mensagemAbaixoDoNumero")
  chute.replace(" ", "")
  parseInt(chute)

  if (chute < 0 || chute > 1000) {
    mensagemAbaixoDoNumero.innerHTML = "Número inválido"
  } else {
    if (chute == numero) {
      mensagemAbaixoDoNumero.innerHTML = "Você acertou"
      criarBotaoJogarDeNovo()
    }
    if (chute > numero) {
      mensagemAbaixoDoNumero.innerHTML = "O número secreto é menor"
    }
    if (chute < numero) {
      mensagemAbaixoDoNumero.innerHTML = "O número secreto é maior"
    }
  }}

  function criarBotaoJogarDeNovo() {
    const botao = document.createElement("button")
    botao.innerHTML = "Jogar novamente"
    botao.classList.add("btn-jogar")

    document.body.appendChild(botao)
    botao.addEventListener("click", (e) => {
      numero = gerarNúmeroAleatório()
      document.body.removeChild(botao)
      mensagemAbaixoDoNumero.innerHTML = ""
      paragrafo.innerHTML = ""
    })

  }

recognition.addEventListener('end', () => recognition.start())