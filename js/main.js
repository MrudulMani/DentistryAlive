document.addEventListener("DOMContentLoaded", () => {
    // 1. Dynamic Injection of Floating WhatsApp Logo
    injectWhatsAppButton();

    // 2. Mobile Menu Navigation Logic
    initMobileNav();

    // 3. Header Scroll Effect
    initHeaderScroll();

    // 4. Highlight Active Navigation Links
    highlightActiveLink();

    // 5. Scroll Reveal Animations
    initScrollReveal();
});

function injectWhatsAppButton() {
    if (document.querySelector(".whatsapp-float")) return; // Avoid duplicate load
    
    const waFloat = document.createElement("a");
    waFloat.className = "whatsapp-float";
    // Target contact phone number with predefined message
    const defaultMsg = encodeURIComponent("Hello! I am visiting the Dentistry Alive website and would like to learn more about booking a consultation.");
    waFloat.href = `https://wa.me/918088783348?text=${defaultMsg}`;
    waFloat.target = "_blank";
    waFloat.rel = "noopener noreferrer";
    waFloat.setAttribute("aria-label", "Chat with Dentistry Alive on WhatsApp");
    waFloat.innerHTML = `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
    `;
    document.body.appendChild(waFloat);
}

function initMobileNav() {
    const hamburger = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");
    
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        
        // Prevent body scrolling when mobile menu is open
        if (navMenu.classList.contains("active")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    });

    // Close mobile menu on clicking any navigation link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            document.body.style.overflow = "";
        });
    });
}

function initHeaderScroll() {
    const header = document.getElementById("header");
    if (!header) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-link");
    
    let matched = false;
    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href");
        if (currentPath.endsWith(linkPath) || (currentPath === "/" && linkPath === "index.html")) {
            link.classList.add("active");
            matched = true;
        } else {
            link.classList.remove("active");
        }
    });

    // Fallback: If no match (e.g. main domain root directory), default index.html as active
    if (!matched && navLinks.length > 0) {
        navLinks[0].classList.add("active");
    }
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal");
    
    if (revealElements.length === 0) return;

    // Apply staggered transition delays for grid items automatically
    revealElements.forEach(el => {
        const parentGrid = el.closest(".grid-3, .grid-2");
        if (parentGrid) {
            const siblings = Array.from(parentGrid.querySelectorAll(".reveal"));
            const idx = siblings.indexOf(el);
            if (idx !== -1) {
                el.style.transitionDelay = `${idx * 0.25}s`;
            }
        }
    });

    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.05
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}
