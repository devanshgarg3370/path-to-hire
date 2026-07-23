document.addEventListener(
"DOMContentLoaded",
()=>{


const setup =
document.getElementById("setupScreen");


const interview =
document.getElementById("interviewScreen");


const result =
document.getElementById("resultScreen");


const startBtn =
document.getElementById("startInterview");



const typeCards =
document.querySelectorAll(".type-card");


const modeButtons =
document.querySelectorAll(".toggle button");


const submitBtn =
document.querySelector(".submit-btn");


const textarea =
document.querySelector("textarea");



const aiMessage =
document.querySelector(".ai-message p");


const userMessage =
document.querySelector(".user-message p");


const progress =
document.querySelector(".progress");


const timer =
document.querySelector(".timer");





let selectedType="Technical";

let selectedMode="Voice";

let questionIndex=0;

let time=755;



let questions=[


"Tell me about yourself.",


"Explain OOP concepts.",


"What are your strengths?",


"Explain your project.",


"Why should we hire you?"

];






// SELECT INTERVIEW TYPE


typeCards.forEach(card=>{


card.addEventListener(
"click",
()=>{


typeCards.forEach(c=>
c.classList.remove("active")
);


card.classList.add("active");


selectedType =
card.querySelector("h3").innerText;



});


});







// MODE CHANGE


modeButtons.forEach(btn=>{


btn.addEventListener(
"click",
()=>{


modeButtons.forEach(b=>
b.classList.remove("active")
);


btn.classList.add("active");


selectedMode =
btn.innerText;



});


});






// START INTERVIEW


startBtn.addEventListener(
"click",
()=>{


setup.classList.remove("active");


interview.classList.add("active");


startTimer();


loadQuestion();


});








// LOAD QUESTION


function loadQuestion(){


aiMessage.innerText =
questions[questionIndex];


progress.innerText =

`Question ${questionIndex+1} / ${questions.length}`;


}






// SUBMIT ANSWER


submitBtn.addEventListener(
"click",
()=>{


let answer =
textarea.value.trim();



if(answer==="")
{

alert(
"Please enter your answer"
);

return;

}



userMessage.innerText =
answer;



textarea.value="";



questionIndex++;



if(questionIndex < questions.length)
{


loadQuestion();


}

else{


finishInterview();


}



});







// TIMER


function startTimer(){


let interval =
setInterval(()=>{


time--;



let min =
Math.floor(time/60);



let sec =
time%60;



timer.innerText =
`⏱ ${min}:${sec}`;



if(time<=0)
{


clearInterval(interval);


finishInterview();


}



},1000);


}






// RESULT


function finishInterview(){


interview.classList.remove("active");


result.classList.add("active");



localStorage.setItem(
"lastInterview",
JSON.stringify({

type:selectedType,

mode:selectedMode,

score:82,

date:new Date()

})

);



}






// ACCORDION


document
.querySelectorAll(".accordion button")
.forEach(btn=>{


btn.addEventListener(
"click",
()=>{


let content =
btn.nextElementSibling;


content.style.display =
content.style.display==="block"
?
"none"
:
"block";


});


});







// RETRY BUTTON


document
.querySelector(".result-buttons button")
.addEventListener(
"click",
()=>{


location.reload();


});



});