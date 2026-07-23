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
// Open File Picker
// ===============================

uploadBox.addEventListener("click", () => {
    fileInput.click();
});

// ===============================
// File Selected
// ===============================

fileInput.addEventListener("change", () => {

    if (fileInput.files.length > 0) {

        handleFile(fileInput.files[0]);

    }

});

// ===============================
// Drag & Drop
// ===============================

uploadBox.addEventListener("dragover", (e) => {

    e.preventDefault();

    uploadBox.classList.add("drag");

});

uploadBox.addEventListener("dragleave", () => {

    uploadBox.classList.remove("drag");

});

uploadBox.addEventListener("drop", (e) => {

    e.preventDefault();

    uploadBox.classList.remove("drag");

    const file = e.dataTransfer.files[0];

    if (file) {

        handleFile(file);

    }

});

// ===============================
// Handle File
// ===============================

function handleFile(file) {

    const allowed = [

        "application/pdf",

        "application/msword",

        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

    ];

    if (!allowed.includes(file.type)) {

        showToast("❌ Upload only PDF, DOC or DOCX");

        return;

    }

    uploadedFile = file;

    emptyState.style.display = "none";

    filePreview.style.display = "flex";

    fileName.innerText = file.name;

    fileSize.innerText =
        (file.size / 1024 / 1024).toFixed(2) + " MB";

    progressBar.style.width = "0%";

    let progress = 0;

    const upload = setInterval(() => {

        progress += 5;

        progressBar.style.width = progress + "%";

        if (progress >= 100) {

            clearInterval(upload);

            showToast("✅ Resume Uploaded Successfully");

        }

    }, 60);

}

// ===============================
// Remove File
// ===============================

removeBtn.addEventListener("click", () => {

    uploadedFile = null;

    fileInput.value = "";

    filePreview.style.display = "none";

    analyzingBox.style.display = "none";

    emptyState.style.display = "block";

    progressBar.style.width = "0%";

    analyzeBtn.disabled = false;

    analyzeBtn.innerHTML =
        '<i class="fa-solid fa-wand-magic-sparkles"></i> Analyze Resume';

});

// ===============================
// Analyze Resume
// ===============================

analyzeBtn.addEventListener("click", () => {

    if (!uploadedFile) {

        showToast("⚠ Please upload your resume first");

        return;

    }

    analyzeBtn.disabled = true;

    analyzeBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Analyzing...';

    analyzingBox.style.display = "block";

    let current = 0;

    const interval = setInterval(() => {

        if (current > 0)

            steps[current - 1].classList.remove("active");

        if (current < steps.length) {

            steps[current].classList.add("active");

            current++;

        }

        else {

            clearInterval(interval);

            analyzeBtn.innerHTML =
                '<i class="fa-solid fa-check"></i> Analysis Complete';

            analyzeBtn.style.background = "#22c55e";

            localStorage.setItem(
                "resumeName",
                uploadedFile.name
            );

            showToast("🎉 Resume Analysis Completed");

            setTimeout(() => {

                window.location.href =
                    "resume-analysis.html";

            }, 1800);

        }

    }, 1500);

});

// ===============================
// Toast Notification
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
        box-shadow:0 10px 25px rgba(0,0,0,.2);
        z-index:9999;
        font-weight:500;
        animation:slide .4s;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 3000);

}

// ===============================
// Animation
// ===============================

const style = document.createElement("style");

style.innerHTML = `

@keyframes slide{

from{

transform:translateX(120px);

opacity:0;

}

to{

transform:translateX(0);

opacity:1;

}

}

`;

document.head.appendChild(style);