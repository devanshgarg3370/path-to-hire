// ================================
// Path to Hire - Roadmap JS
// ================================

// Progress Bar
const progressFill = document.querySelector(".progress-fill");
const progressText = document.querySelector(".progress-header span");

const checkboxes = document.querySelectorAll(".task-card input");

function updateProgress() {

    const total = checkboxes.length;
    let completed = 0;

    checkboxes.forEach(box => {

        if (box.checked) completed++;

        box.closest(".task-card").classList.toggle("completed", box.checked);

    });

    const percent = Math.round((completed / total) * 100);

    progressFill.style.width = percent + "%";
    progressText.innerText = percent + "%";

    localStorage.setItem("roadmapProgress", percent);
    localStorage.setItem("roadmapChecks",
        JSON.stringify(
            [...checkboxes].map(box => box.checked)
        )
    );
}

// Restore Saved Progress
window.addEventListener("load", () => {

    const savedChecks = JSON.parse(localStorage.getItem("roadmapChecks"));

    if (savedChecks) {

        checkboxes.forEach((box, i) => {

            box.checked = savedChecks[i];

        });

    }

    updateProgress();

});

// Checkbox Change
checkboxes.forEach(box => {

    box.addEventListener("change", updateProgress);

});

// ================================
// Weekly / List View
// ================================

const buttons = document.querySelectorAll(".controls button");
const board = document.querySelector(".kanban-board");

buttons.forEach(btn => {

    btn.addEventListener("click", () => {

        buttons.forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        if (btn.innerText.includes("List")) {

            board.style.display = "flex";
            board.style.flexDirection = "column";

        }

        else {

            board.style.display = "grid";
            board.style.gridTemplateColumns = "repeat(4,1fr)";

        }

    });

});

// ================================
// Modal
// ================================

const modal = document.querySelector(".modal");

const openBtn = document.getElementById("openModal");

const modalButtons = document.querySelectorAll(".modal-buttons button");

openBtn.addEventListener("click", () => {

    modal.classList.add("active");

});

// Cancel
modalButtons[0].addEventListener("click", () => {

    modal.classList.remove("active");

});

// Close Outside
window.addEventListener("click", e => {

    if (e.target === modal) {

        modal.classList.remove("active");

    }

});

// ================================
// Hours Slider
// ================================

const slider = document.querySelector(".modal input");

const hourText = document.querySelector(".modal strong");

slider.addEventListener("input", () => {

    hourText.innerText = slider.value + " Hours";

});

// ================================
// Generate Roadmap
// ================================

modalButtons[1].addEventListener("click", () => {

    modalButtons[1].innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';

    setTimeout(() => {

        modalButtons[1].innerHTML =
            '<i class="fa-solid fa-check"></i> Generated';

        modal.classList.remove("active");

        showToast("✅ New Roadmap Generated Successfully!");

    }, 2000);

});

// ================================
// Toast Notification
// ================================

function showToast(message) {

    const toast = document.createElement("div");

    toast.innerText = message;

    toast.style.cssText = `
        position:fixed;
        top:30px;
        right:30px;
        background:#2563eb;
        color:#fff;
        padding:15px 25px;
        border-radius:12px;
        font-size:15px;
        box-shadow:0 10px 30px rgba(0,0,0,.2);
        z-index:9999;
        animation:slide .4s;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 3000);

}

// ================================
// Animation
// ================================

const style = document.createElement("style");

style.innerHTML = `
@keyframes slide{
from{
opacity:0;
transform:translateX(100px);
}
to{
opacity:1;
transform:translateX(0);
}
}
`;

document.head.appendChild(style);