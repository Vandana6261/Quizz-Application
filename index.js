const quizData = [
  {
    question: "What is the color of the sky on a clear day?",
    options: ["Blue", "Green", "Red", "Yellow"],
    answer: "Blue",
  },
  {
    question: "Which animal is known as the 'King of the Jungle'?",
    options: ["Tiger", "Lion", "Elephant", "Giraffe"],
    answer: "Lion",
  },
  {
    question: "How many days are there in a week?",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    answer: "Mars",
  },
  {
    question: "Which month has 28 or 29 days?",
    options: ["January", "February", "March", "April"],
    answer: "February",
  },
  {
    question: "What do we drink to stay hydrated?",
    options: ["Juice", "Soda", "Water", "Milkshake"],
    answer: "Water",
  },
  {
    question: "Which fruit is yellow in color?",
    options: ["Apple", "Banana", "Grapes", "Orange"],
    answer: "Banana",
  },
  {
    question: "How many letters are there in the English alphabet?",
    options: ["24", "25", "26", "27"],
    answer: "26",
  },
  {
    question: "Which device is used to make phone calls?",
    options: ["Television", "Computer", "Mobile Phone", "Camera"],
    answer: "Mobile Phone",
  },
  {
    question: "Which festival is known as the Festival of Lights in India?",
    options: ["Holi", "Diwali", "Eid", "Christmas"],
    answer: "Diwali",
  },
];


let form = document.querySelector("form");
console.log(form);
let button = document.querySelector("button");
let formContainer = document.querySelector("#formContainer");
let questionContainer = document.querySelector("#questionContainer");
let scoreContainer = document.querySelector("#scoreContainer");

let h2 = document.querySelector("h2");
let radioLabel = document.querySelectorAll(".radioLabel");
let radionInput = document.querySelectorAll(".radioInp");


let userDataArray = [];

window.addEventListener("load", () => {
  const arr = JSON.parse(localStorage.getItem("User"));
  arr.forEach((elem) => {
    userDataArray.push(elem);
  });
});

let score = 0;
function showQuestion(i) {
  // base case
  if (i == 10) {
    console.log(score);
    nextQue.textContent = "Submit Quiz";
    nextQue.classList.add("submitQuiz");
    nextQue.style.backgroundColor = "aqua"
    nextQue.style.fontSize = "23px"
    nextQue.style.color = "black"
    
      console.log("submit btn is clicked");
      let btn = document.querySelector("#nextQue");
      btn.addEventListener("click", () => {
        console.log("submit clicked");
        questionContainer.style.display = "none";
        scoreContainer.style.display = "flex";
        displayScore(score);
      });

    return score;
  }
  let h2 = document.querySelector("h2");
  let queNo = document.getElementById("queNo");
  let radioLabel = document.querySelectorAll(".radioLabel");
  let inputELem = document.querySelectorAll(".radioInp");
  // console.log(inputELem)

  h2.textContent = `Question ${i + 1}`;
  queNo.textContent = quizData[i].question;

  for (let j = 0; j < quizData[i].options.length; j++) {
    let label = radioLabel[j];
    label.textContent = quizData[i].options[j];

    let input = inputELem[j];
    input.value = quizData[i].options[j];
  }

  let btn = document.querySelector("#nextQue");

  nextQue.addEventListener(
    "click",
    () => {
      let checked = document.querySelector("input[name=question]:checked");
      if (!checked) {
        alert("Please select 1 option");
        showQuestion(i);
      } else {
        if (checked.value === quizData[i].answer) {
          checked.checked = false;
          score++;
          console.log("score :", score);
          showQuestion(i + 1);
        } else {
          checked.checked = false;
          console.log("score after 1 mis:", score);
          showQuestion(i + 1);
        }
      }
    },
    { once: true }
  );
}

let isUserPresent = (name, email) => {
  // if(userDataArray.length == 0) return false
  let present = userDataArray.some((eachSt) => {
    if (eachSt.name === name && eachSt.email === email) return true;
  });
  return present;
};

function displayScore(studentScore) {
  let scoreDiv = document.getElementById("scoreDiv");
  // console.log(score)
  scoreDiv.textContent = `You Score is ${studentScore} out of ${quizData.length}`;
}

let isUserExists = false;
form.addEventListener("submit", function (e) {
  let email = document.getElementById("email");
  let name = document.getElementById("name");
  let college = document.getElementById("clgName");
  let semester = document.getElementById("semester");

  let emailVal = email.value;
  let nameVal = name.value;
  let clgVal = college.value;
  let semVal = semester.value;

  let user = {
    name: nameVal,
    email: emailVal,
  };

  if(userDataArray.length == 0) {
    isUserExists = false
  } else {
    isUserExists = isUserPresent(nameVal, emailVal);
  }

  if (!isUserExists) {
    userDataArray.push(user);
    localStorage.setItem("User", JSON.stringify(userDataArray));
    formContainer.style.display = "none";
    questionContainer.style.display = "flex";

    let studentScore = 0;
    if (questionContainer.style.display == "flex") {
      studentScore = showQuestion(0);
      console.log(studentScore);
    }

  } else {
    alert("You are already done your test");
  }


  email.value = "";
  name.value = "";
  college.value = "";
  semester.value = "";
});

