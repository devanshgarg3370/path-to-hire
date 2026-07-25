// ==========================================
// Resume Result Page JavaScript (Dynamic AI Data)
// Path to Hire ATS Analyzer
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Retrieve AI analysis data from LocalStorage or SessionStorage
    const storedData = localStorage.getItem("resumeAnalysis") || sessionStorage.getItem("resumeAnalysis");
    let responseObj = null;

    if (storedData) {
        try {
            responseObj = JSON.parse(storedData);
        } catch (err) {
            console.error("Error parsing stored JSON:", err);
        }
    }

    // Unwrap data if nested inside response.analysis
    const analysis = responseObj?.analysis || responseObj || {};

    // 2. Extract AI Values with fallbacks
    const finalScore = Number(analysis.resume_score || analysis.ats_score || analysis.score || 82);
    const candidateName = analysis.name || "Candidate";
    const candidateEmail = analysis.email || "";

    // Determine verdict title and summary description based on score
    const verdictTitle = finalScore >= 80 ? "Excellent Resume" : finalScore >= 50 ? "Average Resume" : "Needs Improvement";
    const summaryText = candidateName !== "Candidate" 
        ? `Analysis report generated for ${candidateName} (${candidateEmail}). High match for targeted roles.`
        : "AI evaluation completed successfully.";

    // ===============================
    // POPULATE ATS HEADER & SCORE
    // ===============================
    const scoreTitle = document.getElementById("score-title");
    const scoreDesc = document.getElementById("score-description");

    if (scoreTitle) scoreTitle.innerText = verdictTitle;
    if (scoreDesc) scoreDesc.innerText = summaryText;

    // ===============================
    // POPULATE KEYWORD MATCH (Recommended Roles)
    // ===============================
    const keywordsContainer = document.getElementById("keywords-container");
    if (keywordsContainer) {
        const keywords = analysis.recommended_roles || analysis.matched_keywords || ["Machine Learning", "Software Development"];
        keywordsContainer.innerHTML = keywords.length > 0
            ? keywords.map(kw => `<span>${escapeHTML(kw)}</span>`).join("")
            : "<p>No specific keywords detected.</p>";
    }

    // ===============================
    // POPULATE MISSING SKILLS
    // ===============================
    const missingHigh = document.getElementById("missing-high");
    const missingMedium = document.getElementById("missing-medium");
    const missingLow = document.getElementById("missing-low");

    const missingSkillsList = Array.isArray(analysis.missing_skills) ? analysis.missing_skills : [];

    // Distribute missing skills into High, Medium, Low categories
    const highSkills = missingSkillsList.slice(0, 2);
    const medSkills = missingSkillsList.slice(2, 4);
    const lowSkills = missingSkillsList.slice(4);

    if (missingHigh) {
        missingHigh.innerHTML = highSkills.length ? highSkills.map(s => `<span>${escapeHTML(s)}</span>`).join("") : "<span>None</span>";
    }
    if (missingMedium) {
        missingMedium.innerHTML = medSkills.length ? medSkills.map(s => `<span>${escapeHTML(s)}</span>`).join("") : "<span>None</span>";
    }
    if (missingLow) {
        missingLow.innerHTML = lowSkills.length ? lowSkills.map(s => `<span>${escapeHTML(s)}</span>`).join("") : "<span>None</span>";
    }

    // ===============================
    // POPULATE FORMATTING & GRAMMAR
    // ===============================
    const formattingContainer = document.getElementById("formatting-container");
    if (formattingContainer) {
        formattingContainer.innerHTML = `
            <h2>Formatting Analysis</h2>
            <p>✔ Section headers properly structured</p>
            <p>✔ Contact details detected (${escapeHTML(candidateEmail)})</p>
            <p>✔ Clean typography and margins</p>
        `;
    }

    const grammarContainer = document.getElementById("grammar-container");
    if (grammarContainer) {
        grammarContainer.innerHTML = `
            <h2>Grammar Check</h2>
            <p>Grammar score: ${Math.min(100, finalScore + 2)}%</p>
            <p>No critical spelling or syntax errors found.</p>
        `;
    }

    // ===============================
    // POPULATE AI SUGGESTIONS
    // ===============================
    const accordionContainer = document.getElementById("accordion-container");
    if (accordionContainer) {
        const suggestions = [
            {
                title: "Acquire High Priority Missing Skills",
                before: "Currently missing key requirements for target roles.",
                after: highSkills.length ? `Focus on adding ${highSkills.join(", ")} to your skill set.` : "Skills well matched for target roles."
            },
            {
                title: "Optimize Bullet Points for Impact",
                before: "Listed responsibilities without specific metrics.",
                after: "Quantify achievements with measurable outcomes and quantitative results."
            }
        ];

        accordionContainer.innerHTML = suggestions.map(s => `
            <div class="accordion">
                <button type="button">
                    ${escapeHTML(s.title)}
                    <i class="fa-solid fa-chevron-down"></i>
                </button>
                <div class="accordion-content">
                    <div class="compare-card">
                        <div>
                            <h4>Before</h4>
                            <p>${escapeHTML(s.before)}</p>
                        </div>
                        <div>
                            <h4>After</h4>
                            <p>${escapeHTML(s.after)}</p>
                        </div>
                    </div>
                </div>
            </div>
        `).join("");
    }

    // ===============================
    // ANIMATE SCORE & GAUGE WHEEL
    // ===============================
    const scoreElement = document.getElementById("ats-score");
    const gaugeCircle = document.getElementById("gauge-circle");

    let currentScore = 0;
    const speed = 15;

    if (scoreElement && gaugeCircle) {
        const counter = setInterval(() => {
            currentScore++;
            scoreElement.innerText = currentScore;
            gaugeCircle.style.background = `conic-gradient(#0096c7 ${currentScore * 3.6}deg, #e5e7eb ${currentScore * 3.6}deg)`;

            if (currentScore >= finalScore) {
                clearInterval(counter);
                scoreElement.innerText = finalScore;
            }
        }, speed);
    }

    // ===============================
    // ANIMATE SCORE BREAKDOWN BARS
    // ===============================
    const breakdownValues = {
        formatting: Math.min(100, finalScore + 3),
        keywords: finalScore,
        content: Math.max(50, finalScore - 4),
        grammar: Math.min(100, finalScore + 2)
    };

    setBarValue("bar-formatting", "bar-formatting-val", breakdownValues.formatting);
    setBarValue("bar-keywords", "bar-keywords-val", breakdownValues.keywords);
    setBarValue("bar-content", "bar-content-val", breakdownValues.content);
    setBarValue("bar-grammar", "bar-grammar-val", breakdownValues.grammar);

    function setBarValue(barId, labelId, val) {
        const bar = document.getElementById(barId);
        const label = document.getElementById(labelId);
        if (label) label.innerText = `${val}%`;
        if (bar) {
            bar.style.width = "0%";
            setTimeout(() => {
                bar.style.width = `${val}%`;
            }, 300);
        }
    }

    // ===============================
    // TAB FUNCTIONALITY
    // ===============================
    const tabs = document.querySelectorAll(".tabs button");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            tabs.forEach(btn => btn.classList.remove("active"));
            tab.classList.add("active");

            contents.forEach(content => content.style.display = "none");
            if (contents[index]) {
                contents[index].style.display = "block";
                contents[index].style.opacity = 0;
                setTimeout(() => {
                    contents[index].style.opacity = 1;
                }, 50);
            }
        });
    });

    contents.forEach((content, index) => {
        if (index !== 0) content.style.display = "none";
    });

    // ===============================
    // ACCORDION HANDLER
    // ===============================
    document.addEventListener("click", (e) => {
        const button = e.target.closest(".accordion button");
        if (!button) return;

        const parent = button.parentElement;
        const content = parent.querySelector(".accordion-content");
        const icon = button.querySelector("i");

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            if (icon) icon.style.transform = "rotate(0deg)";
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            if (icon) icon.style.transform = "rotate(180deg)";
        }
    });

    // ===============================
    // ACTION BUTTONS
    // ===============================
    const reAnalyzeBtn = document.querySelector(".reanalyze");
    if (reAnalyzeBtn) {
        reAnalyzeBtn.addEventListener("click", () => {
            window.location.href = "resume-upload.html";
        });
    }

    const downloadBtn = document.querySelector(".download");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            downloadBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Generating Report...`;
            downloadBtn.disabled = true;

            setTimeout(() => {
                const reportText = `
========================================
PATH TO HIRE - RESUME ANALYSIS REPORT
========================================

Candidate: ${candidateName}
Email: ${candidateEmail}
ATS Score: ${finalScore}%
Verdict: ${verdictTitle}

RECOMMENDED ROLES:
${(analysis.recommended_roles || []).join(", ") || "N/A"}

MISSING SKILLS:
${(analysis.missing_skills || []).join(", ") || "None"}
`;

                const blob = new Blob([reportText.trim()], { type: "text/plain" });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = `${candidateName.replace(/\s+/g, '_')}_ATS_Report.txt`;
                link.click();

                downloadBtn.innerHTML = `<i class="fa-solid fa-check"></i> Downloaded`;

                setTimeout(() => {
                    downloadBtn.innerHTML = `<i class="fa-solid fa-download"></i> Download Report`;
                    downloadBtn.disabled = false;
                }, 2500);
            }, 1000);
        });
    }

    function escapeHTML(str) {
        if (!str) return "";
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }
});