const ringProgress = document.querySelector('.ring-progress');

if (ringProgress) {
    const radius = 48;
    const circumference = 2 * Math.PI * radius;
    ringProgress.style.strokeDasharray = circumference;
    ringProgress.style.strokeDashoffset = circumference;

    requestAnimationFrame(() => {
        ringProgress.style.strokeDashoffset = circumference - (95 / 100) * circumference;
    });
}
