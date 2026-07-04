document.addEventListener('DOMContentLoaded', () => {
    const trustCards = document.querySelectorAll('.trust-card');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.15,
        });

        trustCards.forEach(card => observer.observe(card));
    } else {
        trustCards.forEach(card => card.classList.add('visible'));
    }
});