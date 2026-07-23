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

analyzeBtn.addEventListener("click", () => {

    analyzeBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Analyzing...';

    analyzeBtn.disabled = true;

    setTimeout(() => {

        analyzeBtn.innerHTML =
            '<i class="fa-solid fa-check"></i> Analysis Complete';

        analyzeBtn.style.background = "#22c55e";

        // Show Results
        results.style.display = "block";

        // Scroll to Results
        results.scrollIntoView({
            behavior: "smooth"
        });

        // Animate Overall Progress
        document.querySelector(".match-fill").style.width = "78%";

        // Animate Skill Bars
        document.querySelectorAll(".fill").forEach(bar => {
            bar.style.width = bar.dataset.width + "%";
        });

    },2500);

});
// Generate Roadmap

document.querySelector(".roadmap-btn").addEventListener("click",()=>{

window.location.href="roadmap.html";

});