document.addEventListener('DOMContentLoaded', () => {
    const trustCards = document.querySelectorAll('.trust-card');
    const revealItems = document.querySelectorAll('.reveal-item');
    const counters = document.querySelectorAll('.counter');
    const cursorGlow = document.getElementById('cursor-glow');

    const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.matches('.community-heroes')) {
                    const progressBars = entry.target.querySelectorAll('.progress-bar');
                    progressBars.forEach(bar => {
                        const fill = bar.querySelector('.progress-bar-fill');
                        const value = Number(bar.dataset.value || 0);
                        if (fill) {
                            fill.style.width = `${value}%`;
                        }
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.18,
    }) : null;

    revealItems.forEach(item => {
        if (revealObserver) {
            revealObserver.observe(item);
        } else {
            item.classList.add('visible');
        }
    });

    const heroHeadline = document.querySelector('.hero-heading');
    if (heroHeadline) {
        const fullText = heroHeadline.textContent.trim();
        heroHeadline.textContent = '';
        const typingSpan = document.createElement('span');
        typingSpan.className = 'typing-line';
        typingSpan.textContent = fullText;
        heroHeadline.appendChild(typingSpan);
    }

    if (revealObserver) {
        trustCards.forEach(card => revealObserver.observe(card));
    } else {
        trustCards.forEach(card => card.classList.add('visible'));
    }

    counters.forEach(counter => {
        const valueText = counter.textContent.match(/\d+/);
        if (!valueText) return;
        const target = parseInt(valueText[0], 10);
        counter.textContent = '0' + counter.textContent.replace(valueText[0], '');
        let current = 0;
        const increment = Math.max(1, Math.floor(target / 30));

        const updateCount = () => {
            current += increment;
            if (current >= target) {
                counter.textContent = counter.textContent.replace(/^0+/, '') .replace('0', target);
            } else {
                counter.textContent = counter.textContent.replace(/^0+/, '') .replace('0', current);
                requestAnimationFrame(updateCount);
            }
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        counterObserver.observe(counter);
    });

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', event => {
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
            button.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });

    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navbar) {
        const updateNavbar = () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        updateNavbar();
        window.addEventListener('scroll', updateNavbar);
    }

    if (mobileToggle && navLinks) {
        const toggleMobileMenu = () => {
            const open = navLinks.classList.toggle('open');
            mobileToggle.classList.toggle('open', open);
            mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        };

        const closeMobileMenu = () => {
            navLinks.classList.remove('open');
            mobileToggle.classList.remove('open');
            mobileToggle.setAttribute('aria-expanded', 'false');
        };

        mobileToggle.addEventListener('click', event => {
            event.stopPropagation();
            toggleMobileMenu();
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) {
                    closeMobileMenu();
                }
                document.querySelectorAll('.nav-links a').forEach(nav => nav.classList.remove('active'));
                link.classList.add('active');
            });
        });

        window.addEventListener('click', event => {
            if (!navLinks.contains(event.target) && !mobileToggle.contains(event.target)) {
                if (navLinks.classList.contains('open')) {
                    closeMobileMenu();
                }
            }
        });
    }

    window.addEventListener('mousemove', event => {
        if (!cursorGlow) return;
        cursorGlow.style.opacity = '1';
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    window.addEventListener('mouseout', () => {
        if (!cursorGlow) return;
        cursorGlow.style.opacity = '0';
    });

    document.documentElement.style.scrollBehavior = 'smooth';
});