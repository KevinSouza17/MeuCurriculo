// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Theme Switcher
    const themeSwitcher = document.querySelector('.theme-switcher');
    const body = document.body;
    
    themeSwitcher.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        document.querySelector('.theme-switcher .fa-moon').classList.toggle('active');
        document.querySelector('.theme-switcher .fa-sun').classList.toggle('active');
    });

    // Typed.js Effect
    const typed = new Typed('.typed-text', {
        strings: ['Desenvolvedor Full Stack', 'UX/UI Designer', 'Gerente de Projetos', 'Especialista em Marketing Digital'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        showCursor: true
    });

    // Tab Navigation
    const navLinks = document.querySelectorAll('.sticky-nav a');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and contents
            navLinks.forEach(navLink => {
                navLink.parentElement.classList.remove('active');
            });
            
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked link and corresponding content
            this.parentElement.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }
    
    // Animate circle stats
    const statCircles = document.querySelectorAll('.stat-circle');
    
    function animateStats() {
        statCircles.forEach(circle => {
            const value = circle.getAttribute('data-value');
            const fill = circle.querySelector('.circle-fill');
            const number = circle.querySelector('.stat-number');
            
            let start = 0;
            const end = parseInt(value);
            const duration = 1500;
            const increment = end / (duration / 16);
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    start = end;
                    clearInterval(timer);
                }
                
                fill.style.strokeDasharray = start + ', 100';
                number.textContent = Math.floor(start) + '%';
            }, 16);
        });
    }
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skills-column')) {
                    animateSkillBars();
                } else if (entry.target.classList.contains('about-stats')) {
                    animateStats();
                }
            }
        });
    }, { threshold: 0.5 });
    
    // Observe sections that trigger animations
    const skillsSection = document.querySelector('.skills-column');
    const statsSection = document.querySelector('.about-stats');
    
    if (skillsSection) observer.observe(skillsSection);
    if (statsSection) observer.observe(statsSection);

    // Current year for footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Filter portfolio items
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('data-tab')) return; // Skip tab links
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});