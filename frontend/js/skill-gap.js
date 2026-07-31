// ==========================================================
// PATH TO HIRE - SKILL GAP ANALYSIS
// ==========================================================

const API_BASE = "http://127.0.0.1:8000";


// ==========================================================
// DOM ELEMENTS
// ==========================================================

const analyzeBtn = document.getElementById("analyzeSkillGapBtn");
const resultsSection = document.getElementById("resultsSection");

const resumeInput = document.getElementById("resumeFile");
const jobDescriptionInput = document.getElementById("jobDescription");

const targetRoleInput = document.getElementById("targetRole");
const targetCompanyInput = document.getElementById("targetCompany");


// ==========================================================
// COMPANY CHIPS
// ==========================================================

document.querySelectorAll(".company-chips span").forEach((chip) => {

    chip.addEventListener("click", () => {

        if (targetCompanyInput) {
            targetCompanyInput.value = chip.innerText.trim();
        }

    });

});


// ==========================================================
// ESCAPE HTML
// ==========================================================

function escapeHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


// ==========================================================
// ERROR MESSAGE
// ==========================================================

function getErrorMessage(data) {

    if (!data) {
        return "Something went wrong.";
    }

    if (typeof data.detail === "string") {
        return data.detail;
    }

    if (Array.isArray(data.detail)) {

        return data.detail
            .map(item => item.msg || "Invalid request.")
            .join("\n");
    }

    if (typeof data.message === "string") {
        return data.message;
    }

    return "Skill gap analysis failed.";
}


<<<<<<< HEAD
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
=======
// ==========================================================
// RENDER COMPLETE RESULT
// ==========================================================
>>>>>>> 71a2fc490d77e759cdb6a8b466e4404d2e64e4de

