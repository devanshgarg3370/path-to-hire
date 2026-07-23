/* ==========================================
            PATH TO HIRE BLOG JS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
            LIVE SEARCH
    ===================================== */

    const searchInput = document.querySelector(".search-box input");
    const articles = document.querySelectorAll(".article-card");

    if (searchInput) {

        searchInput.addEventListener("keyup", () => {

            const value = searchInput.value.toLowerCase();

            articles.forEach(article => {

                const text = article.innerText.toLowerCase();

                article.style.display =
                    text.includes(value) ? "block" : "none";

            });

        });

    }

    /* =====================================
            TAG FILTER
    ===================================== */

    const tags = document.querySelectorAll(".tags span");

    tags.forEach(tag => {

        tag.addEventListener("click", () => {

            if (searchInput) {

                searchInput.value = tag.innerText.replace("#", "");

                searchInput.dispatchEvent(new Event("keyup"));

            }

        });

    });

    /* =====================================
            READ ARTICLE BUTTON
    ===================================== */

    const readButtons = document.querySelectorAll(".article-meta a");

    readButtons.forEach(btn => {

        btn.addEventListener("click", (e) => {

            e.preventDefault();

            showToast("Opening article...");

        });

    });

    /* =====================================
            NEWSLETTER
    ===================================== */

    const newsletterForm = document.querySelector(".newsletter form");

    if (newsletterForm) {

        newsletterForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const email =
                newsletterForm.querySelector("input").value.trim();

            const regex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!regex.test(email)) {

                showToast("Please enter a valid email.", false);

                return;

            }

            showToast("Subscribed Successfully!");

            newsletterForm.reset();

        });

    }

    /* =====================================
            SCROLL REVEAL
    ===================================== */

    const revealItems = document.querySelectorAll(

        ".article-card,.category-card,.feature-card,.newsletter,.trending,.popular-tags"

    );

    function reveal() {

        revealItems.forEach(item => {

            const top = item.getBoundingClientRect().top;

            if (top < window.innerHeight - 80) {

                item.classList.add("show");

            }

        });

    }

    reveal();

    window.addEventListener("scroll", reveal);

    /* =====================================
            NAVBAR SHADOW
    ===================================== */

    const navbar = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.style.boxShadow =
                "0 10px 25px rgba(0,0,0,.12)";

        } else {

            navbar.style.boxShadow = "none";

        }

    });

    /* =====================================
            BACK TO TOP BUTTON
    ===================================== */

    const topBtn = document.createElement("button");

    topBtn.id = "topBtn";

    topBtn.innerHTML =
        '<i class="fa-solid fa-arrow-up"></i>';

    document.body.appendChild(topBtn);

    window.addEventListener("scroll", () => {

        topBtn.style.display =
            window.scrollY > 400 ? "block" : "none";

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    /* =====================================
            ARTICLE CARD ANIMATION
    ===================================== */

    articles.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-10px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0px)";

        });

    });

});

/* ==========================================
            TOAST MESSAGE
========================================== */

function showToast(message, success = true) {

    const toast = document.createElement("div");

    toast.innerText = message;

    toast.style.position = "fixed";

    toast.style.bottom = "30px";

    toast.style.right = "30px";

    toast.style.padding = "15px 25px";

    toast.style.background =
        success ? "#2563eb" : "#ef4444";

    toast.style.color = "#fff";

    toast.style.borderRadius = "10px";

    toast.style.fontWeight = "600";

    toast.style.boxShadow =
        "0 10px 25px rgba(0,0,0,.15)";

    toast.style.zIndex = "99999";

    toast.style.opacity = "0";

    toast.style.transition = ".4s";

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.style.opacity = "1";

    }, 100);

    setTimeout(() => {

        toast.style.opacity = "0";

        setTimeout(() => {

            toast.remove();

        }, 400);

    }, 2500);

}

/* ==========================================
        SMOOTH SCROLL FOR LINKS
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target =
            document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});