let profit = 2000;
let results = [];
let trialCount = 0;
const maxTrials = 100;

// Define fixed outcomes for each deck of 60 cards
const deckA = [100, 100, -50, 100, -200, 100, -100, 100, -150, -250, 100, -250, 100, -150, -100, 100, -200, -50, 100, 100, 100, -200, 100, -250, 100, -100, -150, -50, 100, 100, -250, -100, -150, 100, 100, 100, -50, -200, 100, 100, 100, 100, -50, 100, -200, 100, -100, 100, -150, -250, 100, -250, 100, -150, -100, 100, -200, -50, 100, 100]; // Continue the sequence for 60 cards
const deckB = [100, 100, 100, 100, 100, 100, 100, 100, -1150, 100, 100, 100, 100, -1150, 100, 100, 100, 100, 100, 100, -1150, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, -1150, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, -1150, 100, 100, 100, 100, -1150, 100, 100, 100, 100, 100, 100]; // Continue the sequence for 60 cards
const deckC = [50, 50, 0, 50, 0, 50, 0, 50, 0, 0, 50, 25, -25, 50, 50, 50, 25, -25, 50, 0, 50, 50, 50, 0, 25, 0, 50, 50, -25, 0, 50, 50, 50, 25, 25, 50, -25, 50, 0, -25, 50, 50, 0, 50, 0, 50, 0, 50, 0, 0, 50, 25, -25, 50, 50, 50, 25, -25, 50, 0]; // Continue the sequence for 60 cards
const deckD = [50, 50, 50, 50, 50, 50, 50, 50, 50, -200, 50, 50, 50, 50, 50, 50, 50, 50, 50, -200, 50, 50, 50, 50, 50, 50, 50, 50, -200, 50, 50, 50, 50, 50, -200, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, -200, 50, 50, 50, 50, 50, 50, 50, 50, 50, -200]; // Continue the sequence for 60 cards
//Based on "Characterization of the decision-making deficit of patients with ventromedial prefrontal cortex lesions"
//const deckA = [100, 100, -150, 100, -300, 100, -200, 100, -250, -350, 100, -350, 100, -250, -200, 100, -300, -150, 100, 100, 100, -300, 100, -350, 100, -200, -250, -150, 100, 100, -350, -200, -250, 100, 100, 100, -150, -300, 100, 100]; // Continue the sequence for 40 cards
//const deckB = [0, 0, 100, 0, 100, 0, 100, 100, -125, 100, 0, 0, 100, -125, 100, 0, 0, 100, 100, 100, -125, 100, 0, 0, 100, 0, 100, 0, 100, 100, 0, -125, 100, 0, 100, 0, 100, 0, 100, 100]; // Continue the sequence for 40 cards
//const deckC = [50, 50, -50, 50, -50, 50, -50, 50, -50, -50, 50, -25, -75, 50, 50, 50, -25, -75, 50, -50, 50, 50, 50, -50, -25, -50, 50, 50, -75, -50, 50, 50, 50, -25, -25, 50, -75, 50, -50, -75]; // Continue the sequence for 40 cards
//const deckD = [0, 50, 0, 50, 50, 0, 0, 50, 50, -250, 0, 0, 50, 50, 0, 50, 50, 50, 0, -250, 50, 0, 50, 50, 0, 0, 0, 50, -250, 50, 50, 0, 50, 0, -250, 0, 50, 50, 0, 50]; // Continue the sequence for 40 cards

function drawCard(deckName) {
    if (trialCount >= maxTrials) {
        alert("Maximum trials reached!");
        return;
    }

    let result;
    switch(deckName) {
        case 'A':
            result = deckA.shift();
            break;
        case 'B':
            result = deckB.shift();
            break;
        case 'C':
            result = deckC.shift();
            break;
        case 'D':
            result = deckD.shift();
            break;
    }
    
    if (typeof result === "undefined") {
        alert(`Deck ${deckName} is empty!`);
        return;
    }
    else{
        //document.getElementById('immediateResult').innerText = result >= 0 ? `You earned $${result}` : `You lost $${Math.abs(result)}`;
        let resultSpan = document.getElementById('resultValue');
        if (result >= 0) {
            resultSpan.innerText = `earned $${result}`;
            resultSpan.className = 'gain';  // Apply green color
        } else {
            resultSpan.innerText = `lost $${Math.abs(result)}`;
            resultSpan.className = 'loss';  // Apply red color
        }
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
            if (['C','D'].includes(record.deck)) score++; // Advantageous
            if (['A','B'].includes(record.deck)) score--; // Disadvantageous
            return score;
        }, 0);
        netScores.push(netScore);
    }
    displayNetScores(netScores);
    return netScores;
}

function displayNetScores(netScores) {
    setTimeout(function() {alert("Net Scores for each block:\n" + netScores.map((score, index) => `Block ${index + 1}: ${score}`).join("\n"))}, 100);
}

function downloadCSV() {
    var userId = generateStringRandomly();
    let csvContent = "data:text/csv;charset=utf-8,";
    let netScores = computeNetScores();

    // also send the results to the server
    saveResults(userId, netScores);

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
    link.setAttribute("download", "igt_results" + userId + ".csv");
    document.body.appendChild(link);
    link.click();
}

function generateStringRandomly() {
    var l = 6;
    // 生成する文字列に含める文字セット
    var c = "abcdefghijklmnopqrstuvwxyz0123456789";
    var cl = c.length;
    var r = "_";
    for (var i = 0; i < l; i++) {
        r += c[Math.floor(Math.random() * cl)];
    }
    return r;
}

function saveResults(userId, netScores) {
    fetch('/results', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ userId, results, netScores })
    }).then(res => {
        if (!res.ok) throw new Error('Failed to save results');
    }).catch(err => {
        console.error('Error saving results', err);
    });
}

