document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', mobileMenu);
    window.addEventListener('scroll', changeHeaderBackground);
    navLinks.forEach(link => link.addEventListener('click', closeMenu));

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
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Typing effect for hero section
    const heroText = "Desarrollador web y Móvil";
    const heroElement = document.getElementById('typing-text');
    let i = 0;

    function typeWriter() {
        if (i < heroText.length) {
            heroElement.textContent += heroText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    setTimeout(typeWriter, 1000);

    // Project and Service image carousel
    const carouselContainers = document.querySelectorAll('.project-card, .service-card');
    carouselContainers.forEach(container => {
        const images = container.querySelectorAll('.project-images img, .service-images img');
        let currentIndex = 0;

        function showNextImage() {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }

        setInterval(showNextImage, 5000);
    });

    // Contact section interactivity
    const contactItems = document.querySelectorAll('.contact-item');

    contactItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });

        item.addEventListener('click', (e) => {
            if (item.getAttribute('href').startsWith('mailto:')) {
                e.preventDefault();
                navigator.clipboard.writeText(item.getAttribute('href').replace('mailto:', ''))
                    .then(() => {
                        alert('Email copiado al portapapeles');
                    })
                    .catch(err => {
                        console.error('Error al copiar el email: ', err);
                    });
            }
        });
    });

    // Animación de las habilidades
    const skillCards = document.querySelectorAll('.skill-card');
    const skillSection = document.querySelector('#skills');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function animateSkills() {
        skillCards.forEach((card, index) => {
            if (isElementInViewport(card)) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    animateProgressBar(card);
                }, index * 200);
            }
        });
    }

    function animateProgressBar(card) {
        const progress = card.querySelector('.skill-progress');
        const level = card.dataset.level;
        progress.style.background = `conic-gradient(var(--primary) ${level * 3.6}deg, transparent 0deg)`;
    }

    // Inicialmente, ocultar las tarjetas de habilidades
    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
    });

    // Animar las habilidades cuando la sección esté en el viewport
    window.addEventListener('scroll', animateSkills);
    window.addEventListener('resize', animateSkills);
    animateSkills(); // Llamar una vez al cargar la página
});

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}