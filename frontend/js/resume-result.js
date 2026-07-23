// ==========================================
// Resume Result Page JavaScript
// Path to Hire ATS Analyzer
// ==========================================


// Wait until page loads
document.addEventListener("DOMContentLoaded", () => {


// ===============================
// TAB FUNCTIONALITY
// ===============================


const tabs = document.querySelectorAll(".tabs button");
const contents = document.querySelectorAll(".tab-content");


tabs.forEach((tab, index)=>{


tab.addEventListener("click",()=>{


// Remove active from all tabs

tabs.forEach(btn=>{
    btn.classList.remove("active");
});


// Add active current tab

tab.classList.add("active");



// Hide all content

contents.forEach(content=>{

    content.style.display="none";

});



// Show selected content

contents[index].style.display="block";



// Smooth animation

contents[index].style.opacity=0;


setTimeout(()=>{

contents[index].style.opacity=1;

},50);



});



});



// Default first tab

contents.forEach((content,index)=>{

if(index!==0){

content.style.display="none";

}

});







// ===============================
// ATS SCORE COUNT ANIMATION
// ===============================


const scoreElement=document.querySelector(".gauge-circle span");


let finalScore=82;


let currentScore=0;


let speed=20;



let counter=setInterval(()=>{


currentScore++;


scoreElement.innerHTML=currentScore;



if(currentScore>=finalScore){


clearInterval(counter);


}



},speed);









// ===============================
// ATS GAUGE ANIMATION
// ===============================


const gauge=document.querySelector(".gauge-circle");



let progress=0;


let gaugeAnimation=setInterval(()=>{


progress++;



gauge.style.background=
`
conic-gradient(
#0096c7 ${progress*3.6}deg,
#e5e7eb ${progress*3.6}deg
)
`;



if(progress>=82){

clearInterval(gaugeAnimation);

}


},20);









// ===============================
// PROGRESS BAR ANIMATION
// ===============================


const bars=document.querySelectorAll(".bar div");



bars.forEach(bar=>{


let width=bar.style.width;


bar.style.width="0%";



setTimeout(()=>{


bar.style.width=width;


},500);



});









// ===============================
// ACCORDION FUNCTIONALITY
// ===============================


const accordions=document.querySelectorAll(".accordion button");



accordions.forEach(button=>{


button.addEventListener("click",()=>{


const parent=button.parentElement;


const content=
parent.querySelector(".accordion-content");



const icon=
button.querySelector("i");




if(content.style.maxHeight){


// close

content.style.maxHeight=null;


icon.style.transform="rotate(0deg)";



}

else{


// open

content.style.maxHeight=
content.scrollHeight+"px";


icon.style.transform=
"rotate(180deg)";



}



});



});









// ===============================
// DOWNLOAD REPORT BUTTON
// ===============================


const downloadBtn=
document.querySelector(".download");



downloadBtn.addEventListener("click",()=>{



downloadBtn.innerHTML=
`
<i class="fa-solid fa-spinner fa-spin"></i>
Generating Report...
`;



downloadBtn.disabled=true;



setTimeout(()=>{


downloadBtn.innerHTML=
`
<i class="fa-solid fa-check"></i>
Report Downloaded
`;



// create dummy report


let reportContent=
`
PATH TO HIRE
Resume Analysis Report


ATS Score : 82%

Status : Excellent Resume


Keyword Match:
React
JavaScript
MongoDB
Node.js


Missing Skills:
Docker
AWS
System Design


Recommendations:
Improve project descriptions.
Add cloud skills.
`;



let blob=
new Blob(
[reportContent],
{
type:"text/plain"
}
);



let link=
document.createElement("a");


link.href=
URL.createObjectURL(blob);


link.download=
"ATS_Report.txt";


link.click();




setTimeout(()=>{


downloadBtn.innerHTML=
`
<i class="fa-solid fa-download"></i>
Download Report
`;


downloadBtn.disabled=false;


},3000);



},2000);



});









// ===============================
// RE-ANALYZE BUTTON
// ===============================


const reAnalyze=
document.querySelector(".reanalyze");



reAnalyze.addEventListener("click",()=>{



reAnalyze.classList.add("loading");



reAnalyze.innerHTML=
`
<i class="fa-solid fa-spinner fa-spin"></i>
Analyzing...
`;



setTimeout(()=>{


reAnalyze.innerHTML=
`
<i class="fa-solid fa-check"></i>
Analysis Complete
`;



reAnalyze.classList.remove("loading");



setTimeout(()=>{


reAnalyze.innerHTML=
`
<i class="fa-solid fa-rotate"></i>
Re-analyze
`;



},2000);



},3000);



});









// ===============================
// SMOOTH SCROLL
// ===============================



document.querySelectorAll("a").forEach(link=>{


link.addEventListener("click",function(e){


let target=
document.querySelector(
this.getAttribute("href")
);



if(target){


e.preventDefault();



target.scrollIntoView({

behavior:"smooth"

});


}



});


});









// ===============================
// CARD HOVER EFFECT
// ===============================


const cards=
document.querySelectorAll(
".ats-card,.bar-item,.compare-card"
);



cards.forEach(card=>{


card.addEventListener(
"mouseenter",
()=>{

card.style.transform=
"translateY(-5px)";


}
);



card.addEventListener(
"mouseleave",
()=>{


card.style.transform=
"translateY(0)";


});


});









// ===============================
// PAGE LOAD ANIMATION
// ===============================


const sections=
document.querySelectorAll(
"section"
);



sections.forEach((section,index)=>{


section.style.opacity=0;


section.style.transform=
"translateY(30px)";



setTimeout(()=>{


section.style.transition=
"0.6s ease";


section.style.opacity=1;


section.style.transform=
"translateY(0)";



},
index*200);



});



});