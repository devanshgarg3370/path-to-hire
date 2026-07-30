// ==========================================
// Resume Upload + AI Analysis
// ==========================================

const API_BASE = "http://127.0.0.1:8000";

// ===============================
// Elements
// ===============================

const uploadBox = document.getElementById("uploadBox");
const fileInput = document.getElementById("resumeFile");

const filePreview = document.getElementById("filePreview");
const fileName = document.getElementById("fileName");
const fileSize = document.getElementById("fileSize");

const removeBtn = document.querySelector(".remove-btn");
const progressBar = document.querySelector(".progress-bar");

const emptyState = document.getElementById("emptyState");

const analyzingBox = document.getElementById("analyzingBox");
const analyzeBtn = document.querySelector(".analyze-btn");

const steps = document.querySelectorAll(".step");

let uploadedFile = null;

// ===============================
// Upload Box
// ===============================

uploadBox.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
    if (fileInput.files.length) {
        handleFile(fileInput.files[0]);
    }
});

uploadBox.addEventListener("dragover", e => {
    e.preventDefault();
    uploadBox.classList.add("drag");
});

uploadBox.addEventListener("dragleave", () => {
    uploadBox.classList.remove("drag");
});

uploadBox.addEventListener("drop", e => {

    e.preventDefault();

    uploadBox.classList.remove("drag");

    if (e.dataTransfer.files.length) {
        handleFile(e.dataTransfer.files[0]);
    }
});

// ===============================
// Handle File
// ===============================

function handleFile(file) {

    if (file.type !== "application/pdf") {
        showToast("❌ Please upload a PDF");
        return;
    }

    uploadedFile = file;

    emptyState.style.display = "none";
    filePreview.style.display = "flex";

    fileName.innerText = file.name;
    fileSize.innerText =
        (file.size / 1024 / 1024).toFixed(2) + " MB";

    let progress = 0;

    const timer = setInterval(() => {

        progress += 10;

        progressBar.style.width = progress + "%";

        if (progress >= 100) {
            clearInterval(timer);
        }

    }, 50);

}

// ===============================
// Remove
// ===============================

removeBtn.addEventListener("click", () => {

    uploadedFile = null;

    fileInput.value = "";

    filePreview.style.display = "none";

    emptyState.style.display = "block";

    progressBar.style.width = "0%";

});

// ===============================
// Analyze Resume
// ===============================

analyzeBtn.addEventListener("click", async () => {

    console.log("Analyze button clicked");

    if (!uploadedFile) {

        showToast("Upload a resume first");

        return;

    }

    const token = localStorage.getItem("token");

    if (!token) {

        showToast("Please login again");

        window.location.href = "login.html";

        return;

    }

    analyzeBtn.disabled = true;

    analyzeBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Analyzing...';

    analyzingBox.style.display = "block";

    steps.forEach(step => step.classList.remove("active"));

    const formData = new FormData();

    formData.append("file", uploadedFile);

    try {

        for (let i = 0; i < steps.length; i++) {

            steps[i].classList.add("active");

            await new Promise(resolve => setTimeout(resolve, 500));

        }
        const response = await fetch(
            `${API_BASE}/resume-analysis`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            }
        );
        const data = await response.json();
       
       if (!response.ok) {
           throw new Error(data.detail || "Analysis failed");
        }

        localStorage.setItem(
            "resumeAnalysis",
            JSON.stringify(data)
        );

        if (data.resume_text) {
          localStorage.setItem(
          "resumeText",
          data.resume_text
        );}

        localStorage.setItem(
            "resumeName",
            uploadedFile.name
        );

        showToast("✅ AI Analysis Complete");

        window.location.href = "dashboard.html";

    }

    catch (err) {

        console.error(err);

        showToast(err.message);

        analyzeBtn.disabled = false;

        analyzeBtn.innerHTML =
            '<i class="fa-solid fa-wand-magic-sparkles"></i> Analyze Resume';

    }

});

// ===============================
// Toast
// ===============================

function showToast(message) {

    const toast = document.createElement("div");

    toast.innerText = message;

    toast.style.cssText = `
        position:fixed;
        top:25px;
        right:25px;
        background:#2563eb;
        color:white;
        padding:15px 25px;
        border-radius:10px;
        z-index:9999;
        font-weight:500;
        box-shadow:0 10px 20px rgba(0,0,0,.2);
    `;

    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);

}