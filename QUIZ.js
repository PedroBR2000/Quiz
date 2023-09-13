const questions = [
    {
        question: "Qual é a capital da França?",
        options: ["Londres", "Paris", "Madrid"],
        correctAnswer: 1,
    },
    {
        question: "Qual é a cor do céu em um dia ensolarado?",
        options: ["Azul", "Vermelho", "Verde"],
        correctAnswer: 0,
    },
    {
        question: "Quanto é 2 + 2?",
        options: ["3", "4", "5"],
        correctAnswer: 1,
    },
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const scoreElement = document.getElementById("score");
const playerNameInput = document.getElementById("playerName");
const submitButton = document.getElementById("submitButton");

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionsContainer.innerHTML = "";

        for (let i = 0; i < currentQuestion.options.length; i++) {
            const optionButton = document.createElement("button");
            optionButton.textContent = currentQuestion.options[i];
            optionButton.classList.add("option");
            optionButton.setAttribute("data-index", i);
            optionButton.onclick = function () {
                checkAnswer(this);
            };
            optionsContainer.appendChild(optionButton);
        }
    } else {
        showResult();
    }
}

function checkAnswer(selectedOption) {
    const selectedOptionIndex = parseInt(selectedOption.getAttribute("data-index"));
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOptionIndex === currentQuestion.correctAnswer) {
        score++;
    }

    currentQuestionIndex++;
    loadQuestion();
}

function showResult() {
    questionElement.textContent = "Quiz concluído!";
    optionsContainer.innerHTML = "";
    scoreElement.textContent = `Sua pontuação final é: ${score} de ${questions.length}`;

    const playerName = playerNameInput.value;
    const playerData = { name: playerName, score: score };

    axios({
        method: 'put',
        url: 'https://api.github.com/repos/PedroBR2000/Quiz/contents/ranking.json',
        headers: {
            'Authorization': 'token SEU_TOKEN_DE_AUTENTICACAO_DO_GITHUB',
        },
        data: {
            message: 'Atualizar ranking',
            content: btoa(JSON.stringify(playerData)), // Codificar os dados em base64
            sha: 'QUIZ.html' // SHA atual do arquivo JSON
        }
    }).then(response => {
        // Os dados do jogador foram enviados com sucesso
        console.log(response.data);
        fetchRanking(); // Carrega o ranking após salvar os dados do jogador
    }).catch(error => {
        // Lidar com erros
        console.error(error);
    });
}

function fetchRanking() {
    axios.get('https://raw.githubusercontent.com/PedroBR2000/Quiz/master/ranking.json')
    .then(response => {
        const rankingData = response.data;
        displayRanking(rankingData);
    })
    .catch(error => {
        console.error(error);
    });
}

function displayRanking(rankingData) {
    const rankingList = document.getElementById("rankingList");
    rankingList.innerHTML = "";

    rankingData.forEach((player, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${player.name}: ${player.score}`;
        rankingList.appendChild(listItem);
    });

    const rankingSection = document.getElementById("ranking");
    rankingSection.style.display = "block";
}

window.onload = function () {
    fetchRanking(); // Carrega o ranking ao carregar a página
    loadQuestion();
};
