document.addEventListener("DOMContentLoaded", () => {
    // Select all logo instances on the page (Header, Footer, etc.)
    const svgLogos = document.querySelectorAll(".logo-icon-svg");
    
    if (svgLogos.length === 0) return;

    // Trigger initial animation with a staggered delay on load
    svgLogos.forEach((svg, index) => {
        setTimeout(() => {
            svg.classList.add("animate");
        }, 400 + (index * 200));
    });
});
