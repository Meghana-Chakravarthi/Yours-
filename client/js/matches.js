const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const matchFilter = document.getElementById("matchFilter");

const bars = Array.from(document.querySelectorAll(".progress span"));

const cards = Array.from(document.querySelectorAll(".match-card"));


// ==========================
// LOAD LATEST MATCH
// ==========================

const matches = JSON.parse(localStorage.getItem("matches")) || [];

if(matches.length > 0){

    const latest = matches[matches.length - 1];

    const firstCard = cards[0];

    if(firstCard){

        firstCard.dataset.category = "Electronics";
        firstCard.dataset.score = latest.confidence;

        firstCard.querySelector(".score").textContent =
            latest.confidence + "%";

        firstCard.querySelector(".progress span").dataset.width =
            latest.confidence;

        firstCard.querySelector(".progress span").style.width =
            latest.confidence + "%";

        const metas =
            firstCard.querySelectorAll(".meta");

        metas[0].innerHTML = `
            ${latest.itemName}<br>
            Category: Electronics<br>
            Color: Black<br>
            Date Lost: Today<br>
            Last Seen: ${latest.location}
        `;

        metas[1].innerHTML = `
            ${latest.itemName}<br>
            Category: Electronics<br>
            Color: Black<br>
            Date Found: Today<br>
            Found Location: ${latest.location}
        `;

    }

}



// ==========================
// FILTERS
// ==========================

function applyFilters(){

    const query =
        searchInput.value.toLowerCase();

    const category =
        categoryFilter.value;

    const matchValue =
        matchFilter.value;

    cards.forEach(card=>{

        const text =
            card.textContent.toLowerCase();

        const score =
            Number(card.dataset.score);

        const cardCategory =
            card.dataset.category;

        const okQuery =
            text.includes(query);

        const okCategory =
            !category || category===cardCategory;

        const okScore =
            !matchValue ||

            (matchValue==="high" && score>=90) ||

            (matchValue==="mid" && score>=70 && score<90) ||

            (matchValue==="low" && score<70);

        card.style.display =
            okQuery && okCategory && okScore
            ? "grid"
            : "none";

    });

}



if(searchInput){

    searchInput.addEventListener(
        "input",
        applyFilters
    );

}

if(categoryFilter){

    categoryFilter.addEventListener(
        "change",
        applyFilters
    );

}

if(matchFilter){

    matchFilter.addEventListener(
        "change",
        applyFilters
    );

}



// ==========================
// ANIMATE PROGRESS
// ==========================

window.addEventListener("load",()=>{

    bars.forEach((bar,index)=>{

        setTimeout(()=>{

            bar.style.width =
                (bar.dataset.width || 90) + "%";

        },index*150);

    });

});