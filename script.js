const questions = [
    {
        question: "Qual é a capital da França?",
        options: ["Londres", "Paris", "Madrid", "Berlim"],
        correctAnswer: "Paris",
    },
    {
        question: "Qual é a cor do céu em um dia ensolarado?",
        options: ["Azul", "Vermelho", "Verde", "Amarelo"],
        correctAnswer: "Azul",
    },
    {
        question: "Quanto é 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4",
    },
    {
        question: "Qual é o maior planeta do sistema solar?",
        options: ["Terra", "Marte", "Vênus", "Júpiter"],
        correctAnswer: "Júpiter",
    },
    {
        question: "Qual é o elemento químico mais abundante na crosta terrestre?",
        options: ["Oxigênio", "Silício", "Alumínio", "Ferro"],
        correctAnswer: "Oxigênio",
    },
    {
        question: "Qual é o maior mamífero terrestre?",
        options: ["Elefante africano", "Rinoceronte", "Girafa", "Hipopótamo"],
        correctAnswer: "Elefante africano",
    },
    {
        question: "Qual é o maior oceano do mundo?",
        options: ["Oceano Atlântico", "Oceano Pacífico", "Oceano Índico", "Oceano Ártico"],
        correctAnswer: "Oceano Pacífico",
    },
    {
        question: "Qual é o país com a maior população do mundo?",
        options: ["Índia", "Estados Unidos", "Rússia", "China"],
        correctAnswer: "China",
    },
    {
        question: "Qual é a linguagem de programação mais popular?",
        options: ["Python", "Java", "C++", "JavaScript"],
        correctAnswer: "Python",
    },
    {
        question: "Qual é o símbolo químico do hidrogênio?",
        options: ["Hg", "He", "H", "Ho"],
        correctAnswer: "H",
    },
    {
        question: "Qual é a montanha mais alta do mundo?",
        options: ["Monte Kilimanjaro", "Monte Everest", "Monte McKinley", "Monte Fuji"],
        correctAnswer: "Monte Everest",
    },
    {
        question: "Qual é o maior deserto do mundo?",
        options: ["Deserto do Saara", "Deserto de Gobi", "Deserto de Atacama", "Deserto de Kalahari"],
        correctAnswer: "Deserto do Saara",
    },
    {
        question: "Qual é o rio mais longo do mundo?",
        options: ["Rio Nilo", "Rio Amazonas", "Rio Yangtzé", "Rio Mississippi"],
        correctAnswer: "Rio Amazonas",
    },
    {
        question: "Qual é a maior ilha do mundo?",
        options: ["Groenlândia", "Ilha de Baffin", "Ilha de Ellesmere", "Ilha de Victoria"],
        correctAnswer: "Groenlândia",
    },
    {
        question: "Qual é o elemento químico com o símbolo 'Fe'?",
        options: ["Ferro", "Oxigênio", "Hidrogênio", "Sódio"],
        correctAnswer: "Ferro",
    },
];

const rankingData = []; // Armazenar os dados do ranking

let currentQuestionIndex = 0;
let score = 0;
let userName = "";
let userSeries = "";
let isLoggedIn = false;

const questionsContainer = document.getElementById("questions-container");
const scoreElement = document.getElementById("score");

const nameInput = document.getElementById("name");
const seriesSelect = document.getElementById("series");
const startButton = document.querySelector(".name-series-container button");
const quizContainer = document.getElementById("quiz-container");
const submitButton = document.getElementById("submit-button");
const rankingContainer = document.getElementById("ranking-container");
const rankingList = document.getElementById("ranking-list");

startButton.disabled = true; // Desativa o botão "Iniciar Quiz"
quizContainer.style.display = "none"; // Oculta a seção do quiz
rankingContainer.style.display = "none"; // Oculta a seção de ranking

nameInput.addEventListener("input", () => {
    if (nameInput.value.trim() !== "") {
        startButton.disabled = false; // Ativa o botão "Iniciar Quiz" quando o nome é inserido
    } else {
        startButton.disabled = true; // Desativa o botão se o nome for removido
    }
});

startButton.addEventListener("click", () => {
    userName = nameInput.value.trim();
    userSeries = seriesSelect.value;
    isLoggedIn = true;
    nameInput.disabled = true; // Desativa o campo de nome após o início do quiz
    seriesSelect.disabled = true; // Desativa o campo de série após o início do quiz
    startButton.style.display = "none"; // Oculta o botão "Iniciar Quiz"

    // Exibe a seção do quiz
    quizContainer.style.display = "block";

    // Carrega as questões e inicia o quiz
    loadQuestions();
});

function loadQuestions() {
    if (!isLoggedIn) {
        return; // Não carrega as questões se o usuário não estiver logado
    }

    questionsContainer.innerHTML = "";

    questions.forEach((question, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";
        questionDiv.innerHTML = `<p>${question.question}</p>`;

        question.options.forEach((option, optionIndex) => {
            const optionInput = document.createElement("input");
            optionInput.type = "radio";
            optionInput.name = `answer-${index}`;
            optionInput.value = option;
            optionInput.id = `answer-${index}-${optionIndex}`;
            questionDiv.appendChild(optionInput);

            const optionLabel = document.createElement("label");
            optionLabel.textContent = option;
            optionLabel.setAttribute("for", `answer-${index}-${optionIndex}`);
            questionDiv.appendChild(optionLabel);

            questionDiv.appendChild(document.createElement("br"));
        });

        questionsContainer.appendChild(questionDiv);
    });

    // Exibe o botão "Verificar Respostas" após carregar as questões
    submitButton.style.display = "block";

    // Oculta a seção de nome e série após o início do quiz
    document.querySelector(".name-series-container").style.display = "none";
}

function checkAnswers() {
    if (!isLoggedIn) {
        return; // Não verifica as respostas se o usuário não estiver logado
    }

    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="answer-${index}"]:checked`);

        if (selectedOption && selectedOption.value === question.correctAnswer) {
            score++;
        }
    });

    // Registra a pontuação no rankingData
    rankingData.push({ name: userName, series: userSeries, score: score });

    showResult();
}

function showResult() {
    questionsContainer.style.display = "none"; // Oculta as questões após verificar respostas
    scoreElement.textContent = `Pontuação: ${score} de ${questions.length}`;

    // Exibe o ranking
    rankingList.innerHTML = ""; // Limpa a lista de classificação

    rankingData.sort((a, b) => b.score - a.score); // Classifica os participantes com base na pontuação

    rankingData.forEach((participant, index) => {
        const userScoreElement = document.createElement("li");
        userScoreElement.textContent = `${index + 1}. ${participant.name} (${participant.series}): ${participant.score} de ${questions.length}`;
        rankingList.appendChild(userScoreElement);
    });

    rankingContainer.style.display = "block"; // Exibe a seção de ranking

    // Oculta o botão "Verificar Respostas"
    submitButton.style.display = "none";
}