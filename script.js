let profit = 2000;
let results = [];
let trialCount = 0;
const maxTrials = 100;

// Define fixed outcomes for each deck of 40 cards
const deckA = [100, 100, -150, 100, -300, 100, -200, 100, -250, -350, 100, -350, 100, -250, -200, 100, -300, -150, 100, 100, 100, -300, 100, -350, 100, -200, -250, -150, 100, 100, -350, -200, -250, 100, 100, 100, -150, -300, 100, 100]; // Continue the sequence for 40 cards
const deckB = [0, 0, 100, 0, 100, 0, 100, 100, -125, 100, 0, 0, 100, -125, 100, 0, 0, 100, 100, 100, -125, 100, 0, 0, 100, 0, 100, 0, 100, 100, 0, -125, 100, 0, 100, 0, 100, 0, 100, 100]; // Continue the sequence for 40 cards
const deckC = [50, 50, -50, 50, -50, 50, -50, 50, -50, -50, 50, -25, -75, 50, 50, 50, -25, -75, 50, -50, 50, 50, 50, -50, -25, -50, 50, 50, -75, -50, 50, 50, 50, -25, -25, 50, -75, 50, -50, -75]; // Continue the sequence for 40 cards
const deckD = [0, 50, 0, 50, 50, 0, 0, 50, 50, -250, 0, 0, 50, 50, 0, 50, 50, 50, 0, -250, 50, 0, 50, 50, 0, 0, 0, 50, -250, 50, 50, 0, 50, 0, -250, 0, 50, 50, 0, 50]; // Continue the sequence for 40 cards
//Based on "Characterization of the decision-making deficit of patients with ventromedial prefrontal cortex lesions"

function drawCard(deckName) {
    if (trialCount >= maxTrials) {
        alert("Maximum trials reached!");
        return;
    }

    let result;
    switch(deckName) {
        case 'A':
            result = deckA.pop();
            break;
        case 'B':
            result = deckB.pop();
            break;
        case 'C':
            result = deckC.pop();
            break;
        case 'D':
            result = deckD.pop();
            break;
    }
    
    if (typeof result === "undefined") {
        alert(`Deck ${deckName} is empty!`);
        return;
    }
    else{
        document.getElementById('immediateResult').innerText = result >= 0 ? `You earned $${result}` : `You lost $${Math.abs(result)}`;
    }

    profit += result;
    trialCount++;
    results.push({deck: deckName, result, profit});
    document.getElementById('profit').innerText = profit;

    if (trialCount === maxTrials) {
        computeNetScores();
    }
}

function computeNetScores() {
    let netScores = [];
    for (let i = 0; i < maxTrials; i += 20) {
        let block = results.slice(i, i + 20);
        let netScore = block.reduce((score, record) => {
            if (['B'].includes(record.deck)) score++; // Advantageous
            if (['A'].includes(record.deck)) score--; // Disadvantageous
            return score;
        }, 0);
        netScores.push(netScore);
    }
    displayNetScores(netScores);
    return netScores;
}

function displayNetScores(netScores) {
    alert("Net Scores for each block:\n" + netScores.map((score, index) => `Block ${index + 1}: ${score}`).join("\n"));
}

function downloadCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    let netScores = computeNetScores();

    // Header for individual results
    csvContent += "Deck,Result,Total Profit\n";
    results.forEach(record => {
        csvContent += record.deck + "," + record.result + "," + record.profit + "\n";
    });

    // Add a separator for clarity
    csvContent += "\n\n";

    // Header for block totals and net scores
    csvContent += "Block,Net Score\n";

    // Add net score for each block
    for (let j = 0; j < netScores.length; j++) {
        csvContent += `Block ${j + 1},${netScores[j]}\n`;
    }

    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "igt_results.csv");
    document.body.appendChild(link);
    link.click();
}


