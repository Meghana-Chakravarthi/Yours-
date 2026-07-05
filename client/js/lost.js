const form = document.getElementById('lostForm');
const uploadBox = document.getElementById('uploadBox');
const fileInput = document.getElementById('imageInput');
const previewList = document.getElementById('previewList');
const modal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModal');
const dashboardBtn = document.getElementById('goDashboard');
const anotherBtn = document.getElementById('reportAnother');
let selectedFiles = [];

function showError(fieldId, message) {
    const error = document.querySelector(`[data-error="${fieldId}"]`);
    if (error) {
        error.textContent = message;
    }
}

function clearErrors() {
    document.querySelectorAll('.error').forEach((el) => {
        el.textContent = '';
    });
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
        ['date', 'Date is required.'],
        ['time', 'Time is required.'],
        ['location', 'Location is required.']
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
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        // openModal();
        // form.reset();
        // selectedFiles = [];
        // renderPreview();
        // Create Lost Item Object
const lostItem = {

    id: Date.now(),

    itemName: document.getElementById("itemName").value,

    category: document.getElementById("category").value,

    brand: document.getElementById("brand").value,

    color: document.getElementById("color").value,

    description: document.getElementById("description").value,

    date: document.getElementById("date").value,

    time: document.getElementById("time").value,

    location: document.getElementById("location").value,

    landmark: document.getElementById("landmark").value,

    reward: document.getElementById("reward").value,

    status: "Searching"

};


// Save Lost Items
const lostItems =
    JSON.parse(localStorage.getItem("lostItems")) || [];

lostItems.push(lostItem);

localStorage.setItem(
    "lostItems",
    JSON.stringify(lostItems)
);

// Update current user's karma
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(currentUser){

    currentUser.karma += 10;

    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map(user => {

        if(user.email === currentUser.email){

            return currentUser;

        }

        return user;

    });

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

}

// --------- DEMO MATCH ----------

let matches =
    JSON.parse(localStorage.getItem("matches")) || [];

matches.push({

    id: Date.now(),

    itemName: lostItem.itemName,

    confidence: 95,

    location: lostItem.location

});

localStorage.setItem(
    "matches",
    JSON.stringify(matches)
);


// Show Success

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
// if (dashboardBtn) dashboardBtn.addEventListener('click', () => window.location.href = 'dashboard.html');

if (dashboardBtn){

    dashboardBtn.addEventListener("click",()=>{

        window.location.href="dashboard.html";

    });

}

if (anotherBtn) anotherBtn.addEventListener('click', () => { closeModal(); form.reset(); selectedFiles = []; renderPreview(); });

renderPreview();
