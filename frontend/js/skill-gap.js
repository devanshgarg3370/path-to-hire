/* =========================================
   PATH TO HIRE - SKILL GAP ANALYSIS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ELEMENTS
    // ==========================================

    const analyzeBtn =
        document.querySelector(".analyze-btn");

    const results =
        document.getElementById("resultsSection");

    const roadmapBtn =
        document.querySelector(".roadmap-btn");

    const roleSelect =
        document.getElementById("targetRole") ||
        document.querySelector("select");

    const companyInput =
        document.getElementById("targetCompany") ||
        document.querySelector(".input-group input");

    const STORAGE_KEY =
        "skillGapResult";


    // ==========================================
    // SAFETY CHECK
    // ==========================================

    if (!analyzeBtn || !results) {

        console.error(
            "Skill Gap page elements could not be found."
        );

        return;
    }


    // ==========================================
    // COMPANY CHIPS
    // ==========================================

    document
        .querySelectorAll(".company-chips span")
        .forEach((chip) => {

            chip.addEventListener("click", () => {

                if (companyInput) {

                    companyInput.value =
                        chip.innerText.trim();

                }

            });

        });


    // ==========================================
    // RENDER SKILL GAP RESULT
    // ==========================================

    function renderSkillGap(ai) {

        if (!ai) {
            return;
        }


        // ======================================
        // MATCH PERCENTAGE
        // ======================================

        const matchFill =
            document.getElementById("matchFill");

        const matchText =
            document.getElementById("matchText");


        const percentage =
            Number(ai.match_percentage) || 0;


        if (matchFill) {

            matchFill.style.width =
                percentage + "%";

            matchFill.innerText =
                percentage + "%";

        }


        if (matchText) {

            matchText.innerHTML =
                `You currently match approximately <strong>${percentage}%</strong> of the required skills.`;

        }


        // ======================================
        // AI SUMMARY
        // ======================================

        const summary =
            document.getElementById("aiSummary");


        if (summary) {

            summary.innerText =
                ai.role_summary ||
                "No summary available.";

        }


        // ======================================
        // MATCHING SKILLS
        // ======================================

        const skillsChart =
            document.getElementById(
                "skillsChart"
            );


        if (skillsChart) {

            skillsChart.innerHTML = "";


            (ai.key_skills_found || [])
                .forEach((skill) => {

                    const skillElement =
                        document.createElement(
                            "div"
                        );


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

        }


        // ======================================
        // MISSING SKILLS
        // ======================================

        const tbody =
            document.getElementById(
                "missingSkillsBody"
            );


        if (tbody) {

            tbody.innerHTML = "";


            (ai.missing_skills || [])
                .forEach((skill) => {

                    const row =
                        document.createElement(
                            "tr"
                        );


                    row.innerHTML = `
                        <td>
                            ${skill}
                        </td>

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

        }


        // ======================================
        // SHOW RESULTS
        // ======================================

        results.style.display =
            "block";


        // ======================================
        // ANALYSIS COMPLETE BUTTON
        // ======================================

        analyzeBtn.innerHTML =
            '<i class="fa-solid fa-check"></i> Analysis Complete';

        analyzeBtn.style.background =
            "#22c55e";

        analyzeBtn.disabled =
            false;

    }


    // ==========================================
    // RESET PAGE
    // ==========================================

    function resetSkillGapPage() {

        results.style.display =
            "none";


        analyzeBtn.innerHTML =
            '<i class="fa-solid fa-wand-magic-sparkles"></i> Analyze Skill Gap';


        analyzeBtn.style.background =
            "";


        analyzeBtn.disabled =
            false;

    }


    // ==========================================
    // RESTORE RESULT ONLY AFTER ACTUAL REFRESH
    // ==========================================

    const navigationEntries =
        performance.getEntriesByType(
            "navigation"
        );


    const navigationEntry =
        navigationEntries.length > 0
            ? navigationEntries[0]
            : null;


    const isPageRefresh =
        navigationEntry &&
        navigationEntry.type === "reload";


    const savedResult =
        sessionStorage.getItem(
            STORAGE_KEY
        );


    if (
        isPageRefresh &&
        savedResult
    ) {

        try {

            const ai =
                JSON.parse(
                    savedResult
                );


            renderSkillGap(ai);


            console.log(
                "Skill Gap result restored after refresh."
            );

        }

        catch (error) {

            console.error(
                "Failed to restore Skill Gap result:",
                error
            );


            sessionStorage.removeItem(
                STORAGE_KEY
            );


            resetSkillGapPage();

        }

    }

    else {

        /*
            Fresh navigation to this page.

            Remove any previous analysis so an
            old result cannot appear before the
            user selects a role/company.
        */

        sessionStorage.removeItem(
            STORAGE_KEY
        );


        resetSkillGapPage();

    }


    // ==========================================
    // ANALYZE SKILL GAP
    // ==========================================

    analyzeBtn.addEventListener(
        "click",
        async (event) => {

            event.preventDefault();
            event.stopPropagation();


            // ==================================
            // RESUME
            // ==================================

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


            // ==================================
            // TARGET ROLE
            // ==================================

            const targetRole =
                roleSelect
                    ? roleSelect.value.trim()
                    : "";


            if (!targetRole) {

                alert(
                    "Please select a target role."
                );

                if (roleSelect) {
                    roleSelect.focus();
                }

                return;

            }


            // ==================================
            // TARGET COMPANY
            // ==================================

            const company =
                companyInput
                    ? companyInput.value.trim()
                    : "";


            if (!company) {

                alert(
                    "Please select or enter a target company."
                );


                if (companyInput) {
                    companyInput.focus();
                }


                return;

            }


            // ==================================
            // AUTH TOKEN
            // ==================================

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


            // ==================================
            // LOADING STATE
            // ==================================

            analyzeBtn.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Analyzing...';


            analyzeBtn.disabled =
                true;


            analyzeBtn.style.background =
                "";


            try {

                // ==================================
                // API REQUEST
                // ==================================

                const response =
                    await fetch(
                        "http://127.0.0.1:8000/skill-gap-analysis",
                        {

                            method:
                                "POST",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                "Authorization":
                                    `Bearer ${token}`

                            },

                            body:
                                JSON.stringify({

                                    resume_text:
                                        resumeText,

                                    target_role:
                                        targetRole,

                                    company:
                                        company

                                })

                        }
                    );


                // ==================================
                // RESPONSE
                // ==================================

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


                // ==================================
                // SAVE RESULT
                // ==================================

                sessionStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(ai)
                );


                // ==================================
                // RENDER RESULT
                // ==================================

                renderSkillGap(ai);


                results.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "start"

                });

            }

            catch (error) {

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
    // GENERATE ROADMAP
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