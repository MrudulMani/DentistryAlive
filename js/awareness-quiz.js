document.addEventListener("DOMContentLoaded", () => {
    const quizData = [
        {
            question: "How often should you brush your teeth according to dentists?",
            options: [
                "Only in the morning after waking up",
                "Twice a day - morning and before bed",
                "After every single snack or drink"
            ],
            correct: 1,
            explanation: "Brushing twice a day (morning and night) for 2 minutes helps prevent plaque buildup and neutralizes acids that decay teeth while you sleep."
        },
        {
            question: "How often should you replace your toothbrush?",
            options: [
                "Every 3 to 4 months",
                "Every 6 months during dental cleanings",
                "Once a year or when bristles are frayed"
            ],
            correct: 0,
            explanation: "Over time, toothbrush bristles fray and lose their cleaning effectiveness. Bacteria can also accumulate on the bristles, making replacement every 3 months essential."
        },
        {
            question: "Does flossing really make a difference if you brush thoroughly?",
            options: [
                "No, brushing is sufficient for general health",
                "Only if you have food visibly stuck between teeth",
                "Yes, it cleans 35% of tooth surfaces brushing can't reach"
            ],
            correct: 2,
            explanation: "Brushing cleans the front, back, and chewing surfaces of teeth, but cannot reach the tight spaces between them. Flossing is critical to prevent cavities and gum disease in these areas."
        },
        {
            question: "What is the primary cause of dental cavities?",
            options: [
                "Hereditary factors alone",
                "Sugars reacting with plaque bacteria to produce acid",
                "Drinking hot or cold beverages too quickly"
            ],
            correct: 1,
            explanation: "Cavities occur when sugar from food feeds the naturally occurring bacteria in plaque, producing lactic acid that dissolves tooth enamel over time."
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const quizBox = document.getElementById("quizBox");
    const scorePanel = document.getElementById("scorePanel");
    
    if (!quizBox) return; // Only execute on the awareness page

    const questionNumEl = quizBox.querySelector(".quiz-question-num");
    const questionTextEl = quizBox.querySelector(".quiz-question");
    const optionsContainer = quizBox.querySelector(".quiz-options");
    const explanationBox = quizBox.querySelector(".quiz-explanation");
    const nextBtn = document.getElementById("nextQuestionBtn");
    
    // Score elements
    const scoreNumEl = document.getElementById("scoreNum");
    const restartBtn = document.getElementById("restartQuizBtn");

    function loadQuestion() {
        // Reset states
        explanationBox.style.display = "none";
        nextBtn.style.display = "none";
        optionsContainer.innerHTML = "";

        const currentQ = quizData[currentQuestionIndex];
        questionNumEl.innerText = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
        questionTextEl.innerText = currentQ.question;

        // Render options
        currentQ.options.forEach((optionText, idx) => {
            const button = document.createElement("button");
            button.className = "quiz-option-btn";
            button.innerText = optionText;
            button.addEventListener("click", () => handleOptionClick(idx, button));
            optionsContainer.appendChild(button);
        });
    }

    function handleOptionClick(selectedIdx, selectedButton) {
        const currentQ = quizData[currentQuestionIndex];
        const optionButtons = optionsContainer.querySelectorAll(".quiz-option-btn");

        // Disable all buttons to prevent multiple selections
        optionButtons.forEach(btn => btn.disabled = true);

        if (selectedIdx === currentQ.correct) {
            selectedButton.classList.add("correct");
            score++;
        } else {
            selectedButton.classList.add("wrong");
            // Highlight the correct answer too
            optionButtons[currentQ.correct].classList.add("correct");
        }

        // Show explanation
        explanationBox.querySelector("p").innerText = currentQ.explanation;
        explanationBox.style.display = "block";

        // Show Next button or Finish
        if (currentQuestionIndex < quizData.length - 1) {
            nextBtn.innerText = "Next Question";
        } else {
            nextBtn.innerText = "Show My Score";
        }
        nextBtn.style.display = "inline-flex";
    }

    nextBtn.addEventListener("click", () => {
        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            // Show score panel
            quizBox.style.display = "none";
            scorePanel.style.display = "block";
            scoreNumEl.innerText = `${score}/${quizData.length}`;
        }
    });

    restartBtn.addEventListener("click", () => {
        currentQuestionIndex = 0;
        score = 0;
        scorePanel.style.display = "none";
        quizBox.style.display = "block";
        loadQuestion();
    });

    // Start the quiz
    loadQuestion();
});
