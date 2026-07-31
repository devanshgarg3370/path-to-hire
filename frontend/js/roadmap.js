// ==========================================================
// PATH TO HIRE - AI LEARNING ROADMAP
// ==========================================================

const API_BASE = "http://127.0.0.1:8000";


// ==========================================================
// DOM ELEMENTS
// ==========================================================

const progressFill =
    document.querySelector(".progress-fill");

const progressText =
    document.querySelector(".progress-header span");

const board =
    document.querySelector(".kanban-board");

const buttons =
    document.querySelectorAll(".controls button");

const modal =
    document.querySelector(".modal");

const openBtn =
    document.getElementById("openModal");

const modalButtons =
    document.querySelectorAll(".modal-buttons button");

const slider =
    document.querySelector(".modal input[type='range']");

const hourText =
    document.querySelector(".modal strong");

const roadmapResume =
    document.getElementById("roadmapResume");

const roadmapJobDescription =
    document.getElementById("roadmapJobDescription");


// ==========================================================
// SAFE HTML
// ==========================================================

function escapeRoadmapHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


// ==========================================================
// PROGRESS SYSTEM
// ==========================================================

function getRoadmapCheckboxes() {

    return document.querySelectorAll(
        ".task-card input[type='checkbox']"
    );
}


function updateProgress() {

    const checkboxes =
        getRoadmapCheckboxes();

    const total =
        checkboxes.length;

    let completed = 0;


    checkboxes.forEach((box) => {

        if (box.checked) {
            completed++;
        }


        const card =
            box.closest(".task-card");


        if (card) {

            card.classList.toggle(
                "completed",
                box.checked
            );
        }

    });


    const percent =
        total > 0
            ? Math.round(
                (completed / total) * 100
            )
            : 0;


    if (progressFill) {

        progressFill.style.width =
            percent + "%";
    }


    if (progressText) {

        progressText.innerText =
            percent + "%";
    }


    localStorage.setItem(
        "roadmapProgress",
        percent
    );


    localStorage.setItem(
        "roadmapChecks",
        JSON.stringify(
            [...checkboxes].map(
                box => box.checked
            )
        )
    );
}


// ==========================================================
// SETUP CHECKBOX EVENTS
// ==========================================================

function setupRoadmapProgress(
    restoreSaved = false
) {

    const checkboxes =
        getRoadmapCheckboxes();


    if (restoreSaved) {

        try {

            const savedChecks =
                JSON.parse(
                    localStorage.getItem(
                        "roadmapChecks"
                    )
                );


            if (Array.isArray(savedChecks)) {

                checkboxes.forEach(
                    (box, index) => {

                        box.checked =
                            Boolean(
                                savedChecks[index]
                            );

                    }
                );
            }

        } catch (error) {

            console.warn(
                "Unable to restore roadmap progress:",
                error
            );
        }
    }


    checkboxes.forEach((box) => {

        box.addEventListener(
            "change",
            updateProgress
        );

    });


    updateProgress();
}


// ==========================================================
// INITIAL PAGE LOAD
// ==========================================================

window.addEventListener(
    "load",
    () => {

        setupRoadmapProgress(true);

    }
);


// ==========================================================
// WEEKLY / LIST VIEW
// ==========================================================

buttons.forEach((btn) => {

    btn.addEventListener(
        "click",
        () => {

            buttons.forEach(
                b => b.classList.remove("active")
            );


            btn.classList.add("active");


            if (!board) {
                return;
            }


            if (
                btn.innerText.includes("List")
            ) {

                board.style.display =
                    "flex";

                board.style.flexDirection =
                    "column";

            } else {

                board.style.display =
                    "grid";

                board.style.flexDirection =
                    "";

                board.style.gridTemplateColumns =
                    "repeat(4, 1fr)";
            }

        }
    );

});


// ==========================================================
// MODAL
// ==========================================================

if (openBtn && modal) {

    openBtn.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            modal.classList.add(
                "active"
            );

        }
    );

}


// ==========================================================
// CANCEL MODAL
// ==========================================================

if (
    modalButtons.length >= 1 &&
    modal
) {

    modalButtons[0].addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            modal.classList.remove(
                "active"
            );

        }
    );

}


// ==========================================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ==========================================================

window.addEventListener(
    "click",
    (event) => {

        if (
            modal &&
            event.target === modal
        ) {

            modal.classList.remove(
                "active"
            );
        }

    }
);


// ==========================================================
// HOURS SLIDER
// ==========================================================

