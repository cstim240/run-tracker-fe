async function getRuns(tbody){
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
        console.log('Async function completed');
        alert('Table filled!')
    }
}

function fillTable(){
    const tableBody = document.querySelector('tbody');
    tableBody.textContent = 'Loading... '

    getRuns(tableBody);
    console.log("All runs posted!");
}

fillTable();