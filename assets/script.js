// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const primaryNav = document.querySelector('.primary-nav');
    const header = document.querySelector('.site-header');

    // Mobile menu toggle
    if (menuToggle && primaryNav) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            primaryNav.classList.toggle('active');
            
            // Update aria-expanded
            const isExpanded = primaryNav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking on navigation links
        const navLinks = primaryNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                primaryNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!primaryNav.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                primaryNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Header scroll effect
    let lastScrollY = window.scrollY;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Handle empty hash or just "#"
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger skill bar animations
                if (entry.target.classList.contains('skill-progress')) {
                    const progress = entry.target.getAttribute('data-progress') || '0';
                    entry.target.style.width = progress + '%';
                }
                
                // Stagger animation for child elements
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 150);
                });
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.animate-fade-in-up, .animate-slide-in-left, .animate-slide-in-right, .animate-zoom-in, .card, .role, .skill-group, .contact-item');
    animateElements.forEach((el, index) => {
        // Set initial state based on animation class
        if (el.classList.contains('animate-slide-in-left')) {
            el.style.opacity = '0';
            el.style.transform = 'translateX(-50px) scale(0.9)';
        } else if (el.classList.contains('animate-slide-in-right')) {
            el.style.opacity = '0';
            el.style.transform = 'translateX(50px) scale(0.9)';
        } else if (el.classList.contains('animate-zoom-in')) {
            el.style.opacity = '0';
            el.style.transform = 'scale(0.5) rotate(-10deg)';
        } else {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px) scale(0.9)';
        }
        
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // Add staggered delay
        if (el.classList.contains('animate-delay-1')) {
            el.style.transitionDelay = '0.1s';
        } else if (el.classList.contains('animate-delay-2')) {
            el.style.transitionDelay = '0.2s';
        } else if (el.classList.contains('animate-delay-3')) {
            el.style.transitionDelay = '0.3s';
        } else if (el.classList.contains('animate-delay-4')) {
            el.style.transitionDelay = '0.4s';
        }
        
        observer.observe(el);
    });

    // Removed problematic parallax effect to fix overlapping issues

    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid white';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Remove any loading states
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(el => el.classList.remove('loading'));
    });

    // Enhanced hover effects for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 15px 35px rgba(139, 92, 246, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
    });

    // Year update for footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Add ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});