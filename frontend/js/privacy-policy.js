/* =====================================
   PATH TO HIRE - PRIVACY POLICY JS
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       Reading Progress Bar
    ========================== */

    const progressBar = document.createElement("div");
    progressBar.className = "reading-progress";
    document.body.prepend(progressBar);

    window.addEventListener("scroll", () => {

        const scrollTop = window.scrollY;

        const pageHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            (scrollTop / pageHeight) * 100;

        progressBar.style.width = progress + "%";

    });

    /* ==========================
       Fade In Sections
    ========================== */

    const sections =
        document.querySelectorAll(".policy-section");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: 0.15
    });

    sections.forEach(section => {

        section.classList.add("hidden");

        observer.observe(section);

    });

    /* ==========================
       Back To Top Button
    ========================== */

    const topBtn =
        document.createElement("button");

    topBtn.innerHTML =
        '<i class="fa-solid fa-arrow-up"></i>';

    topBtn.className = "top-btn";

    document.body.appendChild(topBtn);

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            topBtn.classList.add("show");

        } else {

            topBtn.classList.remove("show");

        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    /* ==========================
       Last Updated Date
    ========================== */

    const updateText =
        document.getElementById("lastUpdated");

    if (updateText) {

        const today = new Date();

        updateText.innerHTML =
            "Last Updated: " +
            today.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });

    }

    /* ==========================
       Copy Support Email
    ========================== */

    const copyBtn =
        document.getElementById("copyEmail");

    if (copyBtn) {

        copyBtn.addEventListener("click", () => {

            const email =
                "support@pathtohire.com";

            navigator.clipboard.writeText(email);

            copyBtn.innerHTML =
                '<i class="fa-solid fa-check"></i> Copied';

            setTimeout(() => {

                copyBtn.innerHTML =
                    '<i class="fa-solid fa-copy"></i> Copy Email';

            }, 2000);

        });

    }

    /* ==========================
       Accept Policy Button
    ========================== */

    const acceptBtn =
        document.getElementById("acceptPolicy");

    if (acceptBtn) {

        acceptBtn.addEventListener("click", () => {

            localStorage.setItem(
                "privacyAccepted",
                "true"
            );

            acceptBtn.innerHTML =
                '<i class="fa-solid fa-check"></i> Policy Accepted';

            acceptBtn.disabled = true;

        });

    }

});