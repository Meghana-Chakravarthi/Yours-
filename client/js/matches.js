const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const matchFilter = document.getElementById('matchFilter');
const cards = Array.from(document.querySelectorAll('.match-card'));
const bars = Array.from(document.querySelectorAll('.progress span'));

function applyFilters() {
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    const category = categoryFilter ? categoryFilter.value : '';
    const matchValue = matchFilter ? matchFilter.value : '';

    cards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        const cardCategory = card.dataset.category || '';
        const score = Number(card.dataset.score || 0);

        const matchesQuery = text.includes(query);
        const matchesCategory = !category || cardCategory === category;
        const matchesScore = !matchValue || (matchValue === 'high' && score >= 90) || (matchValue === 'mid' && score >= 70 && score < 90) || (matchValue === 'low' && score < 70);

        card.style.display = matchesQuery && matchesCategory && matchesScore ? 'grid' : 'none';
    });
}

if (searchInput) searchInput.addEventListener('input', applyFilters);
if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
if (matchFilter) matchFilter.addEventListener('change', applyFilters);

window.addEventListener('load', () => {
    bars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.dataset.width || '90';
            bar.style.width = `${width}%`;
        }, 120 + index * 120);
    });
});
