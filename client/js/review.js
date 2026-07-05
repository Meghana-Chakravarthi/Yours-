const stars = Array.from(document.querySelectorAll('.star'));
const submitBtn = document.getElementById('submitReview');
const skipBtn = document.getElementById('skipReview');
const successState = document.getElementById('successState');
const reviewText = document.getElementById('reviewText');

let selectedRating = 0;

stars.forEach((star) => {
    star.addEventListener('click', () => {
        selectedRating = Number(star.dataset.value);
        stars.forEach((item) => {
            item.classList.toggle('active', Number(item.dataset.value) <= selectedRating);
        });
    });
});

function showSuccess() {
    successState.classList.add('active');
    successState.setAttribute('aria-hidden', 'false');
}

submitBtn.addEventListener('click', () => {
    if (selectedRating === 0) {
        selectedRating = 5;
        stars.forEach((item) => item.classList.add('active'));
    }

    const note = reviewText.value.trim();
    if (!note) {
        reviewText.value = 'The meetup was smooth, professional, and safe.';
    }

    showSuccess();
});

skipBtn.addEventListener('click', () => {
    showSuccess();
});

successState.addEventListener('click', (event) => {
    if (event.target === successState) {
        successState.classList.remove('active');
        successState.setAttribute('aria-hidden', 'true');
    }
});
