document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const heroElement = document.getElementById('typing-text');

    // Funciones de navegación
    function mobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    function changeHeaderBackground() {
        if (window.scrollY >= 80) {
            header.style.backgroundColor = 'rgba(18, 18, 18, 0.8)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'var(--background)';
            header.style.backdropFilter = 'none';
        }
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    // Event listeners
    hamburger.addEventListener('click', mobileMenu);
    window.addEventListener('scroll', changeHeaderBackground);
    navLinks.forEach(link => link.addEventListener('click', closeMenu));

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Active link highlight
    function highlightActiveLink() {
        let scrollPosition = window.scrollY;

        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveLink);

    // Typing effect
    function typeWriter() {
        if (heroElement) {
            const heroText = "Desarrollador web y Móvil";
            let i = 0;

            function type() {
                if (i < heroText.length) {
                    heroElement.textContent += heroText.charAt(i);
                    i++;
                    setTimeout(type, 100);
                }
            }

            type();
        }
    }

    setTimeout(typeWriter, 1000);

    // Animación de habilidades
    function animateSkills() {
        const skillCards = document.querySelectorAll('.skill-card');

        skillCards.forEach((card, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 200);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(card);
        });
    }

    document.querySelectorAll('.skill-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
    });

    animateSkills();

    // Registro del Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('Service Worker registrado:', registration);
                })
                .catch(error => {
                    console.error('Error registrando el Service Worker:', error);
                });
        });
    }
});
