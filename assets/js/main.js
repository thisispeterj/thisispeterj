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
    
    // Active navigation tracking
    function updateActiveNavigation() {
        const sections = ['skills', 'projects', 'contact'];
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Remove active class from all nav links (except home)
        navLinks.forEach(link => {
            if (!link.getAttribute('href').includes('/')) {
                link.classList.remove('active');
            }
        });
        
        // Find which section is currently in view
        let currentSection = '';
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Special case: if we're near the bottom of the page, activate contact
        if (scrollPosition + windowHeight >= documentHeight - 100) {
            currentSection = 'contact';
        } else {
            // Check each section
            for (const sectionId of sections) {
                const section = document.getElementById(sectionId);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    const sectionTop = rect.top + window.scrollY;
                    const sectionHeight = section.offsetHeight;
                    
                    // Consider a section active if it's at least 50% visible or we're past its midpoint
                    const sectionMid = sectionTop + (sectionHeight / 2);
                    const viewportMid = scrollPosition + (windowHeight / 2);
                    
                    if (viewportMid >= sectionTop && viewportMid <= sectionTop + sectionHeight) {
                        currentSection = sectionId;
                        break;
                    }
                }
            }
        }
        
        // Add active class to current section's nav link
        if (currentSection) {
            const activeLink = document.querySelector(`.nav-link[href="#${currentSection}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }
    
    // Add active navigation tracking to scroll events
    function handleScrollWithNav() {
        handleScroll();
        updateActiveNavigation();
    }
    
    // Update the scroll event listener
    window.removeEventListener('scroll', requestTick);
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(handleScrollWithNav);
            ticking = true;
            setTimeout(() => { ticking = false; }, 10);
        }
    });
    
    // Run once on load to set initial state
    updateActiveNavigation();
    
    // Handle smooth scrolling with header offset for anchor links
    function handleAnchorClick(e) {
        const href = e.target.getAttribute('href');
        
        // Only handle internal anchor links
        if (href && href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20; // Extra 20px padding
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }
    
    // Add click event listeners to all nav links
    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', handleAnchorClick);
    });
    
    // Blog tag filtering functionality
    function initBlogTagFiltering() {
        const tagButtons = document.querySelectorAll('.tag-button');
        const postCards = document.querySelectorAll('.post-card');
        const categoryTags = document.querySelectorAll('.card-category-tag');
        
        // Handle tag button clicks
        tagButtons.forEach(button => {
            button.addEventListener('click', () => {
                const selectedTag = button.getAttribute('data-tag');
                
                // Update active button
                tagButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter posts
                filterPosts(selectedTag);
            });
        });
        
        // Handle category tag clicks on post cards
        categoryTags.forEach(tag => {
            tag.addEventListener('click', () => {
                const selectedTag = tag.getAttribute('data-tag');
                
                // Update active button
                tagButtons.forEach(btn => btn.classList.remove('active'));
                const matchingButton = document.querySelector(`.tag-button[data-tag="${selectedTag}"]`);
                if (matchingButton) {
                    matchingButton.classList.add('active');
                }
                
                // Filter posts
                filterPosts(selectedTag);
            });
        });
        
        function filterPosts(tag) {
            postCards.forEach(card => {
                if (tag === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardCategories = card.getAttribute('data-categories');
                    if (cardCategories && cardCategories.includes(tag)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        }
    }
    
    // Initialize blog tag filtering if we're on the blog page
    if (document.querySelector('.tag-filter')) {
        initBlogTagFiltering();
    }
});
