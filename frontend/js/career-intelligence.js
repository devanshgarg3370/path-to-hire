
const API_URL =
"http://127.0.0.1:8000/career-analysis";



async function loadCareerReport(){


try{


const response =
await fetch(API_URL);



const data =
await response.json();



document.getElementById(
"candidateName"
).innerHTML=data.name;



document.getElementById(
"resumeScore"
).innerHTML=
data.resume_score+"%";



document.getElementById(
"atsScore"
).innerHTML=
data.ats_score+"%";



document.getElementById(
"resumeAnalysis"
).innerHTML=
data.analysis;



document.getElementById(
"careerSuggestion"
).innerHTML=
data.career;



}

catch(error){

console.log(error);

}


}



loadCareerReport();






new QRCode(
document.getElementById("qrcode"),
{

text:
"https://career-intelligence.com/report/CI-2026-00125",

width:150,

height:150

});





function downloadPDF(){

window.print();

}
