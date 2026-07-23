/* ===========================================
        PATH TO HIRE - CAREER TIPS JS
=========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===========================================
                HEADER SHADOW
    =========================================== */

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            header.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";

        } else {

            header.style.boxShadow = "none";

        }

    });


    /* ===========================================
            SMOOTH SCROLL FOR LINKS
    =========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* ===========================================
            ACTIVE NAVIGATION
    =========================================== */

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".header nav a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            if (window.scrollY >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === "#" + current) {

                link.classList.add("active");

            }

        });

    });


    /* ===========================================
            FADE IN ANIMATION
    =========================================== */

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: 0.15
    });

    document.querySelectorAll(
        ".topic-card,.why-grid div,.nav-grid a,.newsletter,.hero-content,.hero-image"
    ).forEach(item => {

        item.classList.add("hidden");

        observer.observe(item);

    });


    /* ===========================================
            CATEGORY TAGS
    =========================================== */

    document.querySelectorAll(".category-tags span").forEach(tag => {

        tag.addEventListener("click", () => {

            document.querySelectorAll(".category-tags span").forEach(t => {

                t.classList.remove("selected");

            });

            tag.classList.add("selected");

            showToast("Showing articles for " + tag.innerText);

        });

    });


    /* ===========================================
            NEWSLETTER
    =========================================== */

    const form = document.querySelector(".newsletter form");

    if (form) {

        form.addEventListener("submit", (e) => {

            e.preventDefault();

            const email = form.querySelector("input");

            const value = email.value.trim();

            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (value === "") {

                showToast("Please enter your email.", "error");
                email.focus();
                return;

            }

            if (!regex.test(value)) {

                showToast("Enter a valid email address.", "error");
                email.focus();
                return;

            }

            showToast("🎉 Successfully subscribed!");

            form.reset();

        });

    }


    /* ===========================================
            TOPIC CARD EFFECT
    =========================================== */

    document.querySelectorAll(".topic-card").forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-12px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0px)";

        });

    });


    /* ===========================================
            BUTTON RIPPLE EFFECT
    =========================================== */

    document.querySelectorAll(".primary-btn,.secondary-btn").forEach(btn => {

        btn.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            ripple.className = "ripple";

            const rect = this.getBoundingClientRect();

            ripple.style.left = e.clientX - rect.left + "px";
            ripple.style.top = e.clientY - rect.top + "px";

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });


    /* ===========================================
            TOAST FUNCTION
    =========================================== */

    function showToast(message, type = "success") {

        const toast = document.createElement("div");

        toast.className = "toast";

        toast.innerHTML = message;

        toast.style.position = "fixed";
        toast.style.bottom = "30px";
        toast.style.right = "30px";
        toast.style.padding = "15px 25px";
        toast.style.borderRadius = "12px";
        toast.style.color = "#fff";
        toast.style.fontWeight = "600";
        toast.style.zIndex = "99999";
        toast.style.opacity = "0";
        toast.style.transition = ".35s";

        toast.style.background =
            type === "error"
                ? "#ef4444"
                : "#2563eb";

        document.body.appendChild(toast);

        setTimeout(() => {

            toast.style.opacity = "1";

        }, 100);

        setTimeout(() => {

            toast.style.opacity = "0";

            setTimeout(() => {

                toast.remove();

            }, 400);

        }, 3000);

    }

});