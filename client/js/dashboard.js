// =============================
// CURRENT USER
// =============================

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const greetingText = document.getElementById("greetingText");

const userName = document.getElementById("userName");

const activitySearch = document.getElementById("activitySearch");

const timelineItems = Array.from(document.querySelectorAll(".timeline-item"));

const statValues = Array.from(document.querySelectorAll(".stat-card h2"));


// =============================
// GREETING
// =============================

function updateGreeting() {

    let greeting = "Good Morning";

    const hour = new Date().getHours();

    if(hour >= 12 && hour < 18){

        greeting = "Good Afternoon";

    }else if(hour >= 18){

        greeting = "Good Evening";

    }

    if(currentUser){

        if(greetingText){

            greetingText.textContent =
                `${greeting}, ${currentUser.fullName} 👋`;

        }

        if(userName){

            userName.textContent =
                currentUser.fullName;

        }

    }

}


// =============================
// DASHBOARD STATS
// =============================

function updateStats(){

    const lostItems =
        JSON.parse(localStorage.getItem("lostItems")) || [];

    const foundItems =
        JSON.parse(localStorage.getItem("foundItems")) || [];

    const matches =
        JSON.parse(localStorage.getItem("matches")) || [];

    const stats = [

        lostItems.length,

        matches.length,

        currentUser?.recoveries || 0,

        currentUser?.karma || 0

    ];

    statValues.forEach((value,index)=>{

        const target = stats[index];

        value.dataset.target = target;

    });

}


// =============================
// ANIMATED COUNTER
// =============================

function animateStats(){

    statValues.forEach((value,index)=>{

        const target = Number(value.dataset.target);

        let start = 0;

        const speed = Math.max(1,Math.ceil(target/20));

        function update(){

            start += speed;

            if(start >= target){

                value.textContent = target;

                return;

            }

            value.textContent = start;

            requestAnimationFrame(update);

        }

        update();

    });

}


// =============================
// SEARCH
// =============================

function filterActivity(){

    if(!activitySearch) return;

    const query =
        activitySearch.value.toLowerCase();

    timelineItems.forEach(item=>{

        item.style.display =
            item.textContent.toLowerCase().includes(query)
            ? "flex"
            : "none";

    });

}

if(activitySearch){

    activitySearch.addEventListener("input",filterActivity);

}


// =============================
// LOAD
// =============================

updateGreeting();

updateStats();

animateStats();

document.body.classList.add("loaded");