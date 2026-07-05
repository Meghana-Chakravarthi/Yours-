document.addEventListener('DOMContentLoaded', () => {
    const currentUserRaw = localStorage.getItem('currentUser');

    if (!currentUserRaw) {
        window.location.href = 'login.html';
        return;
    }

    let currentUser = null;

    try {
        currentUser = JSON.parse(currentUserRaw);
    } catch (error) {
        window.location.href = 'login.html';
        return;
    }

    if (!currentUser || typeof currentUser !== 'object') {
        window.location.href = 'login.html';
        return;
    }

    const getDisplayValue = (value, fallback = 'Not Available') => {
        if (value === null || value === undefined || value === '') {
            return fallback;
        }
        return String(value);
    };

    const createAvatar = (name) => {
        const initials = (name || 'U')
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part.charAt(0).toUpperCase())
            .join('') || 'U';

        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
                <rect width="160" height="160" rx="80" fill="#6366f1"/>
                <circle cx="80" cy="66" r="34" fill="rgba(255,255,255,0.24)"/>
                <path d="M40 132c10-24 30-36 40-36s30 12 40 36" fill="rgba(255,255,255,0.24)"/>
                <text x="80" y="152" font-family="Poppins, sans-serif" font-size="34" text-anchor="middle" fill="#ffffff">${initials}</text>
            </svg>`;

        return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    };

    const populateProfile = (user) => {
        const fullName = getDisplayValue(user.fullName || user.name || user.full_name);
        const email = getDisplayValue(user.email);
        const college = getDisplayValue(user.college);
        const karma = user.karma === null || user.karma === undefined || user.karma === '' ? 'Not Available' : user.karma;
        const recoveries = user.recoveries === null || user.recoveries === undefined || user.recoveries === '' ? 'Not Available' : user.recoveries;
        const contact = getDisplayValue(user.contact || user.preferredContact || user.phone);

        const greeting = document.getElementById('greetingText');
        if (greeting) {
            const hour = new Date().getHours();
            const label = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
            greeting.textContent = `${label}, ${fullName}`;
        }

        const displayName = document.getElementById('displayName');
        const displayMeta = document.getElementById('displayMeta');
        const displayCollege = document.getElementById('displayCollege');
        const displayContact = document.getElementById('displayContact');
        const nameInput = document.getElementById('nameInput');
        const emailInput = document.getElementById('emailInput');
        const collegeInput = document.getElementById('collegeInput');
        const contactInput = document.getElementById('contactInput');

        if (displayName) {
            displayName.textContent = fullName;
        }

        if (displayMeta) {
            displayMeta.textContent = `${email} • ${college}`;
        }

        if (displayCollege) {
            displayCollege.textContent = college;
        }

        if (displayContact) {
            displayContact.textContent = contact;
        }

        if (nameInput) {
            nameInput.value = fullName;
        }

        if (emailInput) {
            emailInput.value = email;
        }

        if (collegeInput) {
            collegeInput.value = college;
        }

        if (contactInput) {
            contactInput.value = contact;
        }

        const profileImages = document.querySelectorAll('.profile-photo-wrap img, .profile-pill img');
        const avatarSrc = user.profileImage || user.avatar || createAvatar(fullName);
        profileImages.forEach((img) => {
            img.src = avatarSrc;
            img.alt = fullName;
        });

        const statCards = Array.from(document.querySelectorAll('.stat-card'));
        const karmaCard = statCards.find((card) => card.querySelector('.stat-label')?.textContent.includes('Karma'));
        const recoveriesCard = statCards.find((card) => card.querySelector('.stat-label')?.textContent.includes('Items Returned'));

        if (karmaCard) {
            const valueEl = karmaCard.querySelector('.stat-number');
            if (valueEl) {
                valueEl.dataset.target = karma === 'Not Available' ? '0' : String(karma);
                valueEl.textContent = '0';
            }
        }

        if (recoveriesCard) {
            const valueEl = recoveriesCard.querySelector('.stat-number');
            if (valueEl) {
                valueEl.dataset.target = recoveries === 'Not Available' ? '0' : String(recoveries);
                valueEl.textContent = '0';
            }
        }
    };

    const counters = document.querySelectorAll('.stat-number');
    const animateValue = (element) => {
        const target = Number(element.dataset.target || 0);
        const suffix = element.textContent.includes('%') ? '%' : '';
        const duration = 900;
        const startTime = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const current = Math.floor(progress * target);
            element.textContent = `${current}${suffix}`;
            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        };

        requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach((counter) => observer.observe(counter));

    populateProfile(currentUser);

    const editBtn = document.getElementById('editProfileBtn');
    const editPanel = document.getElementById('editPanel');
    const profileForm = document.getElementById('profileForm');

    if (editBtn && editPanel) {
        editBtn.addEventListener('click', () => {
            editPanel.classList.toggle('active');
            editBtn.textContent = editPanel.classList.contains('active') ? 'Cancel' : 'Edit Profile';
        });
    }

    if (profileForm) {
        profileForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('nameInput')?.value.trim() || '';
            const email = document.getElementById('emailInput')?.value.trim() || '';
            const college = document.getElementById('collegeInput')?.value.trim() || '';
            const contact = document.getElementById('contactInput')?.value.trim() || '';

            currentUser.fullName = name || 'Not Available';
            currentUser.email = email || 'Not Available';
            currentUser.college = college || 'Not Available';
            currentUser.contact = contact || 'Not Available';

            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            populateProfile(currentUser);

            if (editPanel) {
                editPanel.classList.remove('active');
            }
            if (editBtn) {
                editBtn.textContent = 'Edit Profile';
            }
        });
    }
});
