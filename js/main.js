// Navigation scroll transparency
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.main-header');
    
    if (!header) return;
    
    // Set dynamic copyright year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Function to handle scroll events
    function handleScroll() {
        const scrollPosition = window.scrollY;
        const heroTitle = document.querySelector('.hero__title');
        
        // Calculate when navbar should become visible
        let triggerPoint = 100; // Default fallback
        
        if (heroTitle) {
            // Get the position of the h1 title
            const heroTitleRect = heroTitle.getBoundingClientRect();
            const heroTitleTop = heroTitleRect.top + window.scrollY;
            
            // Trigger when navbar is about to reach the h1 (with some offset for header height)
            triggerPoint = Math.max(heroTitleTop - 80, 100);
        }
        
        // If we've scrolled past the trigger point
        if (scrollPosition > triggerPoint) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Add scroll event listener with throttling for better performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
            setTimeout(() => { ticking = false; }, 10);
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Run once on load to set initial state
    handleScroll();
});
