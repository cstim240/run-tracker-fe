async function getRuns(tbody) {
    const allRuns_URL = 'http://localhost:8080/runs'
    tbody.textContent = '';
    try {
        // await until promise resolves
        const response = await fetch(allRuns_URL);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        } 

        // await again - read the response stream, returns a promise which resolves
        const runs = await response.json();

        for (const run of runs) { //for .. of gives the actual run objet
            // Create a row 
            const tableRow = document.createElement("tr");
            for (const field in run){ // for .. in loops on the other hand, gives keys/property names and not values ie. (field is "id", "date", "distance" (property names))
                // Create cells for each field
                const tableCell = document.createElement("td");
                tableCell.textContent = run[field]; //can be accessed with dot notation too
                tableRow.append(tableCell);
            }
            tbody.appendChild(tableRow);
        }

    } catch (error) {
        console.log('ERROR: ' + error.message);
    } finally {
        // this will still run despite catching an error
        console.log('Async function completed');
        alert('Table filled!')
    }
}

function fillTable() {
    const tableBody = document.querySelector('tbody');
    tableBody.textContent = 'Loading... '

    getRuns(tableBody);
    console.log("All runs posted!");
}

async function getStats(sec, endpoint) {
    sec.innerHTML = '';
    const allstats_URL = `http://localhost:8080${endpoint}`;

    try{
        const response = await fetch(allstats_URL);

        if (!response.ok) {
            throw new Error(`HTTP ERROR: ${response.status}`);
        }

        const stats = await response.json();

        //This is for a clearer, grammatically correct display
        const statsToDisplay = [
            { key: "farthestRun", value: "Farthest Run"},
            { key: "fastestPace", value: "Fastest Pace"},
            { key: "totalDistance", value: "Total Distance"},
            { key: "averagePace", value: "Average Pace"},
            { key: "longestRun", value: "Longest Run"}
        ];

        /*
        for (let i = 0; i < statsToDisplay.length; i++){
            const statDiv = document.createElement("div");
            statDiv.textContent = `${statsToDisplay[i].value} = ${stats[statsToDisplay[i].key]}`;
            sec.appendChild(statDiv);
        }
        */

       statsToDisplay.forEach((stat) => {
        // stat represents each object {key: ***; value: ***}
        const statDiv = document.createElement("div");
        statDiv.textContent = `${stat.value}: ${stats[stat.key]}`;
        sec.appendChild(statDiv);
       });

        /* 
        // Iterating approach to display stats
        for (const key in stats) {
            p.textContent += `${key}:${stats[key]}  `;
        }
        */

    } catch (error){
        console.log(`ERROR: ${error.message}`);
    } finally {
        alert(`Fetch stats done!`);
    }
}

function fillDashBoard(btnTxt) {
    const statsSection = document.getElementById('stats');

    // We map the button's textContent to the specific GET stat endpoint
    // We opt for a plain JS object instead of a Map for simplicity (string keys and string values)
    const endpoint = {
        "All-Time": "/runs/stats/all",
        "Year": "/runs/stats/year",
        "Month": "/runs/stats/month",
        "Week": "/runs/stats/week"
    }

    getStats(statsSection, endpoint[btnTxt]);
    console.log("Stats posted!");

}

function addListenersToStatButtons(){
    const nav = document.querySelectorAll('nav button');
    nav.forEach((button) => button.addEventListener('click', () => fillDashBoard(button.textContent)));
}

fillTable();
addListenersToStatButtons();
