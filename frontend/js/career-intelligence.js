
const API_URL =
"http://127.0.0.1:8000/career-intelligence/";



async function loadCareerReport(){


try{

const resumeText =
    localStorage.getItem("resumeText");

const token =
    localStorage.getItem("token");

if (!resumeText) {

    alert(
        "Please upload and analyze your resume first."
    );

    return;
}

if (!token) {

    alert(
        "Please login again."
    );

    return;
}
const requestBody = {

    resume_text: resumeText

};

const response =
    await fetch(API_URL, {

        method: "POST",

        headers: {

            Authorization:
                `Bearer ${token}`,

            "Content-Type":
                "application/json"

        },

        body:
            JSON.stringify(requestBody)

    });


const data =
await response.json();

console.log(data);



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






function downloadPDF(){

window.print();

}
