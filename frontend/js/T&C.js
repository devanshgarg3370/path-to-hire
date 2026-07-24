/* ==========================================
   PATH TO HIRE - TERMS & CONDITIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==============================
       Sticky Header Shadow
    ============================== */

    const header = document.querySelector(".page-header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            header.style.boxShadow = "0 8px 25px rgba(0,0,0,0.12)";
        } else {
            header.style.boxShadow = "0 3px 15px rgba(0,0,0,0.08)";
        }

    });

    /* ==============================
       Active Navigation Link
    ============================== */

    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {

        if (link.href === window.location.href) {
            link.classList.add("active");
        }

    });

    /* ==============================
       Smooth Scroll
    ============================== */

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

    /* ==============================
       Fade In Cards
    ============================== */

    const cards = document.querySelectorAll(".term-card");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    }, {
        threshold: 0.2
    });

    cards.forEach(card => {

        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";
        card.style.transition = "all .6s ease";

        observer.observe(card);

    });

    /* ==============================
       Button Click Animation
    ============================== */

    const btn = document.querySelector(".btn");

    if (btn) {

        btn.addEventListener("click", () => {

            btn.style.transform = "scale(0.95)";

            setTimeout(() => {

                btn.style.transform = "";

            }, 150);

        });

    }

    /* ==============================
       Footer Year Auto Update
    ============================== */

    const footer = document.querySelector("footer p");

    if (footer) {

        footer.innerHTML =
            `© ${new Date().getFullYear()} Path to Hire. All Rights Reserved.`;

    }

});


/* ==========================================
   Back To Top Button
========================================== */

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.id = "topBtn";

document.body.appendChild(topButton);

topButton.style.cssText = `
position:fixed;
right:25px;
bottom:25px;
width:50px;
height:50px;
border:none;
border-radius:50%;
background:#2563eb;
color:white;
font-size:22px;
cursor:pointer;
display:none;
box-shadow:0 10px 25px rgba(0,0,0,.2);
transition:.3s;
z-index:999;
`;

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});

topButton.addEventListener("mouseenter", () => {

    topButton.style.transform = "translateY(-5px)";

});

topButton.addEventListener("mouseleave", () => {

    topButton.style.transform = "translateY(0)";

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});