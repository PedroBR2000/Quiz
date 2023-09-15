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
let userEmail = ""; // Variável para armazenar o nome do usuário
let isLoggedIn = false;

const questionsContainer = document.getElementById("questions-container");
const scoreElement = document.getElementById("score");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.querySelector(".login-container button");
const quizContainer = document.getElementById("quiz-container");
const submitButton = document.getElementById("submit-button");
const rankingContainer = document.getElementById("ranking-container");
const rankingList = document.getElementById("ranking-list");

loginButton.disabled = true; // Desativa o botão "Login"
quizContainer.style.display = "none"; // Oculta a seção do quiz
rankingContainer.style.display = "none"; // Oculta a seção de ranking


// Lista de emails e senhas
const users = [
    { email: "pedro.pereira63@portalsesisp.org.br", password: "12345678" },
    { email: "vinicius.vasiliauskas@portalsesisp.org.br", password: "12345678" },
    { email: "gabrielly.almeida@portalsesisp.org.br", password: "12345678" },
    { email: "ana.borbalan@portalsesisp.org.br", password: "12345678" },
    { email: "sthefany.souza@portalsesisp.org.br", password: "12345678" },
    { email: "otavio.miranda3@portalsesisp.org.br", password: "12345678" },
    { email: "maria.spontao@portalsesisp.org.br", password: "12345678" },
    { email: "guilherme.moura3@portalsesisp.org.br", password: "12345678" },
    { email: "laysa.veras@portalsesisp.org.br", password: "12345678" },
    { email: "giovanni.sthal@portalsesisp.org.br", password: "12345678" },
    { email: "eduardo.lopes@portalsesisp.org.br", password: "12345678" },
    { email: "pedro.oliveira18@portalsesisp.org.br", password: "12345678" },
    { email: "yasmin.santos47@portalsesisp.org.br", password: "12345678" },
    { email: "livia.rocha8@portalsesisp.org.br", password: "12345678" },
    { email: "ana.apolinario@portalsesisp.org.br", password: "12345678" },
    { email: "daniel.caetano@portalsesisp.org.br", password: "12345678" },
    { email: "talita.marcelino@portalsesisp.org.br", password: "12345678" },
    { email: "matheus.barbosa9@portalsesisp.org.br", password: "12345678" },
    { email: "kaua.pereira6@portalsesisp.org.br", password: "12345678" },
    { email: "gustavo.lauria@portalsesisp.org.br", password: "12345678" },
    { email: "matheus.andrade2@portalsesisp.org.br", password: "12345678" },
    { email: "livia.silva85@portalsesisp.org.br", password: "12345678" },
    { email: "kaleb.gaspar@portalsesisp.org.br", password: "12345678" },
    { email: "bianca.mafra@portalsesisp.org.br", password: "12345678" }
];

function login() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Verifica se o email e a senha correspondem a um usuário
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Extrai os dois primeiros nomes do email, separados por um ponto
        const emailParts = user.email.split('@')[0].split('.');
        const userName = emailParts[0];
        const userLastName = emailParts[1];
        userEmail = `${userName}.${userLastName}`; // Combina os dois primeiros nomes
        isLoggedIn = true;
        emailInput.disabled = true; // Desativa o campo de email após o login
        passwordInput.disabled = true; // Desativa o campo de senha após o login
        loginButton.style.display = "none"; // Oculta o botão "Login"

        // Exibe a seção do quiz
        quizContainer.style.display = "block";

        // Carrega as questões e inicia o quiz
        loadQuestions();
    } else {
        alert("Email ou senha incorretos. Tente novamente.");
    }
}

emailInput.addEventListener("input", () => {
    if (emailInput.value.trim() !== "") {
        loginButton.disabled = false; // Ativa o botão "Login" quando o email é inserido
    } else {
        loginButton.disabled = true; // Desativa o botão se o email for removido
    }
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

    // Oculta a seção de login após o início do quiz
    document.querySelector(".login-container").style.display = "none";
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
    rankingData.push({ name: userEmail, score: score });

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
        userScoreElement.textContent = `${index + 1}. ${participant.name}: ${participant.score} de ${questions.length}`;
        rankingList.appendChild(userScoreElement);
    });

    rankingContainer.style.display = "block"; // Exibe a seção de ranking

    // Oculta o botão "Verificar Respostas"
    submitButton.style.display = "none";
}