function displayAnalysisResult(data) {

<<<<<<< HEAD
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
=======
    console.log("Rendering analysis:", data);

    if (!data || !data.data) {
        throw new Error("Analysis data was not returned by the server.");
    }

    const result = data.data;

    // ------------------------------------------------------
    // OVERALL MATCH
    // ------------------------------------------------------

    const percentage =
        Number(result.overall_match_percentage) || 0;

    const matchFill =
        document.querySelector(".match-fill");

    const matchText =
        document.querySelector(".match-card p");


    if (matchFill) {

        matchFill.style.width = `${percentage}%`;
        matchFill.textContent = `${percentage}%`;
    }


    if (matchText) {

        matchText.innerHTML = `
            <strong>${escapeHTML(result.candidate_name || "Candidate")}</strong>
            has an overall skill match of
            <strong>${percentage}%</strong>
            for
            <strong>${escapeHTML(result.target_role || "the target role")}</strong>.
        `;
    }


    // ------------------------------------------------------
    // SKILL BREAKDOWN
    // ------------------------------------------------------

    const skillsChart =
        document.querySelector(".skills-chart");


    if (skillsChart) {

        const matching =
            Array.isArray(result.matching_skills)
                ? result.matching_skills
                : [];

        const partial =
            Array.isArray(result.partially_matching_skills)
                ? result.partially_matching_skills
                : [];

        const missing =
            Array.isArray(result.missing_skills)
                ? result.missing_skills
                : [];


        let html = "";


        matching.forEach(skill => {

            html += `
                <div class="skill">

                    <span>${escapeHTML(skill)}</span>

                    <div class="bar">
                        <div
                            class="fill"
                            style="width:100%"
                        ></div>
                    </div>

                    <strong>Matched</strong>

                </div>
            `;
        });


        partial.forEach(skill => {

            html += `
                <div class="skill">

                    <span>${escapeHTML(skill)}</span>

                    <div class="bar">
                        <div
                            class="fill"
                            style="width:50%"
                        ></div>
                    </div>

                    <strong>Partial</strong>

                </div>
            `;
        });


        missing.forEach(skill => {
>>>>>>> 71a2fc490d77e759cdb6a8b466e4404d2e64e4de

            html += `
                <div class="skill">

                    <span>${escapeHTML(skill)}</span>

                    <div class="bar">
                        <div
                            class="fill"
                            style="width:0%"
                        ></div>
                    </div>

                    <strong>Missing</strong>

                </div>
            `;
        });


        skillsChart.innerHTML =
            html || "<p>No skill breakdown available.</p>";
    }


    // ------------------------------------------------------
    // MISSING SKILLS TABLE
    // ------------------------------------------------------

    const tableBody =
        document.querySelector(".table-card tbody");


    if (tableBody) {

        const missing =
            Array.isArray(result.missing_skills)
                ? result.missing_skills
                : [];


        if (missing.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="4">
                        No major missing skills identified.
                    </td>
                </tr>
            `;

        } else {

            tableBody.innerHTML = missing
                .map(skill => `

                    <tr>

                        <td>
                            ${escapeHTML(skill)}
                        </td>

                        <td>
                            Recommended
                        </td>

                        <td>
                            —
                        </td>

                        <td>
                            <span class="badge medium">
                                Learn
                            </span>
                        </td>

                    </tr>

                `)
                .join("");
        }
    }


    // ------------------------------------------------------
    // AI SUMMARY
    // ------------------------------------------------------

    const summaryCard =
        document.querySelector(".summary-card");


    if (summaryCard) {

        const gap =
            result.skill_gap_summary || {};

        const recommendations =
            Array.isArray(result.actionable_recommendations)
                ? result.actionable_recommendations
                : [];


        const recommendationsHTML =
            recommendations.length
                ? recommendations
                    .map(item =>
                        `<li>${escapeHTML(item)}</li>`
                    )
                    .join("")
                : "<li>No recommendations available.</li>";


        summaryCard.innerHTML = `

            <h3>AI Skill Gap Summary</h3>

            <p>
                <strong>Candidate:</strong>
                ${escapeHTML(result.candidate_name || "Candidate")}
            </p>

            <p>
                <strong>Target Role:</strong>
                ${escapeHTML(result.target_role || "Not specified")}
            </p>

            <br>

            <p>
                <strong>Frontend:</strong>
                ${escapeHTML(
                    gap.frontend_gap ||
                    "No frontend gap identified."
                )}
            </p>

            <p>
                <strong>Backend:</strong>
                ${escapeHTML(
                    gap.backend_gap ||
                    "No backend gap identified."
                )}
            </p>

            <p>
                <strong>DevOps & Testing:</strong>
                ${escapeHTML(
                    gap.devops_testing_gap ||
                    "No DevOps/testing gap identified."
                )}
            </p>

            <br>

            <h3>Recommended Next Steps</h3>

            <ol>
                ${recommendationsHTML}
            </ol>
        `;
    }


    console.log("Analysis rendered successfully.");
}


// ==========================================================
// ANALYZE BUTTON
// ==========================================================

if (analyzeBtn) {

    analyzeBtn.addEventListener("click", async (event) => {

        // Prevent accidental form/page submission
        event.preventDefault();


        const resumeFile =
            resumeInput?.files?.[0];

        const jobDescription =
            jobDescriptionInput?.value?.trim();

        const token =
            localStorage.getItem("token");


        // ==================================================
        // VALIDATION
        // ==================================================

        if (!resumeFile) {

            alert("Please upload your resume PDF.");
            return;
        }


        if (
            resumeFile.type !== "application/pdf" &&
            !resumeFile.name.toLowerCase().endsWith(".pdf")
        ) {

            alert("Only PDF resumes are supported.");
            return;
        }


        if (!jobDescription) {

            alert("Please paste the target job description.");
            return;
        }


        if (!token) {

            alert(
                "Login session not found. Please log in again."
            );

            window.location.href = "login.html";

            return;
        }


        // ==================================================
        // FORM DATA
        // ==================================================

        const formData =
            new FormData();


        formData.append(
            "job_description",
            jobDescription
        );


        formData.append(
            "file",
            resumeFile
        );


        // ==================================================
        // LOADING
        // ==================================================

        const originalButtonHTML =
            analyzeBtn.innerHTML;


        analyzeBtn.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Analyzing...
        `;


        analyzeBtn.disabled = true;


        try {

            console.log("Starting Skill Gap Analysis...");


            // ==================================================
            // API CALL
            // ==================================================

            const response =
                await fetch(
                    `${API_BASE}/skill-gap-analysis`,
                    {
                        method: "POST",

                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        },

                        body: formData
                    }
                );


            console.log(
                "HTTP Status:",
                response.status
            );


            // ==================================================
            // PARSE JSON
            // ==================================================

            let data;


            try {

                data =
                    await response.json();

            } catch (parseError) {

                console.error(
                    "JSON parse error:",
                    parseError
                );

                throw new Error(
                    `Invalid server response (${response.status}).`
                );
            }


            console.log(
                "Skill Gap API Response:",
                data
            );


            // ==================================================
            // HTTP ERROR
            // ==================================================

            if (!response.ok) {

                if (
                    response.status === 401 ||
                    response.status === 403
                ) {

                    throw new Error(
                        "Your login session has expired. Please log in again."
                    );
                }


                throw new Error(
                    getErrorMessage(data)
                );
            }


            // ==================================================
            // API SUCCESS VALIDATION
            // ==================================================

            if (!data.success) {

                throw new Error(
                    data.message ||
                    "Skill gap analysis failed."
                );
            }


            if (!data.data) {

                throw new Error(
                    "Server returned success but no analysis data."
                );
            }


            // ==================================================
            // IMPORTANT:
            // SHOW SECTION BEFORE RENDERING
            // ==================================================

            if (resultsSection) {

                resultsSection.style.display =
                    "block";
            }


            // ==================================================
            // RENDER
            // ==================================================

            displayAnalysisResult(data);


            // ==================================================
            // SUCCESS BUTTON
            // ==================================================

            analyzeBtn.innerHTML = `
                <i class="fa-solid fa-check"></i>
                Analysis Complete
            `;


            analyzeBtn.style.background =
                "#22c55e";


            // ==================================================
            // SCROLL
            // ==================================================

            if (resultsSection) {

                setTimeout(() => {

                    resultsSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }, 100);
            }


        } catch (error) {

            console.error(
                "SKILL GAP FAILURE:",
                error
            );


            alert(
                error.message ||
                "Unable to complete skill gap analysis."
            );


            analyzeBtn.innerHTML =
                originalButtonHTML;


            analyzeBtn.style.background =
                "";


        } finally {

            analyzeBtn.disabled =
                false;
        }

    });
}


// ==========================================================
// ROADMAP BUTTON
// ==========================================================

const roadmapBtn =
    document.querySelector(".roadmap-btn");


if (roadmapBtn) {

    roadmapBtn.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            window.location.href =
                "roadmap.html";
        }
    );
}