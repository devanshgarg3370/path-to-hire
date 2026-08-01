/* ======================================
 PATH TO HIRE INTERNSHIP RECOMMENDATION JS
====================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


const internshipGrid =
document.getElementById(
"internshipGrid"
);



const locationFilter =
document.getElementById(
"location"
);



const remoteFilter =
document.getElementById(
"remote"
);



const stipend =
document.getElementById(
"stipend"
);



const stipendValue =
document.getElementById(
"stipendValue"
);



const applyFilters =
document.getElementById(
"applyFilters"
);



const emptyState =
document.getElementById(
"emptyState"
);






// ===============================
// INTERNSHIP DATA
// ===============================


let internships = [];
async function loadInternships() {

    const fileInput = document.getElementById("resumeFile");

    if (!fileInput.files.length) {
        alert("Please upload your resume.");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/internship-recommendations",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            }
        );

        const result = await response.json();

        console.log(JSON.stringify(result, null, 2));

        if (!result.success) {
            alert("Failed to load internships");
            return;
        }

        internships = result.internships.data.jobs || [];
        console.log(internships);

        displayInternships(internships);

    }

    catch (error) {

        console.error(error);
        alert("Something went wrong.");

    }

}






// ===============================
// DISPLAY CARDS
// ===============================


function displayInternships(data) {

    internshipGrid.innerHTML = "";

    if (data.length === 0) {
        emptyState.style.display = "block";
        return;
    }

    emptyState.style.display = "none";

    data.forEach((item, index) => {

        let card = document.createElement("div");

        card.className = "internship-card";

        card.innerHTML = `

        <div class="company-logo">
            <i class="fa-solid fa-building"></i>
        </div>

        <h3>${item.job_title}</h3>

        <p class="company">
            ${item.employer_name}
        </p>

        <div class="details">

            <p>📍 ${item.job_city || "India"}</p>

            <p>
                ${item.job_is_remote ? "🌐 Remote" : "🏢 Onsite"}
            </p>

        </div>

        <div class="card-buttons">

            <a
                class="apply-btn"
                href="${item.job_apply_link}"
                target="_blank">
                Apply
            </a>

        </div>

        `;

        internshipGrid.appendChild(card);

    });

}

// ===============================
// FILTER FUNCTION
// ===============================


function filterInternships(){



let result =
internships.filter(item=>{


let locationMatch =
locationFilter.value===""

||
item.location===locationFilter.value;




let remoteMatch =
!remoteFilter.checked

||

item.remote;




let stipendMatch =
item.stipend >= stipend.value;




return(

locationMatch &&

remoteMatch &&

stipendMatch

);


});



displayInternships(result);



}








// ===============================
// STIPEND SLIDER
// ===============================


stipend.addEventListener(
"input",
()=>{


stipendValue.innerText=

"₹"+

Number(stipend.value)
.toLocaleString();


});








applyFilters.addEventListener("click", () => {
    displayInternships(internships);
});








// ===============================
// RESET FILTER
// ===============================


emptyState
.querySelector("button")
.addEventListener(
"click",
()=>{


locationFilter.value="";


remoteFilter.checked=false;


stipend.value=0;


displayInternships(
internships
);


});







// ===============================
// APPLY BUTTON
// ===============================


window.applyInternship=
function(title){


alert(
"Application started for "+title
);


};






// ===============================
// SAVE INTERNSHIP
// ===============================


window.saveInternship=
function(index){


let saved =
JSON.parse(
localStorage.getItem(
"savedInternships"
)
)
||
[];



saved.push(
internships[index]
);



localStorage.setItem(
"savedInternships",
JSON.stringify(saved)
);



alert(
"Internship saved ⭐"
);


};







// INITIAL LOAD


document
    .getElementById("loadInternships")
    .addEventListener("click", loadInternships);



});