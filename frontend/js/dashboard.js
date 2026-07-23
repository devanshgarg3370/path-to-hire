document.addEventListener("DOMContentLoaded",()=>{


// ================= SIDEBAR =================


const sidebar=document.querySelector(".sidebar");


sidebar.innerHTML=`

<div class="logo">

<i class="fa-solid fa-robot"></i>

<span>Path To Hire</span>

</div>


<nav>

<a class="active">
<i class="fa-solid fa-house"></i>
Dashboard
</a>


<a href="resume.html">
<i class="fa-solid fa-file"></i>
Resume Analyzer
</a>


<a href="mock-interview.html">
<i class="fa-solid fa-microphone"></i>
Mock Interview
</a>


<a href="roadmap.html">
<i class="fa-solid fa-road"></i>
Roadmap
</a>


<a href="internships.html">
<i class="fa-solid fa-briefcase"></i>
Internships
</a>


<a href="profile.html">
<i class="fa-solid fa-user"></i>
Profile
</a>


<a id="logout">
<i class="fa-solid fa-right-from-bracket"></i>
Logout
</a>


</nav>

`;





// ================= NAVBAR =================


document.querySelector(".top-navbar").innerHTML=`

<div class="search">

<i class="fa fa-search"></i>

<input placeholder="Search">

</div>


<div class="profile-box">

<i class="fa fa-bell"></i>

<img src="images/avatar.png">

</div>

`;






// ================= STATISTICS =================



const stats=[


{
icon:"fa-file-lines",
title:"Resume Score",
value:"82%"
},


{
icon:"fa-microphone",
title:"Interviews",
value:"12"
},


{
icon:"fa-list-check",
title:"Tasks Done",
value:"45"
},


{
icon:"fa-chart-line",
title:"Readiness",
value:"76%"
}



];



const statsBox=document.getElementById("statsCards");


statsBox.innerHTML=stats.map(s=>`

<div class="stat-card">

<i class="fa-solid ${s.icon}"></i>

<h3>${s.value}</h3>

<p>${s.title}</p>

</div>

`).join("");







// ================= ROADMAP =================


const roadmap=[

["HTML CSS",90],

["JavaScript",75],

["React",60],

["DSA",40]

];



const roadmapBox=document.getElementById("roadmapProgress");


roadmapBox.innerHTML=roadmap.map(r=>`

<div class="progress-box">

<div class="progress-title">

<span>${r[0]}</span>

<b>${r[1]}%</b>

</div>


<div class="progress">

<span style="width:${r[1]}%"></span>

</div>


</div>


`).join("");







// ================= ACTIVITY =================


const activity=[

"Resume analyzed",

"Completed React roadmap",

"Mock interview attempted",

"Applied for internship"

];



document.getElementById("activityTimeline").innerHTML=

activity.map(a=>`

<div class="activity">

<i class="fa-solid fa-check"></i>

<p>${a}</p>

</div>

`).join("");








// ================= INTERNSHIPS =================


const internships=[

["Frontend Intern","Google"],
["React Developer","Microsoft"],
["MERN Intern","Startup"],
["AI Intern","TCS"]

];


document.getElementById("internshipList").innerHTML=

internships.map(i=>`

<div class="internship">

<h3>${i[0]}</h3>

<p>${i[1]}</p>

<button class="btn primary">
Apply
</button>

</div>

`).join("");







// ================= NEXT INTERVIEW =================



document.getElementById("nextInterview").innerHTML=`

<h2>
Upcoming AI Interview
</h2>

<p>
Technical Round
</p>

<h3>
Tomorrow 10:00 AM
</h3>


<button class="interview-btn">

Start Preparation

</button>


`;







// ================= LOGOUT =================


document.getElementById("logout")
.onclick=()=>{


localStorage.removeItem(
"pathToHireUser"
);


alert("Logged out successfully");


window.location.href="auth.html";


};



});