if (slider && hourText) {

    slider.addEventListener(
        "input",
        () => {

            hourText.innerText =
                slider.value +
                " Hours";

        }
    );

}


// ==========================================================
// API ERROR HELPER
// ==========================================================

function getRoadmapError(data) {

    if (!data) {

        return "Roadmap generation failed.";
    }


    if (
        typeof data.detail === "string"
    ) {

        return data.detail;
    }


    if (
        Array.isArray(data.detail)
    ) {

        return data.detail
            .map(
                item =>
                    item.msg ||
                    "Invalid request."
            )
            .join("\n");
    }


    if (
        typeof data.message === "string"
    ) {

        return data.message;
    }


    return "Roadmap generation failed.";
}


// ==========================================================
// RENDER AI ROADMAP
// ==========================================================

function renderRoadmap(result) {

    if (!board) {

        throw new Error(
            "Roadmap board was not found."
        );
    }


    if (
        !result ||
        !Array.isArray(result.weeks) ||
        result.weeks.length === 0
    ) {

        console.error(
            "Invalid roadmap result:",
            result
        );


        throw new Error(
            "AI returned an invalid roadmap structure."
        );
    }


    const weeksHTML =
        result.weeks
            .map((week, index) => {

                const tasks =
                    Array.isArray(week.tasks)
                        ? week.tasks
                        : [];


                const tasksHTML =
                    tasks
                        .map((task) => {

                            const hours =
                                Number(
                                    task.hours
                                ) || 0;


                            let icon =
                                "fa-solid fa-graduation-cap";


                            const type =
                                String(
                                    task.type || ""
                                ).toLowerCase();


                            if (
                                type.includes("video")
                            ) {

                                icon =
                                    "fab fa-youtube";

                            } else if (
                                type.includes(
                                    "documentation"
                                )
                            ) {

                                icon =
                                    "fa-solid fa-book";

                            } else if (
                                type.includes(
                                    "project"
                                )
                            ) {

                                icon =
                                    "fa-solid fa-laptop-code";

                            } else if (
                                type.includes(
                                    "practice"
                                )
                            ) {

                                icon =
                                    "fa-solid fa-code";

                            }


                            return `

                                <div class="task-card">

                                    <div class="task-top">

                                        <input
                                            type="checkbox"
                                            class="roadmap-task"
                                        >

                                        <h4>
                                            ${escapeRoadmapHTML(
                                                task.title ||
                                                "Learning Task"
                                            )}
                                        </h4>

                                    </div>


                                    <p>

                                        <i class="${icon}"></i>

                                        ${escapeRoadmapHTML(
                                            task.type ||
                                            "Learning"
                                        )}

                                    </p>


                                    <small>

                                        ${hours}
                                        ${hours === 1
                                            ? "Hour"
                                            : "Hours"}

                                    </small>


                                    ${
                                        task.description
                                            ? `
                                                <p
                                                    style="
                                                        margin-top:10px;
                                                        font-size:13px;
                                                        opacity:.8;
                                                    "
                                                >
                                                    ${escapeRoadmapHTML(
                                                        task.description
                                                    )}
                                                </p>
                                            `
                                            : ""
                                    }

                                </div>

                            `;

                        })
                        .join("");


                return `

                    <div class="week-column">

                        <h2>

                            Week ${
                                Number(
                                    week.week
                                ) ||
                                index + 1
                            }

                        </h2>


                        <span>

                            ${escapeRoadmapHTML(
                                week.focus ||
                                "Skill Development"
                            )}

                        </span>


                        ${tasksHTML}

                    </div>

                `;

            })
            .join("");


    board.innerHTML =
        weeksHTML;


    // Reset old progress because this
    // is a newly generated roadmap.

    localStorage.removeItem(
        "roadmapChecks"
    );

    localStorage.removeItem(
        "roadmapProgress"
    );


    // Attach events to new checkboxes.

    setupRoadmapProgress(false);


    console.log(
        "AI Roadmap rendered successfully."
    );


    // Scroll to generated roadmap.

    board.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// ==========================================================
// GENERATE REAL AI ROADMAP
// ==========================================================

if (modalButtons.length >= 2) {

    const generateBtn =
        modalButtons[1];


    generateBtn.addEventListener(
        "click",
        async (event) => {

            event.preventDefault();


            // ==============================================
            // INPUTS
            // ==============================================

            const file =
                roadmapResume?.files?.[0];


            const jobDescription =
                roadmapJobDescription
                    ?.value
                    ?.trim();


            const token =
                localStorage.getItem(
                    "token"
                );


            // ==============================================
            // VALIDATION
            // ==============================================

            if (!file) {

                alert(
                    "Please upload your resume PDF first."
                );


                if (modal) {

                    modal.classList.remove(
                        "active"
                    );
                }


                return;
            }


            if (
                file.type !==
                    "application/pdf" &&
                !file.name
                    .toLowerCase()
                    .endsWith(".pdf")
            ) {

                alert(
                    "Only PDF resumes are supported."
                );

                return;
            }


            if (!jobDescription) {

                alert(
                    "Please paste the target job description."
                );


                if (modal) {

                    modal.classList.remove(
                        "active"
                    );
                }


                return;
            }


            if (!token) {

                alert(
                    "Your login session was not found. Please log in again."
                );


                window.location.href =
                    "login.html";


                return;
            }


            // ==============================================
            // FORM DATA
            // ==============================================

            const formData =
                new FormData();


            formData.append(
                "job_description",
                jobDescription
            );


            formData.append(
                "file",
                file
            );


            const originalHTML =
                generateBtn.innerHTML;


            // ==============================================
            // LOADING STATE
            // ==============================================

            generateBtn.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';


            generateBtn.disabled =
                true;


            try {

                console.log(
                    "Generating AI Learning Roadmap..."
                );


                // ==========================================
                // API REQUEST
                // ==========================================

                const response =
                    await fetch(
                        `${API_BASE}/learning-roadmap`,
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
                    "Roadmap HTTP Status:",
                    response.status
                );


                // ==========================================
                // PARSE RESPONSE
                // ==========================================

                let data;


                try {

                    data =
                        await response.json();

                } catch (error) {

                    console.error(
                        "Roadmap JSON parse error:",
                        error
                    );


                    throw new Error(
                        `Server returned an invalid response (${response.status}).`
                    );
                }


                console.log(
                    "Learning Roadmap API Response:",
                    data
                );


                // ==========================================
                // HTTP ERRORS
                // ==========================================

                if (!response.ok) {

                    if (
                        response.status === 401 ||
                        response.status === 403
                    ) {

                        throw new Error(
                            "Your session has expired. Please log in again."
                        );
                    }


                    throw new Error(
                        getRoadmapError(data)
                    );
                }


                // ==========================================
                // API VALIDATION
                // ==========================================

                if (!data.success) {

                    throw new Error(
                        data.message ||
                        "Roadmap generation failed."
                    );
                }


                if (!data.data) {

                    throw new Error(
                        "Server returned success but no roadmap data."
                    );
                }


                // ==========================================
                // RENDER REAL GEMINI ROADMAP
                // ==========================================

                renderRoadmap(
                    data.data
                );


                // ==========================================
                // SUCCESS
                // ==========================================

                generateBtn.innerHTML =
                    '<i class="fa-solid fa-check"></i> Generated';


                if (modal) {

                    modal.classList.remove(
                        "active"
                    );
                }


                showToast(
                    "✅ AI Roadmap Generated Successfully!"
                );


            } catch (error) {

                console.error(
                    "ROADMAP ERROR:",
                    error
                );


                alert(
                    error.message ||
                    "Unable to generate roadmap."
                );


                generateBtn.innerHTML =
                    originalHTML;


            } finally {

                generateBtn.disabled =
                    false;

            }

        }
    );

}


// ==========================================================
// TOAST NOTIFICATION
// ==========================================================

function showToast(message) {

    const toast =
        document.createElement(
            "div"
        );


    toast.innerText =
        message;


    toast.style.cssText = `

        position: fixed;

        top: 30px;

        right: 30px;

        background: #2563eb;

        color: #fff;

        padding: 15px 25px;

        border-radius: 12px;

        font-size: 15px;

        box-shadow:
            0 10px 30px rgba(0,0,0,.2);

        z-index: 9999;

        animation: slide .4s;

    `;


    document.body.appendChild(
        toast
    );


    setTimeout(
        () => {

            toast.remove();

        },
        3000
    );

}


// ==========================================================
// TOAST ANIMATION
// ==========================================================

const style =
    document.createElement(
        "style"
    );


style.innerHTML = `

@keyframes slide {

    from {

        opacity: 0;

        transform:
            translateX(100px);

    }

    to {

        opacity: 1;

        transform:
            translateX(0);

    }

}

`;


document.head.appendChild(
    style
);