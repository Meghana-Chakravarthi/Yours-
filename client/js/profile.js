document.addEventListener('DOMContentLoaded', () => {
    const greeting = document.getElementById('greetingText');
    if (greeting) {
        const hour = new Date().getHours();
        const label = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
        greeting.textContent = `${label}, Meghana`;
    }

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
            if (progress < 1) requestAnimationFrame(tick);
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

    const editBtn = document.getElementById('editProfileBtn');
    const editPanel = document.getElementById('editPanel');
    const profileForm = document.getElementById('profileForm');
    const displayName = document.getElementById('displayName');
    const displayMeta = document.getElementById('displayMeta');
    const displayCollege = document.getElementById('displayCollege');
    const displayContact = document.getElementById('displayContact');

    if (editBtn && editPanel) {
        editBtn.addEventListener('click', () => {
            editPanel.classList.toggle('active');
            editBtn.textContent = editPanel.classList.contains('active') ? 'Cancel' : 'Edit Profile';
        });
    }

    if (profileForm) {
        profileForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('nameInput').value.trim();
            const email = document.getElementById('emailInput').value.trim();
            const college = document.getElementById('collegeInput').value.trim();
            const department = document.getElementById('deptInput').value.trim();
            const location = document.getElementById('locationInput').value.trim();
            const contact = document.getElementById('contactInput').value.trim();

            if (displayName) displayName.textContent = name || 'Your Name';
            if (displayMeta) displayMeta.textContent = `${email || 'your@email.com'} • ${department || 'Department'} • ${location || 'Location'}`;
            if (displayCollege) displayCollege.textContent = college || 'Your College';
            if (displayContact) displayContact.textContent = contact || 'Preferred Contact';

            if (editPanel) {
                editPanel.classList.remove('active');
            }
            if (editBtn) {
                editBtn.textContent = 'Edit Profile';
            }
        });
    }
});
