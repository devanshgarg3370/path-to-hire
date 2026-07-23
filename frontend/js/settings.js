// ===============================
// PATH TO HIRE SETTINGS PAGE
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // TAB SWITCHING
    // ===============================

    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {

        button.addEventListener("click", () => {

            tabButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            tabContents.forEach(tab =>
                tab.classList.remove("active")
            );

            button.classList.add("active");

            const target = button.dataset.tab;

            document
                .getElementById(target)
                .classList.add("active");

        });

    });


    // ===============================
    // LOAD SAVED USER DATA
    // ===============================

    if (localStorage.getItem("userName")) {

        document.getElementById("name").value =
            localStorage.getItem("userName");

    }

    if (localStorage.getItem("userEmail")) {

        document.getElementById("email").value =
            localStorage.getItem("userEmail");

    }

    document.getElementById("emailNotifications").checked =
        localStorage.getItem("emailNotifications") === "true";

    document.getElementById("jobAlerts").checked =
        localStorage.getItem("jobAlerts") === "true";

    document.getElementById("roadmapReminders").checked =
        localStorage.getItem("roadmapReminders") === "true";



    // ===============================
    // ACCOUNT FORM
    // ===============================

    const accountForm =
        document.getElementById("accountForm");

    accountForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        if (name === "" || email === "") {

            alert("Please fill all fields.");

            return;

        }

        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);

        alert("Account updated successfully.");

    });



    // ===============================
    // SAVE NOTIFICATIONS
    // ===============================

    document
        .getElementById("saveNotifications")
        .addEventListener("click", () => {

            localStorage.setItem(
                "emailNotifications",
                document.getElementById("emailNotifications").checked
            );

            localStorage.setItem(
                "jobAlerts",
                document.getElementById("jobAlerts").checked
            );

            localStorage.setItem(
                "roadmapReminders",
                document.getElementById("roadmapReminders").checked
            );

            alert("Notification preferences saved.");

        });



    // ===============================
    // PASSWORD VALIDATION
    // ===============================

    const passwordForm =
        document.getElementById("passwordForm");

    passwordForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const current =
            document.getElementById("currentPassword").value;

        const password =
            document.getElementById("newPassword").value;

        const confirm =
            document.getElementById("confirmPassword").value;

        if (
            current === "" ||
            password === "" ||
            confirm === ""
        ) {

            alert("Please fill all password fields.");

            return;

        }

        if (password.length < 8) {

            alert(
                "Password must be at least 8 characters."
            );

            return;

        }

        if (password !== confirm) {

            alert("Passwords do not match.");

            return;

        }

        alert("Password updated successfully.");

        passwordForm.reset();

    });



    // ===============================
    // DELETE ACCOUNT
    // ===============================

    document
        .getElementById("deleteAccount")
        .addEventListener("click", () => {

            const confirmDelete = confirm(
                "Are you sure you want to delete your account?\n\nThis action cannot be undone."
            );

            if (confirmDelete) {

                localStorage.clear();

                alert("Account deleted successfully.");

                window.location.href = "landing.html";

            }

        });

});