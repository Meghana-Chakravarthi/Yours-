const greetingText = document.getElementById('greetingText');
const activitySearch = document.getElementById('activitySearch');
const timelineItems = Array.from(document.querySelectorAll('.timeline-item'));
const statValues = Array.from(document.querySelectorAll('.stat-card h2'));

function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Good Morning';

    if (hour >= 12 && hour < 18) {
        greeting = 'Good Afternoon';
    } else if (hour >= 18) {
        greeting = 'Good Evening';
    }

    if (greetingText) {
        greetingText.textContent = `${greeting}, Meghana`;
    }
}

function animateStats() {
    statValues.forEach((value, index) => {
        const target = Number(value.dataset.target || 0);
        const duration = 900 + index * 160;
        let start = 0;

        const step = () => {
            start += Math.ceil(target / 20);
            if (start >= target) {
                value.textContent = target;
                return;
            }
            value.textContent = start;
            requestAnimationFrame(step);
        };

        setTimeout(step, index * 120);
    });
}

function filterActivity() {
    if (!activitySearch) return;

    const query = activitySearch.value.trim().toLowerCase();

    timelineItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'flex' : 'none';
    });
}

if (activitySearch) {
    activitySearch.addEventListener('input', filterActivity);
}

updateGreeting();
animateStats();

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});