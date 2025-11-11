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
            // for each run we also want to append a button for deletion + event listener

            const tableCellDel = document.createElement("td");
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "X";
            deleteBtn.classList.add("runDelBtn");
            deleteBtn.addEventListener("click", () => {
                deleteRun(run.id);
            });
            tableCellDel.append(deleteBtn);

            // for each run we also want to append an edit button for editing
            const tableCellEdit = document.createElement("td");
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.classList.add("runEditBtn");
            editBtn.addEventListener("click", () => {
                editRun(run.id);
            });
            tableCellEdit.append(editBtn);

            console.log(`Run id: ${run.id}`);
            tableRow.append(tableCellDel);
            tableRow.append(tableCellEdit);
            
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

async function deleteRun(id){
    const url = "http://localhost:8080/runs/";
    try {
        const response = await fetch(url + id, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.message}`);
        }
    } catch (e){
        console.log(`Error! ${e.message}`);
    } finally {
        console.log(`Successfully deleted run id: ${id}`);
        alert(`Delete successful! Bye bye run ${id}`);
        fillTable();
    }
}

async function editRun(id){
    // scroll to the Form element
    const formElement = document.getElementById("createForm");
    formElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    // fill in form with run id's (may need to perform a get request)
    // not needed we already have the row data from the initial GET request
    fillForm(id, formElement);

    
}

async function fillForm(id){

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

async function sendData(formData) {
    const post_url = 'http://localhost:8080/runs';
    try {
        const response = await fetch(post_url, {
            method: "POST",
            body: formData,
            headers: {
                "Content-type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        } 

        console.log(await response.json());
    } catch (e) {
        console.log('ERROR: ' + e.message);
    } finally {
        console.log('Async function (POST) completed');
        alert("Run posted!");
        fillTable();
    }
}

function acquireFormData() {
    document.getElementById("createForm").addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        // this form data isn't ready for submission, it is currently a special browser object, not directly JSON-serializable
        // JSON serializaiton is the process of converting an object's state into a JSON string which can be stored or transmitted

        //it goes from special browser object to Plain Javascript object to JSON 
        const formData_js = Object.fromEntries(formData);
        console.log(`formData_js: ${formData_js}`);

        //then we turn it into JSON
        const formData_JSON = JSON.stringify(formData_js);

        for (let [key, value] of formData.entries()){
            console.log(key, value);
        }
        // we can also append data here if some of the inputs are empty...
        sendData(formData_JSON);
    });
}

function addListenerToDeleteButtons() {
    const deleteAllBtn = document.getElementById("delAllBtn");
    const deleteAllURL = "http://localhost:8080/runs";
    deleteAllBtn.addEventListener("click", () => {
        deleteAllListener(deleteAllURL);
    });

    //to do: add delete button to each table row, then add eventlisteners to them
    const deleteBtns = document.querySelectorAll(".runDelBtn");

}

async function deleteAllListener(url){
    try {
        const response = await fetch(url, {
                method: "DELETE"
        });

        if (!response.ok){
            throw new Error(`HTTP Error: ${response.status}`);
        }
    } catch (error) {
        console.log('ERROR: ' + error.message);
    } finally {
        fillTable();
        alert("Deleted ALL the runs!");
    }
}


fillTable();
addListenersToStatButtons();
acquireFormData(); // adds event listener to form for creating new runs
addListenerToDeleteButtons();
