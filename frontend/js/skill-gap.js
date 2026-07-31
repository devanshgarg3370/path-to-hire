// Animate Overall Match Bar

window.addEventListener("load",()=>{

document.querySelector(".match-fill").style.width="78%";

});

// Animate Skill Bars

document.querySelectorAll(".fill").forEach(bar=>{

setTimeout(()=>{

bar.style.width=bar.dataset.width+"%";

},400);

});

// Company Chips

document.querySelectorAll(".company-chips span").forEach(chip=>{

chip.addEventListener("click",()=>{

document.querySelector(".input-group input").value=chip.innerText;

});

});

// Analyze Button

const analyzeBtn = document.querySelector(".analyze-btn");
const results = document.getElementById("resultsSection");

results.style.display = "none";

analyzeBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    const resumeText = localStorage.getItem("resumeText");

    if (!resumeText) {
        alert("Please upload your resume first.");
        return;
    }

    const targetRole = document.querySelector("select").value;

    const company = document
        .querySelector(".input-group input")
        .value
        .trim();

    const token = localStorage.getItem("token");

    analyzeBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Analyzing...';

    analyzeBtn.disabled = true;
try {

    const response = await fetch(
    "http://127.0.0.1:8000/skill-gap-analysis",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            resume_text: resumeText,
            target_role: targetRole,
            company: company
        })
    }
);

const data = await response.json();
if (!response.ok || !data.success) {

    console.error(data);

    alert(
        data.detail ||
        data.message ||
        "Skill Gap Analysis failed."
    );

    analyzeBtn.innerHTML =
        '<i class="fa-solid fa-wand-magic-sparkles"></i> Analyze Skill Gap';

    analyzeBtn.disabled = false;

    return;
}
console.log("FULL RESPONSE:", data);
console.log("AI OBJECT:", data.data);

console.log(data);

const ai = data.data;
if (!ai) throw new Error("AI response is empty");
console.log("FULL DATA:", data);
console.log("AI JSON:", JSON.stringify(ai, null, 2));
console.log("Matching:", ai.key_skills_found);
console.log("Missing:", ai.missing_skills);
// ================= MATCH =================

const matchFill = document.getElementById("matchFill");
const matchText = document.getElementById("matchText");

matchFill.style.width = ai.match_percentage + "%";
matchFill.innerText = ai.match_percentage + "%";

matchText.innerHTML =
    `You currently match approximately <strong>${ai.match_percentage}%</strong> of the required skills.`;

// ================= SUMMARY =================

document.getElementById("aiSummary").innerText =
    ai.role_summary;

// ================= SKILLS =================

const skillsChart = document.getElementById("skillsChart");

skillsChart.innerHTML = "";

(ai.key_skills_found || []).forEach(skill => {

    skillsChart.innerHTML += `
        <div class="skill">
            <span>${skill}</span>

            <div class="bar">
                <div class="fill" style="width:${ai.match_percentage}%"></div>
            </div>

            <strong>${ai.match_percentage}%</strong>
        </div>
    `;

});

// ================= MISSING SKILLS =================

const tbody =
document.getElementById("missingSkillsBody");

tbody.innerHTML = "";

(ai.missing_skills || []).forEach(skill => {

    tbody.innerHTML += `
        <tr>
            <td>${skill}</td>
            <td>High</td>
            <td>2-3 Weeks</td>
            <td>
                <span class="badge medium">
                    Medium
                </span>
            </td>
        </tr>
    `;

});

analyzeBtn.innerHTML =
'<i class="fa-solid fa-check"></i> Analysis Complete';

analyzeBtn.style.background = "#22c55e";

console.log("Showing Results...");
results.style.display = "block";
console.log("Results Visible");


results.scrollIntoView({
    behavior: "smooth"
});

} catch (error) {

    console.error(error);

    console.error(error.stack);

    alert(error.message);

    analyzeBtn.disabled = false;

    analyzeBtn.innerHTML =
    '<i class="fa-solid fa-wand-magic-sparkles"></i> Analyze Skill Gap';

}
});

// Generate Roadmap

document.querySelector(".roadmap-btn").addEventListener("click",()=>{

window.location.href="roadmap.html";

});