// ==========================================
// Dashboard JavaScript (Path to Hire)
// ==========================================

document.addEventListener("DOMContentLoaded", async () => {

    // 1. Time-based Greeting (Good Morning / Afternoon / Evening)
    const greetingElem = document.getElementById("greeting");
    if (greetingElem) {
        const hour = new Date().getHours();
        if (hour < 12) greetingElem.innerText = "Good Morning";
        else if (hour < 18) greetingElem.innerText = "Good Afternoon";
        else greetingElem.innerText = "Good Evening";
    }

    // 2. Load User Profile Name
    const usernameElem = document.getElementById("username");
    const storedUser = localStorage.getItem("userProfile") || localStorage.getItem("userName") || localStorage.getItem("userEmail");
    let nameToDisplay = "Student";

    if (storedUser) {
        try {
            const parsed = JSON.parse(storedUser);
            nameToDisplay = parsed.name || parsed.email?.split("@")[0] || nameToDisplay;
        } catch (e) {
            nameToDisplay = storedUser.split("@")[0];
        }
    }
    if (usernameElem) usernameElem.innerText = nameToDisplay;

    // 3. Load Saved Resume ATS Score (from Local / Session Storage)
    const storedAnalysis = localStorage.getItem("resumeAnalysis") || sessionStorage.getItem("resumeAnalysis");
    let resumeScore = null;

    if (storedAnalysis) {
        try {
            const parsed = JSON.parse(storedAnalysis);
            const analysis = parsed.analysis || parsed;
            
            // Extract candidate name if available
            if (analysis.name && usernameElem) {
                usernameElem.innerText = analysis.name;
            }

            resumeScore = analysis.resume_score || analysis.ats_score || analysis.score;
        } catch (err) {
            console.error("Error parsing analysis data on dashboard:", err);
        }
    }

    const resumeScoreElem = document.getElementById("stat-resume-score");
    if (resumeScoreElem) {
        resumeScoreElem.innerText = resumeScore ? `${resumeScore}%` : "82%";
    }

    // 4. Try fetching live backend stats if API endpoint is active
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:8000/dashboard/", {
            headers: token ? { "Authorization": `Bearer ${token}` } : {}
        });

        if (response.ok) {
            const data = await response.json();
            
            if (data.skill_match) document.getElementById("stat-skill-match").innerText = `${data.skill_match}%`;
            if (data.roadmap_progress) {
                document.getElementById("stat-roadmap").innerText = `${data.roadmap_progress}%`;
                document.getElementById("progress-text").innerText = `${data.roadmap_progress}% Completed`;
                const fill = document.getElementById("progress-fill");
                if (fill) fill.style.width = `${data.roadmap_progress}%`;
            }
            if (data.placement_ready) document.getElementById("stat-placement-ready").innerText = data.placement_ready;
        }
    } catch (e) {
        // Backend dashboard endpoint optional; gracefully falls back to default layout values
        console.log("Using cached local data for dashboard metrics.");
    }

    // 5. Logout Handler
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("userProfile");
            localStorage.removeItem("userName");
            localStorage.removeItem("userEmail");
            
            window.location.href = "login.html";
        });
    }
});