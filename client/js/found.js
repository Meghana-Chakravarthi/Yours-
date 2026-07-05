const form = document.getElementById('foundForm');
const uploadBox = document.getElementById('uploadBox');
const fileInput = document.getElementById('imageInput');
const previewList = document.getElementById('previewList');
const modal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModal');
const dashboardBtn = document.getElementById('goDashboard');
const anotherBtn = document.getElementById('reportAnother');
let selectedFiles = [];

function clearErrors() {
    document.querySelectorAll('.error').forEach((el) => {
        el.textContent = '';
    });
}

function showError(fieldId, message) {
    const error = document.querySelector(`[data-error="${fieldId}"]`);
    if (error) {
        error.textContent = message;
    }
}

function renderPreview() {
    previewList.innerHTML = '';

    selectedFiles.forEach((file, index) => {
        const item = document.createElement('div');
        item.className = 'preview-item';

        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.alt = `Preview ${index + 1}`;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-preview';
        removeBtn.type = 'button';
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', () => {
            selectedFiles.splice(index, 1);
            renderPreview();
        });

        item.appendChild(img);
        item.appendChild(removeBtn);
        previewList.appendChild(item);
    });
}

function openModal() {
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

function validateForm() {
    clearErrors();

    const requiredFields = [
        ['itemName', 'Item Name is required.'],
        ['category', 'Category is required.'],
        ['description', 'Description is required.'],
        ['dateFound', 'Date Found is required.'],
        ['timeFound', 'Time Found is required.'],
        ['location', 'Exact Location is required.']
    ];

    let valid = true;

    requiredFields.forEach(([fieldId, message]) => {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            showError(fieldId, message);
            valid = false;
        }
    });

    if (!selectedFiles.length) {
        showError('images', 'Please upload at least one image.');
        valid = false;
    }

    return valid;
}

if (form) {

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        if (!validateForm()) return;

        const foundItem = {

            id: Date.now(),

            itemName: document.getElementById("itemName").value,

            category: document.getElementById("category").value,

            brand: document.getElementById("brand").value,

            color: document.getElementById("color").value,

            description: document.getElementById("description").value,

            dateFound: document.getElementById("dateFound").value,

            timeFound: document.getElementById("timeFound").value,

            location: document.getElementById("location").value,

            landmark: document.getElementById("landmark").value,

            condition: document.getElementById("condition").value,

            status: "Available"

        };

        let foundItems =
            JSON.parse(localStorage.getItem("foundItems")) || [];

        foundItems.push(foundItem);

        localStorage.setItem(
            "foundItems",
            JSON.stringify(foundItems)
        );

        // Demo Match

        let matches =
            JSON.parse(localStorage.getItem("matches")) || [];

        matches.push({

            id: Date.now(),

            itemName: foundItem.itemName,

            confidence: 95,

            location: foundItem.location

        });

        localStorage.setItem(
            "matches",
            JSON.stringify(matches)
        );

        let currentUser =
            JSON.parse(localStorage.getItem("currentUser"));

        if(currentUser){

            currentUser.karma += 20;

            currentUser.recoveries += 1;

            localStorage.setItem(
                "currentUser",
                JSON.stringify(currentUser)
            );

        }

        openModal();

        form.reset();

        selectedFiles = [];

        renderPreview();

    });

}

if (uploadBox && fileInput) {
    uploadBox.addEventListener('click', () => fileInput.click());

    ['dragenter', 'dragover'].forEach((eventName) => {
        uploadBox.addEventListener(eventName, (event) => {
            event.preventDefault();
            uploadBox.classList.add('dragover');
        });
    });

    ['dragleave', 'dragend', 'drop'].forEach((eventName) => {
        uploadBox.addEventListener(eventName, (event) => {
            event.preventDefault();
            uploadBox.classList.remove('dragover');
        });
    });

    uploadBox.addEventListener('drop', (event) => {
        const files = Array.from(event.dataTransfer?.files || []);
        selectedFiles = [...selectedFiles, ...files.filter((file) => file.type.startsWith('image/'))];
        renderPreview();
    });

    fileInput.addEventListener('change', (event) => {
        const files = Array.from(event.target.files || []);
        selectedFiles = [...selectedFiles, ...files.filter((file) => file.type.startsWith('image/'))];
        renderPreview();
        event.target.value = '';
    });
}

if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if (dashboardBtn) dashboardBtn.addEventListener('click', () => window.location.href = 'dashboard.html');
if (anotherBtn) anotherBtn.addEventListener('click', () => { closeModal(); form.reset(); selectedFiles = []; renderPreview(); });

renderPreview();
