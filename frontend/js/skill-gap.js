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

    const STORAGE_KEY = "skillGapResult";


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
    // SAFE HTML
    // ==========================================

    function escapeHTML(value) {

        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }


    // ==========================================
    // SAFE PERCENTAGE
    // ==========================================

    function normalizePercentage(value) {

        const number = Number(value);

        if (!Number.isFinite(number)) {
            return 0;
        }

        return Math.max(
            0,
            Math.min(100, Math.round(number))
        );
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
    // DIFFICULTY BADGE CLASS
    // ==========================================

    function getDifficultyClass(difficulty) {

        const value =
            String(difficulty || "")
                .trim()
                .toLowerCase();

        if (value === "easy") {
            return "easy";
        }

        if (value === "hard") {
            return "hard";
        }

        return "medium";
    }


    // ==========================================
    // NORMALIZE MATCHED SKILL
    // ==========================================
    // Supports BOTH:
    //
    // OLD:
    // "Python"
    //
    // NEW:
    // {
    //     skill: "Python",
    //     match_percentage: 85
    // }
    //
    // This keeps old stored/API results from
    // breaking the page.
    // ==========================================

    function normalizeMatchedSkill(
        item,
        overallPercentage
    ) {

        if (
            typeof item === "string"
        ) {

            return {
                skill: item,
                match_percentage:
                    overallPercentage
            };
        }


        if (
            item &&
            typeof item === "object"
        ) {

            return {

                skill:
                    item.skill ||
                    item.name ||
                    "Unknown Skill",

                match_percentage:
                    normalizePercentage(
                        item.match_percentage ??
                        item.percentage ??
                        overallPercentage
                    )
            };
        }


        return {
            skill: "Unknown Skill",
            match_percentage:
                overallPercentage
        };
    }


    // ==========================================
    // NORMALIZE MISSING SKILL
    // ==========================================
    // Supports old string results as fallback.
    // New Gemini responses should provide all
    // four dynamic properties.
    // ==========================================

    function normalizeMissingSkill(item) {

        if (
            typeof item === "string"
        ) {

            return {
                skill: item,
                priority: "Not specified",
                learning_time: "Not specified",
                difficulty: "Not specified"
            };
        }


        if (
            item &&
            typeof item === "object"
        ) {

            return {

                skill:
                    item.skill ||
                    item.name ||
                    "Unknown Skill",

                priority:
                    item.priority ||
                    "Not specified",

                learning_time:
                    item.learning_time ||
                    item.learningTime ||
                    "Not specified",

                difficulty:
                    item.difficulty ||
                    "Not specified"
            };
        }


        return {
            skill: "Unknown Skill",
            priority: "Not specified",
            learning_time: "Not specified",
            difficulty: "Not specified"
        };
    }


    // ==========================================
    // RENDER SKILL GAP RESULT
    // ==========================================

    function renderSkillGap(ai) {

        if (
            !ai ||
            typeof ai !== "object"
        ) {

            console.error(
                "Invalid Skill Gap result:",
                ai
            );

            return;
        }


        // ======================================
        // OVERALL MATCH
        // ======================================

        const matchFill =
            document.getElementById(
                "matchFill"
            );

        const matchText =
            document.getElementById(
                "matchText"
            );


        const percentage =
            normalizePercentage(
                ai.match_percentage
            );


        if (matchFill) {

            matchFill.style.width =
                `${percentage}%`;

            matchFill.innerText =
                `${percentage}%`;
        }


        if (matchText) {

            matchText.innerHTML =
                `You currently match approximately <strong>${percentage}%</strong> of the required skills.`;
        }


        // ======================================
        // AI SUMMARY
        // ======================================

        const summary =
            document.getElementById(
                "aiSummary"
            );


        if (summary) {

            summary.innerText =
                ai.role_summary ||
                "No summary available.";
        }


        // ======================================
        // MATCHED SKILLS
        // ======================================

        const skillsChart =
            document.getElementById(
                "skillsChart"
            );


        if (skillsChart) {

            skillsChart.innerHTML = "";


            const matchedSkills =
                Array.isArray(
                    ai.key_skills_found
                )
                    ? ai.key_skills_found
                    : [];


            if (matchedSkills.length === 0) {

                skillsChart.innerHTML = `
                    <p>
                        No matching skills were identified.
                    </p>
                `;
            }


            matchedSkills.forEach(
                (item) => {

                    const skill =
                        normalizeMatchedSkill(
                            item,
                            percentage
                        );


                    const skillPercentage =
                        normalizePercentage(
                            skill.match_percentage
                        );


                    const skillElement =
                        document.createElement(
                            "div"
                        );


                    skillElement.className =
                        "skill";


                    skillElement.innerHTML = `
                        <span>
                            ${escapeHTML(
                                skill.skill
                            )}
                        </span>

                        <div class="bar">

                            <div
                                class="fill"
                                style="width: ${skillPercentage}%"
                            ></div>

                        </div>

                        <strong>
                            ${skillPercentage}%
                        </strong>
                    `;


                    skillsChart.appendChild(
                        skillElement
                    );
                }
            );
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


            const missingSkills =
                Array.isArray(
                    ai.missing_skills
                )
                    ? ai.missing_skills
                    : [];


            if (missingSkills.length === 0) {

                const row =
                    document.createElement(
                        "tr"
                    );


                row.innerHTML = `
                    <td colspan="4">
                        No major missing skills identified.
                    </td>
                `;


                tbody.appendChild(row);
            }


            missingSkills.forEach(
                (item) => {

                    const skill =
                        normalizeMissingSkill(
                            item
                        );


                    const row =
                        document.createElement(
                            "tr"
                        );


                    const difficultyClass =
                        getDifficultyClass(
                            skill.difficulty
                        );


                    row.innerHTML = `
                        <td>
                            ${escapeHTML(
                                skill.skill
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                skill.priority
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                skill.learning_time
                            )}
                        </td>

                        <td>
                            <span
                                class="badge ${difficultyClass}"
                            >
                                ${escapeHTML(
                                    skill.difficulty
                                )}
                            </span>
                        </td>
                    `;


                    tbody.appendChild(
                        row
                    );
                }
            );
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
    // RESTORE ONLY AFTER ACTUAL REFRESH
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
            Fresh navigation should NEVER show
            an old Skill Gap analysis.
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

                let data;


                try {

                    data =
                        await response.json();

                }

                catch (error) {

                    throw new Error(
                        "Server returned an invalid response."
                    );
                }


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


                if (
                    !ai ||
                    typeof ai !== "object"
                ) {

                    throw new Error(
                        "AI response is empty or invalid."
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
// GENERATE ROADMAP FROM SKILL GAP
// ==========================================

if (roadmapBtn) {

    roadmapBtn.addEventListener(
        "click",
        (event) => {

            event.preventDefault();


            const savedResult =
                sessionStorage.getItem(
                    STORAGE_KEY
                );


            if (!savedResult) {

                alert(
                    "Please complete the Skill Gap Analysis first."
                );

                return;
            }


            let skillGap;


            try {

                skillGap =
                    JSON.parse(
                        savedResult
                    );

            } catch (error) {

                console.error(
                    "Unable to read Skill Gap result:",
                    error
                );


                alert(
                    "Skill Gap data is invalid. Please analyze again."
                );

                return;
            }


            const targetRole =
                roleSelect
                    ? roleSelect.value.trim()
                    : "";


            const company =
                companyInput
                    ? companyInput.value.trim()
                    : "";


            // Build context for Roadmap page

            const roadmapContext = {

                source:
                    "skill-gap",

                target_role:
                    targetRole,

                company:
                    company,

                match_percentage:
                    skillGap.match_percentage || 0,

                key_skills_found:
                    skillGap.key_skills_found || [],

                missing_skills:
                    skillGap.missing_skills || [],

                role_summary:
                    skillGap.role_summary || ""

            };


            sessionStorage.setItem(
                "roadmapContext",
                JSON.stringify(
                    roadmapContext
                )
            );


            window.location.href =
                "roadmap.html";
        }
    );
}})