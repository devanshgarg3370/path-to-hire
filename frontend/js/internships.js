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


const internships=[


{
title:"Frontend Developer Intern",
company:"Google",
location:"Bangalore",
stipend:50000,
type:"MNC",
remote:true,
skills:["React","JavaScript"]
},


{
title:"Backend Developer Intern",
company:"Microsoft",
location:"Hyderabad",
stipend:60000,
type:"MNC",
remote:false,
skills:["Node.js","MongoDB"]
},


{
title:"AI Engineer Intern",
company:"OpenAI Startup",
location:"Delhi NCR",
stipend:30000,
type:"Startup",
remote:true,
skills:["Python","ML"]
},


{
title:"Full Stack Developer",
company:"Infosys",
location:"Pune",
stipend:25000,
type:"Service Based",
remote:false,
skills:["MERN"]
},


{
title:"Software Developer Intern",
company:"Amazon",
location:"Mumbai",
stipend:70000,
type:"Product Based",
remote:true,
skills:["Java","DSA"]
}


];






// ===============================
// DISPLAY CARDS
// ===============================


function displayInternships(data){


internshipGrid.innerHTML="";



if(data.length===0)
{


emptyState.style.display="block";

return;


}


else{


emptyState.style.display="none";


}






data.forEach(
(item,index)=>{


let card =
document.createElement("div");


card.className=
"internship-card";



card.innerHTML=`

<div class="company-logo">

<i class="fa-solid fa-building"></i>

</div>


<h3>
${item.title}
</h3>


<p class="company">

${item.company}

</p>



<div class="details">


<p>
📍 ${item.location}
</p>


<p>
💰 ₹${item.stipend}
</p>


<p>
${item.remote?"🌐 Remote":"🏢 Onsite"}
</p>


</div>



${item.skills.map(skill=>

`<span class="badge">${skill}</span>`

).join("")}



<div class="card-buttons">

<button class="apply-btn"
onclick="applyInternship('${item.title}')">

Apply

</button>


<button class="save-btn"
onclick="saveInternship(${index})">

♡ Save

</button>

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








applyFilters.addEventListener(
"click",
filterInternships
);








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


displayInternships(
internships
);



});