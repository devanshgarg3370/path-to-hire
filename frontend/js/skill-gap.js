/* =========================================
   PATH TO HIRE - SKILL GAP ANALYSIS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const analyzeBtn = document.querySelector(".analyze-btn");
    const results = document.getElementById("resultsSection");
    const roadmapBtn = document.querySelector(".roadmap-btn");

    const roleSelect = document.querySelector("select");
    const companyInput = document.querySelector(".input-group input");

    const STORAGE_KEY = "skillGapResult";


    // ==========================================
    // COMPANY CHIPS
    // ==========================================

    document
        .querySelectorAll(".company-chips span")
        .forEach((chip) => {

            chip.addEventListener("click", () => {
                if (companyInput) {
                    companyInput.value = chip.innerText;
                }
            });

        });


    // ==========================================
    // RENDER RESULT
    // ==========================================

    function renderSkillGap(ai) {

        if (!ai) return;


        // MATCH

        const matchFill =
            document.getElementById("matchFill");

        const matchText =
            document.getElementById("matchText");


        const percentage =
            Number(ai.match_percentage) || 0;


        matchFill.style.width =
            percentage + "%";

        matchFill.innerText =
            percentage + "%";


        matchText.innerHTML =
            `You currently match approximately <strong>${percentage}%</strong> of the required skills.`;


        // SUMMARY

        const summary =
            document.getElementById("aiSummary");

        summary.innerText =
            ai.role_summary || "No summary available.";


        // SKILLS

        const skillsChart =
            document.getElementById("skillsChart");

        skillsChart.innerHTML = "";


        (ai.key_skills_found || [])
            .forEach((skill) => {

                const skillElement =
                    document.createElement("div");

                skillElement.className =
                    "skill";


                skillElement.innerHTML = `
                    <span>${skill}</span>

                    <div class="bar">
                        <div
                            class="fill"
                            style="width: ${percentage}%"
                        ></div>
                    </div>

                    <strong>
                        ${percentage}%
                    </strong>
                `;


                skillsChart.appendChild(
                    skillElement
                );
            });


        // MISSING SKILLS

        const tbody =
            document.getElementById(
                "missingSkillsBody"
            );

        tbody.innerHTML = "";


        (ai.missing_skills || [])
            .forEach((skill) => {

                const row =
                    document.createElement("tr");


                row.innerHTML = `
                    <td>${skill}</td>

                    <td>
                        High
                    </td>

                    <td>
                        2-3 Weeks
                    </td>

                    <td>
                        <span class="badge medium">
                            Medium
                        </span>
                    </td>
                `;


                tbody.appendChild(row);
            });


        // SHOW RESULTS

        results.style.display =
            "block";


        // BUTTON STATE

        analyzeBtn.innerHTML =
            '<i class="fa-solid fa-check"></i> Analysis Complete';

        analyzeBtn.style.background =
            "#22c55e";

        analyzeBtn.disabled =
            false;
    }


    // ==========================================
    // RESTORE RESULT AFTER REFRESH
    // ==========================================

    const savedResult =
        sessionStorage.getItem(STORAGE_KEY);


    if (savedResult) {

        try {

            const ai =
                JSON.parse(savedResult);

            renderSkillGap(ai);

            console.log(
                "Skill Gap result restored."
            );

        } catch (error) {

            console.error(
                "Failed to restore Skill Gap result:",
                error
            );

            sessionStorage.removeItem(
                STORAGE_KEY
            );

            results.style.display =
                "none";
        }

    } else {

        results.style.display =
            "none";
    }


    // ==========================================
    // ANALYZE
    // ==========================================

    analyzeBtn.addEventListener(
        "click",
        async (event) => {

            event.preventDefault();
            event.stopPropagation();


            const resumeText =
                localStorage.getItem(
                    "resumeText"
                );


            if (!resumeText) {

                alert(
                    "Please upload your resume first."
                );

                return;
            }


            const targetRole =
                roleSelect
                    ? roleSelect.value
                    : "";


            const company =
                companyInput
                    ? companyInput.value.trim()
                    : "";


            const token =
                localStorage.getItem(
                    "token"
                );


            if (!token) {

                alert(
                    "Your session has expired. Please login again."
                );

                window.location.href =
                    "login.html";

                return;
            }


            // LOADING STATE

            analyzeBtn.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Analyzing...';

            analyzeBtn.disabled =
                true;

            analyzeBtn.style.background =
                "";


            try {

                const response =
                    await fetch(
                        "http://127.0.0.1:8000/skill-gap-analysis",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                "Authorization":
                                    `Bearer ${token}`
                            },

                            body: JSON.stringify({
                                resume_text:
                                    resumeText,

                                target_role:
                                    targetRole,

                                company:
                                    company
                            })
                        }
                    );


                const data =
                    await response.json();


                console.log(
                    "Skill Gap Response:",
                    data
                );


                if (
                    !response.ok ||
                    !data.success
                ) {

                    throw new Error(
                        data.detail ||
                        data.message ||
                        "Skill Gap Analysis failed."
                    );
                }


                const ai =
                    data.data;


                if (!ai) {

                    throw new Error(
                        "AI response is empty."
                    );
                }


                // SAVE BEFORE RENDERING
                // so refresh cannot destroy the result

                sessionStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(ai)
                );


                renderSkillGap(ai);


                results.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


            } catch (error) {

                console.error(
                    "Skill Gap Error:",
                    error
                );


                alert(
                    error.message ||
                    "Skill Gap Analysis failed."
                );


                analyzeBtn.innerHTML =
                    '<i class="fa-solid fa-wand-magic-sparkles"></i> Analyze Skill Gap';

                analyzeBtn.disabled =
                    false;

                analyzeBtn.style.background =
                    "";

            }

        }
    );


    // ==========================================
    // ROADMAP
    // ==========================================

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

});