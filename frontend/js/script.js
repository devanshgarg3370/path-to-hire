/// ==========================
// Path to Hire - script.js
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // Navbar Shadow on Scroll
    // ==========================

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            navbar.classList.add("shadow", "bg-white");

        } else {

            navbar.classList.remove("shadow");

        }

    });




    // ==========================
    // Smooth Scroll
    // ==========================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });





    // ==========================
    // Animated Counter
    // ==========================

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const update = () => {

            const target = +counter.dataset.target;

            const current = +counter.innerText;

            const increment = target / 120;

            if (current < target) {

                counter.innerText = Math.ceil(current + increment);

                setTimeout(update, 15);

            } else {

                counter.innerText = target;

            }

        };

        update();

    });






    // ==========================
    // Active Navigation Link
    // ==========================

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.forEach(item => item.classList.remove("active"));

            link.classList.add("active");

        });

    });






    // ==========================
    // Page Navigation
    // ==========================

    const pageRoutes = {

        // Landing
        home: "landing.html",

        // Auth
        login: "auth.html",
        signup: "signup.html",

        // Dashboard
        dashboard: "dashboard.html",

        // Features
        resume: "resume.html",
        interview: "mock-interview.html",
        roadmap: "roadmap.html",
        internships: "internships.html",
        profile: "profile.html",
        progress: "progress.html",

        // Other
        forgot: "forgot-password.html"

    };





    // ==========================
    // Login & Get Started Buttons
    // ==========================

    document.querySelectorAll(".btn").forEach(btn => {

        const text = btn.innerText.trim().toLowerCase();

        btn.addEventListener("click", (e) => {

            if (text.includes("login")) {

                e.preventDefault();
                window.location.href = pageRoutes.login;

            }

            if (text.includes("get started")) {

                e.preventDefault();
                window.location.href = pageRoutes.signup;

            }

        });

    });






    // ==========================
    // Scroll To Top Button
    // ==========================

    const topBtn = document.querySelector(".position-fixed");

    if (topBtn) {

        topBtn.style.display = "none";

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                topBtn.style.display = "flex";

            } else {

                topBtn.style.display = "none";

            }

        });

    }







    // ==========================
    // Newsletter Validation
    // ==========================

    const subscribeBtn = document.querySelector(".input-group button");

    if (subscribeBtn) {

        subscribeBtn.addEventListener("click", () => {

            const emailInput = document.querySelector(".input-group input");

            const email = emailInput.value.trim();

            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

            if (email === "") {

                alert("Please enter your email.");

            }

            else if (!emailRegex.test(email)) {

                alert("Enter a valid email address.");

            }

            else {

                alert("🎉 Thank you for subscribing!");

                emailInput.value = "";

            }

        });

    }







    // ==========================
    // Fade Animation
    // ==========================

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: 0.2
    });

    document.querySelectorAll(".card, section").forEach(item => {

        item.classList.add("hidden");

        observer.observe(item);

    });





    // ==========================
    // Quick Access Functions
    // ==========================

    window.openDashboard = () => {
        window.location.href = pageRoutes.dashboard;
    };

    window.openResume = () => {
        window.location.href = pageRoutes.resume;
    };

    window.openInterview = () => {
        window.location.href = pageRoutes.interview;
    };

    window.openRoadmap = () => {
        window.location.href = pageRoutes.roadmap;
    };

    window.openInternships = () => {
        window.location.href = pageRoutes.internships;
    };

    window.openProfile = () => {
        window.location.href = pageRoutes.profile;

        
    };
        
    
});