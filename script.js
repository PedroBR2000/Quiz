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

let currentQuestionIndex = 0;
let score = 0;
let userName = "";

const questionsContainer = document.getElementById("questions-container");
const scoreElement = document.getElementById("score");

const nameInput = document.getElementById("name");
const startButton = document.querySelector("button");
const quizContainer = document.querySelector(".quiz-container");

startButton.disabled = true;
quizContainer.style.display = "none";

function startQuiz() {
    const name = nameInput.value.trim();
    
    if (name === "") {
        alert("Por favor, digite seu nome antes de iniciar o quiz.");
    } else {
        userName = name;
        nameInput.disabled = true;
        startButton.style.display = "none";
        
        quizContainer.style.display = "block";

        loadQuestions();
    }
}

nameInput.addEventListener("input", () => {
    if (nameInput.value.trim() !== "") {
        startButton.disabled = false;
    } else {
        startButton.disabled = true;
    }
});

function loadQuestions() {
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
}

function checkAnswers() {
    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="answer-${index}"]:checked`);

        if (selectedOption && selectedOption.value === question.correctAnswer) {
            score++;
        }
    });

    showResult();
}

function showResult() {
    questionsContainer.style.display = "none";
    scoreElement.textContent = `Pontuação: ${score} de ${questions.length}`;

    const rankingContainer = document.getElementById("ranking-container");
    const rankingList = document.getElementById("ranking-list");
    
    rankingList.innerHTML = "";
    
    const userScoreElement = document.createElement("li");
    userScoreElement.textContent = `${userName}: ${score} de ${questions.length}`;
    
    rankingList.appendChild(userScoreElement);
    
    rankingContainer.style.display = "block";
}
