//ADICIONANDO ELEMENTOS
const $start = document.querySelector(".start-btn button");
const $infoBox = document.querySelector(".info-box");
const $exit = $infoBox.querySelector(".botoes .exit");
const $continue = $infoBox.querySelector(".botoes .continue");
const $boxquiz = document.querySelector(".box-quiz");
const $next = document.querySelector('.proxima-pgt button');
const $option_lista = document.querySelector(".options-lista");
const $tempo_segundos = $boxquiz.querySelector(".tempo .tempo-segundos");
const $resultado = document.querySelector(".resultado-quiz");
const $quit = $resultado.querySelector(".btn-resultado .quit-quiz");

//ATIVANDO DE INICIAIR
$start.onclick = () => {
    $infoBox.classList.add("ativadoinfo"); // MOSTRAR O CARD INFORMAÇAO
}

// EXIT E CONTINUE BUTTONS
$exit.onclick = () => {
    $infoBox.classList.remove("ativadoinfo"); // REMOVER O CARD INFORMAÇAO
}
$continue.onclick = () => {
    $infoBox.classList.remove("ativadoinfo"); // REMOVER O CARD INFORMAÇAO
    $boxquiz.classList.add("ativadoquiz"); // ATIVA O CARD QUIZ
    mostrarPergunta(0);
    pgtContador(1);
    iniciarTempo(14);
}

//ATIVANDO SAIR DO QUIZ E RESTART
$quit.onclick = () => { window.location.reload(); }

let pgt_count = 0;
let pgt_num = 1;
let relogio;
let timeValue = 15;
let userPontos = 0;

// ATIVANDO O BOTAO DE PROXIMA PERGUNTA
$next.onclick = () => {
    if (pgt_count < perguntas.length - 1) {
        pgt_count++;
        pgt_num++;
        mostrarPergunta(pgt_count);
        pgtContador(pgt_num);
        clearInterval(relogio);
        iniciarTempo(timeValue);
        $next.style.display = "none";
    } else {
        mostrarResultado();
    }
}

// RECEBENDO PERGUNTAS E OPÇOES DO ARRAY

function mostrarPergunta(index) {
    const $pgt_texto = document.querySelector(".pergunta-texto");
    let pgt_tag = '<span>' + perguntas[index].numero + ". " + perguntas[index].pergunta + '</span>';
    let optiontag = '<div class="option">' + perguntas[index].options[0] + '<span></span></div>'
        + '<div class="option">' + perguntas[index].options[1] + '<span></span></div>'
        + '<div class="option">' + perguntas[index].options[2] + '<span></span></div>'
        + '<div class="option">' + perguntas[index].options[3] + '<span></span></div>';

    $pgt_texto.innerHTML = pgt_tag;
    $option_lista.innerHTML = optiontag;

    const option = $option_lista.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// ADICIONANDO OS ICONS AS RESPOSTAS
let iconV = '<div class="icon v"><i class="far fa-check-circle"></i></div>'
let iconX = '<div class="icon x"><i class="far fa-times-circle"></i></div>'

// ATIVANDO A RESPOSTA CORRETA
function optionSelected(resposta) {
    clearInterval(relogio);
    let userResposta = resposta.textContent;
    let corretaResposta = perguntas[pgt_count].resposta;
    let alloptions = $option_lista.children.length;

    if (userResposta == corretaResposta) {
        userPontos += 1;
        console.log(userPontos);
        resposta.classList.add("correta");
        resposta.insertAdjacentHTML('beforeend', iconV);
    } else {
        resposta.classList.add("incorreta");
        resposta.insertAdjacentHTML('beforeend', iconX);
    };

    // SE O USER ESCOLHER A ERRADA MOSTRAR LOGO EM SEGUIDA A RESPOSTA CORRETA.
    for (let i = 0; i < alloptions; i++) {
        if ($option_lista.children[i].textContent == corretaResposta) {
            $option_lista.children[i].setAttribute("class", "option correta");
        }
    }

    // RESTRIGINDO A SELECAO DO USER A APENAS UMA ESCOLHA.
    for (let i = 0; i < alloptions; i++) {
        $option_lista.children[i].classList.add("disable");
    }
    $next.style.display = "initial";
}

// CONTADOR DE PERGUNTAS
function pgtContador(index) {
    const $contador = $boxquiz.querySelector(".total-pgt");
    let contador_tag = '<span>' + index + '<p>De</p>' + perguntas.length + ' Perguntas</span>'
    $contador.innerHTML = contador_tag;
}

// INICIANDO RELOGIO
function iniciarTempo(time) {
    relogio = setInterval(timer, 1000);
    function timer() {
        $tempo_segundos.textContent = time;
        time--;
        if (time < 9) {
            let addZero = $tempo_segundos.textContent;
            $tempo_segundos.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(relogio);
            $tempo_segundos.textContent = "00";
            window.location.reload(); // SE O RELOGIO ZERAR, VOLTA PARA INICAR O JOGO.
        }
    }
}

// ATIVANDO O CARD RESULTADO
function mostrarResultado() {
    $infoBox.classList.remove("ativadoinfo");
    $boxquiz.classList.remove("ativadoquiz");
    $resultado.classList.add("ativadoResultado");
    const pontosText = $resultado.querySelector(".pontos-quiz");
    if (userPontos >= 5) {
        let pontos_tag = '<span>Párabens, você GABARITOU, acertou <p>' + userPontos + '</p> de <p>' + perguntas.length + '</p>!</span>'
        pontosText.innerHTML = pontos_tag;
    }
    else if (userPontos >= 3) {
        let pontos_tag = '<span>Você mandou bem, acertou <p>' + userPontos + '</p> de <p>' + perguntas.length + '</p>!</span>'
        pontosText.innerHTML = pontos_tag;
    }
    else if (userPontos > 1) {
        let pontos_tag = '<span>Eu sei que você pode ser melhor, você só acertou <p>' + userPontos + '</p> de <p>' + perguntas.length + '</p>.</span>'
        pontosText.innerHTML = pontos_tag;
    }
    else {
        let pontos_tag = '<span>Que pena, você só acertou <p>' + userPontos + '</p> de <p>' + perguntas.length + '</p>.</span>'
        pontosText.innerHTML = pontos_tag;
    }
}