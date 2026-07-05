const countdownEl = document.getElementById('countdown');
const qrWrapper = document.getElementById('qrWrapper');
const refreshQrBtn = document.getElementById('refreshQr');
const cancelVerificationBtn = document.getElementById('cancelVerification');
const demoVerifyBtn = document.getElementById('demoVerify');
const completeReturnBtn = document.getElementById('completeReturn');
const statusText = document.getElementById('statusText');
const statusHeadline = document.getElementById('statusHeadline');
const statusTextSecondary = document.getElementById('statusTextSecondary');
const statusBox = document.querySelector('.status-box');
const successModal = document.getElementById('successModal');

let timeLeft = 5 * 60;
let timer;

function formatTime(seconds) {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
}

function updateCountdown() {
    countdownEl.textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
        clearInterval(timer);
        countdownEl.textContent = '00:00';
        statusText.textContent = 'Verification Expired';
        statusHeadline.textContent = 'Verification Expired';
        statusTextSecondary.textContent = 'The QR code has expired. Refresh it to continue.';
    }
}

function startCountdown() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft -= 1;
        updateCountdown();
    }, 1000);
}

function animateQrRefresh() {
    qrWrapper.classList.remove('refreshing');
    void qrWrapper.offsetWidth;
    qrWrapper.classList.add('refreshing');
}

function resetVerificationState() {
    timeLeft = 5 * 60;
    updateCountdown();
    statusText.textContent = 'Waiting for QR Scan...';
    statusHeadline.textContent = 'Waiting for QR Scan...';
    statusTextSecondary.textContent = 'The verification will complete once the finder scans the code.';
    statusBox.classList.remove('success');
    statusBox.querySelector('.status-icon').textContent = '⏳';
}

refreshQrBtn.addEventListener('click', () => {
    animateQrRefresh();
    resetVerificationState();
    startCountdown();
});

cancelVerificationBtn.addEventListener('click', () => {
    clearInterval(timer);
    countdownEl.textContent = '05:00';
    statusText.textContent = 'Verification Cancelled';
    statusHeadline.textContent = 'Verification Cancelled';
    statusTextSecondary.textContent = 'The handover verification was cancelled.';
    statusBox.classList.remove('success');
    statusBox.querySelector('.status-icon').textContent = '✕';
});

demoVerifyBtn.addEventListener('click', () => {
    statusText.textContent = 'Verification Successful ✅';
    statusHeadline.textContent = 'Verification Successful ✅';
    statusTextSecondary.textContent = 'The QR scan was confirmed and the handover is secure.';
    statusBox.classList.add('success');
    statusBox.querySelector('.status-icon').textContent = '✓';
    successModal.classList.add('active');
    successModal.setAttribute('aria-hidden', 'false');
    clearInterval(timer);
});

completeReturnBtn.addEventListener('click', () => {
    successModal.classList.add('active');
    successModal.setAttribute('aria-hidden', 'false');
});

successModal.addEventListener('click', (event) => {
    if (event.target === successModal) {
        successModal.classList.remove('active');
        successModal.setAttribute('aria-hidden', 'true');
    }
});

resetVerificationState();
startCountdown();
