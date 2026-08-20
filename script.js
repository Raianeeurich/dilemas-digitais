const dilemmas = [
    {
        question: "Uma rede social oferece um aplicativo gratuito, mas pede acesso a todos os seus dados pessoais. Você aceita?",

        context:
            "O aplicativo promete facilitar sua vida, mas seus dados poderão ser utilizados para publicidade personalizada.",

        a: "Aceito. Quero utilizar o aplicativo.",
        b: "Não aceito. Prefiro proteger meus dados.",

        resultA:
            "Você priorizou praticidade e acesso. Porém, é importante entender quais dados estão sendo coletados e para que serão utilizados.",

        resultB:
            "Você priorizou sua privacidade. Essa escolha reduz a quantidade de informações pessoais compartilhadas com a plataforma."
    },

    {
        question: "Você recebe uma notícia muito chocante em um grupo de mensagens. Você compartilha imediatamente?",

        context:
            "A notícia parece verdadeira, mas você não sabe quem publicou originalmente a informação.",

        a: "Compartilho para alertar outras pessoas.",
        b: "Verifico a informação antes de compartilhar.",

        resultA:
            "Sua intenção foi ajudar rapidamente. O problema é que uma informação falsa também pode se espalhar rapidamente.",

        resultB:
            "Você escolheu verificar antes de divulgar. Essa atitude ajuda a diminuir a circulação de desinformação."
    },

    {
        question: "Uma inteligência artificial fez grande parte de um trabalho escolar. Você entrega o trabalho como se tivesse feito tudo sozinho?",

        context:
            "A ferramenta produziu um texto de boa qualidade e você fez apenas pequenas alterações.",

        a: "Sim. O importante é o resultado final.",
        b: "Não. Informo que utilizei inteligência artificial.",

        resultA:
            "Você priorizou o resultado. Porém, isso pode esconder o processo de aprendizagem e gerar problemas de autoria.",

        resultB:
            "Você escolheu transparência. A IA pode ser uma ferramenta de apoio, mas deixar claro seu uso ajuda a manter a confiança."
    },

    {
        question: "Um colega está sofrendo ataques nas redes sociais. Você vê tudo acontecendo. O que faz?",

        context:
            "Os comentários são ofensivos e outras pessoas continuam compartilhando as mensagens.",

        a: "Não me envolvo. O problema não é meu.",
        b: "Denuncio e tento ajudar a pessoa.",

        resultA:
            "Você preferiu não participar diretamente. Entretanto, a ausência de intervenção pode permitir que o problema continue.",

        resultB:
            "Você decidiu agir. Denunciar conteúdos abusivos e oferecer apoio pode ajudar a interromper situações de violência digital."
    },

    {
        question: "Uma empresa oferece desconto em troca de rastrear sua localização constantemente. Você aceita?",

        context:
            "O desconto é significativo, mas a empresa poderá saber onde você está durante grande parte do dia.",

        a: "Aceito pelo desconto.",
        b: "Recuso para preservar minha privacidade.",

        resultA:
            "Você considerou o benefício financeiro mais importante. É essencial avaliar se o benefício compensa a quantidade de dados cedidos.",

        resultB:
            "Você colocou sua privacidade em primeiro lugar. Dados de localização podem revelar informações bastante pessoais sobre uma pessoa."
    }
];


let currentDilemma = 0;
let score = 0;

const question = document.getElementById("question");
const context = document.getElementById("context");

const textA = document.getElementById("textA");
const textB = document.getElementById("textB");

const choiceA = document.getElementById("choiceA");
const choiceB = document.getElementById("choiceB");

const result = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");

const nextButton = document.getElementById("nextButton");

const scoreElement = document.getElementById("score");
const currentNumber = document.getElementById("currentNumber");
const progressBar = document.getElementById("progressBar");

const themeButton = document.getElementById("themeButton");


function loadDilemma() {

    const dilemma = dilemmas[currentDilemma];

    question.textContent = dilemma.question;
    context.textContent = dilemma.context;

    textA.textContent = dilemma.a;
    textB.textContent = dilemma.b;

    currentNumber.textContent =
        String(currentDilemma + 1).padStart(2, "0");

    progressBar.style.width =
        `${((currentDilemma + 1) / dilemmas.length) * 100}%`;

    result.classList.add("hidden");

    choiceA.disabled = false;
    choiceB.disabled = false;

    choiceA.style.opacity = "1";
    choiceB.style.opacity = "1";
}


function choose(option) {

    const dilemma = dilemmas[currentDilemma];

    choiceA.disabled = true;
    choiceB.disabled = true;

    if (option === "A") {

        score++;

        resultTitle.textContent = "Você escolheu A";

        resultText.textContent = dilemma.resultA;

        choiceB.style.opacity = ".4";

    } else {

        resultTitle.textContent = "Você escolheu B";

        resultText.textContent = dilemma.resultB;

        choiceA.style.opacity = ".4";
    }

    scoreElement.textContent = score;

    result.classList.remove("hidden");
}


function nextDilemma() {

    currentDilemma++;

    if (currentDilemma >= dilemmas.length) {

        showFinalResult();

        return;
    }

    loadDilemma();
}


function showFinalResult() {

    question.textContent = "Você chegou ao final!";

    context.textContent =
        `Você analisou ${dilemmas.length} dilemas digitais e marcou ${score} ponto${score === 1 ? "" : "s"}.`;

    choiceA.style.display = "none";
    choiceB.style.display = "none";

    result.classList.remove("hidden");

    resultTitle.textContent = "Sua reflexão continua";

    resultText.textContent =
        "Não existe uma pontuação perfeita. O mais importante é pensar nas consequências de cada escolha antes de agir no ambiente digital.";

    nextButton.textContent = "Refazer o desafio";

    nextButton.onclick = restartGame;
}


function restartGame() {

    currentDilemma = 0;
    score = 0;

    scoreElement.textContent = "0";

    choiceA.style.display = "flex";
    choiceB.style.display = "flex";

    nextButton.textContent = "Próximo dilema →";

    nextButton.onclick = nextDilemma;

    loadDilemma();
}


choiceA.addEventListener("click", () => {
    choose("A");
});

choiceB.addEventListener("click", () => {
    choose("B");
});

nextButton.addEventListener("click", nextDilemma);


// DARK MODE

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    themeButton.textContent =
        isDark ? "☀️" : "🌙";

    localStorage.setItem(
        "darkMode",
        isDark ? "true" : "false"
    );
});


if (localStorage.getItem("darkMode") === "true") {

    document.body.classList.add("dark");

    themeButton.textContent = "☀️";
}


loadDilemma();
