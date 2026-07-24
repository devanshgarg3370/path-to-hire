/* ==========================================
   PATH TO HIRE
   ULTIMATE RESUME GUIDE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       Sticky Header Shadow
    ===================================== */

    const header = document.querySelector(".page-header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            header.style.boxShadow = "0 10px 30px rgba(0,0,0,.12)";

        } else {

            header.style.boxShadow = "0 4px 18px rgba(0,0,0,.08)";

        }

    });

    /* =====================================
       Active Navigation
    ===================================== */

    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {

        if (link.href === window.location.href) {

            link.classList.add("active");

        }

    });

    /* =====================================
       Smooth Scroll
    ===================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                e.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

    /* =====================================
       Scroll Reveal Animation
    ===================================== */

    const elements = document.querySelectorAll(
        ".card, .faq-item, .checklist li, .tips-list li, .skills-grid span"
    );

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    }, {

        threshold: 0.15

    });

    elements.forEach(el => {

        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all .6s ease";

        observer.observe(el);

    });

    /* =====================================
       FAQ Accordion
    ===================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const answer = item.querySelector("p");

        answer.style.display = "none";

        item.addEventListener("click", () => {

            const visible = answer.style.display === "block";

            faqItems.forEach(box => {

                box.querySelector("p").style.display = "none";

            });

            answer.style.display = visible ? "none" : "block";

        });

    });

    /* =====================================
       CTA Button Animation
    ===================================== */

    const ctaBtn = document.querySelector(".cta .btn");

    if (ctaBtn) {

        ctaBtn.addEventListener("mouseenter", () => {

            ctaBtn.style.transform = "translateY(-5px) scale(1.03)";

        });

        ctaBtn.addEventListener("mouseleave", () => {

            ctaBtn.style.transform = "translateY(0)";

        });

    }

    /* =====================================
       Footer Year
    ===================================== */

    const footerText = document.querySelector("footer p");

    if (footerText) {

        footerText.innerHTML =
            `© ${new Date().getFullYear()} Path to Hire. All Rights Reserved.`;

    }

});

/* ==========================================
   Reading Progress Bar
========================================== */

const progressBar = document.createElement("div");

progressBar.id = "progressBar";

document.body.appendChild(progressBar);

progressBar.style.cssText = `
position:fixed;
top:0;
left:0;
height:4px;
width:0%;
background:#2563eb;
z-index:9999;
transition:.15s;
`;

window.addEventListener("scroll", () => {

    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = progress + "%";

});

/* ==========================================
   Back To Top Button
========================================== */

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

topBtn.style.cssText = `
position:fixed;
right:25px;
bottom:25px;
width:55px;
height:55px;
border:none;
border-radius:50%;
background:#2563eb;
color:white;
font-size:22px;
cursor:pointer;
display:none;
box-shadow:0 12px 25px rgba(0,0,0,.18);
transition:.3s;
z-index:999;
`;

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("mouseenter", () => {

    topBtn.style.transform = "translateY(-6px)";

});

topBtn.addEventListener("mouseleave", () => {

    topBtn.style.transform = "translateY(0)";

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});