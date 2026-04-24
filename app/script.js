// Initial Vault Data (Embedded for reliability across protocols)
const INITIAL_VAULT_DATA = [
    ["7.4","0.7","0","1.9","0.076","11","34","0.9978","3.51","0.56","9.4","5"],
    ["7.8","0.88","0","2.6","0.098","25","67","0.9968","3.2","0.68","9.8","5"],
    ["7.8","0.76","0.04","2.3","0.092","15","54","0.997","3.26","0.65","9.8","5"],
    ["11.2","0.28","0.56","1.9","0.075","17","60","0.998","3.16","0.58","9.8","6"],
    ["7.3","0.65","0","1.2","0.065","15","21","0.9946","3.39","0.47","10","7"],
    ["7.8","0.58","0.02","2","0.073","9","18","0.9968","3.36","0.57","9.5","7"],
    ["7.5","0.5","0.36","6.1","0.071","17","102","0.9978","3.35","0.8","10.5","5"],
    ["6.7","0.58","0.08","1.8","0.097","15","65","0.9959","3.28","0.54","9.2","5"],
    ["5.6","0.615","0","1.6","0.089","16","59","0.9943","3.58","0.52","9.9","5"],
    ["7.8","0.61","0.29","1.6","0.114","9","29","0.9974","3.26","1.56","9.1","5"],
    ["8.9","0.62","0.18","3.8","0.176","52","145","0.9986","3.16","0.88","9.2","5"],
    ["8.5","0.28","0.56","1.8","0.092","35","103","0.9969","3.3","0.75","10.5","7"],
    ["8.1","0.56","0.28","1.7","0.368","16","56","0.9968","3.11","1.28","9.3","5"],
    ["7.4","0.59","0.08","4.4","0.086","6","29","0.9974","3.38","0.5","9","4"],
    ["7.9","0.32","0.51","1.8","0.341","17","56","0.9969","3.04","1.08","9.2","6"],
    ["8.9","0.22","0.48","1.8","0.077","29","60","0.9968","3.39","0.53","9.4","6"],
    ["7.6","0.39","0.31","2.3","0.082","23","71","0.9982","3.52","0.65","9.7","5"],
    ["8.5","0.49","0.11","2.3","0.084","9","67","0.9968","3.17","0.53","9.4","5"],
    ["6.9","0.4","0.14","2.4","0.085","21","40","0.9968","3.43","0.63","9.7","6"],
    ["7.1","0.71","0","1.9","0.08","14","35","0.9972","3.47","0.55","9.4","5"],
    ["6.9","0.685","0","2.5","0.105","22","37","0.9966","3.46","0.57","10.6","6"],
    ["8.3","0.655","0.12","2.3","0.083","15","113","0.9966","3.17","0.66","9.8","5"],
    ["6.9","0.605","0.12","10.7","0.073","40","83","0.9993","3.45","0.52","9.4","6"],
    ["5.2","0.32","0.25","1.8","0.103","13","50","0.9957","3.38","0.55","9.2","5"],
    ["8.1","0.38","0.28","2.1","0.066","13","30","0.9968","3.23","0.73","9.7","7"],
    ["5.7","1.13","0.09","1.5","0.172","7","19","0.994","3.50","0.48","9.8","4"],
    ["4.6","0.52","0.15","2.1","0.054","8","65","0.9934","3.90","0.56","13.1","4"],
    ["6.4","0.4","0.23","1.6","0.066","5","12","0.9958","3.34","0.56","9.2","5"],
    ["5.6","0.31","0.37","1.4","0.074","12","96","0.9954","3.32","0.58","9.2","5"],
    ["8.6","0.38","0.36","3","0.081","30","119","0.9970","3.20","0.56","9.4","5"],
    ["7.6","0.51","0.15","2.8","0.11","33","73","0.9955","3.17","0.63","10.2","6"],
    ["10.2","0.42","0.57","3.4","0.07","4","10","0.9971","3.04","0.63","9.6","5"],
    ["7.5","0.63","0.12","5.1","0.111","50","110","0.9983","3.26","0.77","9.4","5"],
    ["8.1","1.33","0","1.8","0.082","3","12","0.9964","3.54","0.48","10.9","5"],
    ["5.2","0.34","0","1.8","0.05","27","63","0.9916","3.68","0.79","14","6"],
    ["5.6","0.85","0.05","1.4","0.045","12","88","0.9924","3.56","0.82","12.9","8"],
    ["9.2","0.52","1.0","3.4","0.61","32","69","0.9996","2.74","2.0","9.4","4"]
];

// Global Data Store
let cellarData = [...INITIAL_VAULT_DATA];

// --- Tab Navigation ---
const tabs = document.querySelectorAll('.nav-btn');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.add('hidden'));
        
        tab.classList.add('active');
        const contentId = `${tab.dataset.tab}-tab`;
        document.getElementById(contentId).classList.remove('hidden');
        
        if (tab.dataset.tab === 'vault') {
            loadCellarData();
        }
    });
});

// --- Random Sample Logic ---
document.getElementById('random-sample-btn').addEventListener('click', async function() {
    // Ensure data is loaded
    if (cellarData.length === 0) {
        await loadCellarData(true); // silent load
    }
    
    if (cellarData.length > 0) {
        const randomIndex = Math.floor(Math.random() * cellarData.length);
        const sample = cellarData[randomIndex];
        
        document.getElementById('fixed-acidity').value = sample[0];
        document.getElementById('volatile-acidity').value = sample[1];
        document.getElementById('citric-acid').value = sample[2];
        document.getElementById('residual-sugar').value = sample[3];
        document.getElementById('chlorides').value = sample[4];
        document.getElementById('free-sulfur-dioxide').value = sample[5];
        document.getElementById('total-sulfur-dioxide').value = sample[6];
        document.getElementById('density').value = sample[7];
        document.getElementById('ph').value = sample[8];
        document.getElementById('sulphates').value = sample[9];
        document.getElementById('alcohol').value = sample[10];

        // Hide previous result when new sample is loaded
        document.getElementById('result-section').classList.add('hidden');
    }
});

// --- AI Assessment Logic ---
const runAssessmentBtn = document.getElementById('run-assessment-btn');
const resultSection = document.getElementById('result-section');
const progressCircle = document.getElementById('progress-circle');
const scoreValue = document.getElementById('score-value');
const qualityStatus = document.getElementById('quality-status');
const analysisText = document.getElementById('analysis-text');

runAssessmentBtn.addEventListener('click', function() {
    // Show result section and scroll to it if on mobile
    resultSection.classList.remove('hidden');
    
    // Initial state
    scoreValue.innerText = '0';
    updateProgress(0);
    analysisText.innerText = "Analyzing molecular structure...";
    
    // Simulated Processing
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        if (progress <= 100) {
            // scoreValue.innerText = progress; // We'll set final score at the end
        }
        if (progress >= 100) {
            clearInterval(interval);
            calculateFinalScore();
        }
    }, 50);
});

function updateProgress(percent) {
    const radius = progressCircle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percent / 100 * circumference);
    progressCircle.style.strokeDashoffset = offset;
}

async function calculateFinalScore() {
    // Get values
    const payload = {
        fixed_acidity: parseFloat(document.getElementById('fixed-acidity').value),
        volatile_acidity: parseFloat(document.getElementById('volatile-acidity').value),
        citric_acid: parseFloat(document.getElementById('citric-acid').value),
        residual_sugar: parseFloat(document.getElementById('residual-sugar').value),
        chlorides: parseFloat(document.getElementById('chlorides').value),
        free_sulfur_dioxide: parseFloat(document.getElementById('free-sulfur-dioxide').value),
        total_sulfur_dioxide: parseFloat(document.getElementById('total-sulfur-dioxide').value),
        density: parseFloat(document.getElementById('density').value),
        ph: parseFloat(document.getElementById('ph').value),
        sulphates: parseFloat(document.getElementById('sulphates').value),
        alcohol: parseFloat(document.getElementById('alcohol').value)
    };

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) throw new Error('Prediction request failed');
        
        const result = await response.json();
        
        // Animate UI
        let current = 0;
        const targetScore = Math.round(result.score);
        const anim = setInterval(() => {
            current++;
            scoreValue.innerText = current;
            updateProgress(current);
            if (current >= targetScore) {
                clearInterval(anim);
                finalizeUI(targetScore, payload.alcohol, payload.volatile_acidity, result.status);
            }
        }, 20);
    } catch (error) {
        console.error("Backend error:", error);
        analysisText.innerText = "Connection lost to AI core. Using local fallback...";
        // Use local fallback if server is down (original heuristic)
        localHeuristicFallback(payload);
    }
}

function localHeuristicFallback(payload) {
    let score = 50;
    if (payload.alcohol > 11) score += 20;
    if (payload.volatile_acidity < 0.4) score += 15;
    if (payload.sulphates > 0.7) score += 10;
    
    score = Math.min(95, score);
    const finalScore = Math.round(score);
    
    let current = 0;
    const anim = setInterval(() => {
        current++;
        scoreValue.innerText = current;
        updateProgress(current);
        if (current >= finalScore) {
            clearInterval(anim);
            finalizeUI(finalScore, payload.alcohol, payload.volatile_acidity);
        }
    }, 20);
}

function finalizeUI(score, alcohol, volatile, serverStatus = null) {
    let status = serverStatus;
    let message = "";
    
    if (!status) {
        if (score >= 85) status = "Reserve";
        else if (score >= 70) status = "Premium";
        else status = "Table";
    }
    
    if (status === "Reserve") {
        message = "Exceptional balance with superior aging potential. The high alcohol content suggests a full-bodied character.";
        qualityStatus.style.background = "linear-gradient(135deg, #D4AF37, #B8860B)";
        qualityStatus.style.color = "#1a1a1a";
    } else if (status === "Premium") {
        message = "Well-structured profile with pleasant aromatic complexity. Suitable for immediate cellar inventory.";
        qualityStatus.style.background = "linear-gradient(135deg, var(--wine), var(--wine-light))";
        qualityStatus.style.color = "white";
    } else {
        message = "Moderate quality profile. Noted imbalances in acidity or phenolic ripeness. Best for early consumption.";
        qualityStatus.style.background = "#333";
        qualityStatus.style.color = "white";
    }
    
    qualityStatus.innerText = status;
    analysisText.innerText = message;
    
    // Update bars
    document.getElementById('bar-alcohol').style.width = `${Math.min(100, (alcohol / 15) * 100)}%`;
    document.getElementById('bar-acidity').style.width = `${Math.min(100, (1 - volatile) * 100)}%`;
}

// --- Cellar Data & Add Record Logic ---
const addPanel = document.getElementById('add-record-panel');
document.getElementById('toggle-add-form').addEventListener('click', () => {
    addPanel.classList.toggle('hidden');
});

document.getElementById('cancel-add').addEventListener('click', () => {
    addPanel.classList.add('hidden');
});

document.getElementById('new-record-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newRecord = [
        document.getElementById('new-fa').value,
        document.getElementById('new-va').value,
        document.getElementById('new-ca').value,
        document.getElementById('new-rs').value,
        document.getElementById('new-ch').value,
        document.getElementById('new-fs').value,
        document.getElementById('new-ts').value,
        document.getElementById('new-de').value,
        document.getElementById('new-ph').value,
        document.getElementById('new-su').value,
        document.getElementById('new-al').value,
        document.getElementById('new-qu').value
    ];

    cellarData.unshift(newRecord); // Add to top
    renderTable();
    addPanel.classList.add('hidden');
    e.target.reset();
});

async function loadCellarData(silent = false) {
    try {
        const response = await fetch('./winequality-red.csv');
        if (!response.ok) throw new Error('File fetch failed');
        
        const csvText = await response.text();
        const rows = csvText.split('\n').filter(row => row.trim() !== '');
        
        // Header
        const headers = rows[0].split(';').map(h => h.replace(/"/g, ''));
        const tableHead = document.getElementById('table-head');
        if (tableHead) {
            tableHead.innerHTML = '';
            headers.forEach(h => {
                const th = document.createElement('th');
                th.innerText = h.charAt(0).toUpperCase() + h.slice(1);
                tableHead.appendChild(th);
            });
        }

        // Store data (Combine with initial if not already loaded from CSV)
        const csvData = rows.slice(1).map(row => row.split(';'));
        if (csvData.length > 0) {
            cellarData = csvData; // Use fresh CSV data if available
        }
        
        if (!silent) renderTable();
    } catch (error) {
        console.warn("Using embedded vault data (CSV unreachable via file:// protocol)");
        // Setup headers manually if CSV fails
        const tableHead = document.getElementById('table-head');
        if (tableHead && tableHead.innerHTML === '') {
            const fallbackHeaders = ["Fixed Acidity", "Volatile Acidity", "Citric Acid", "Residual Sugar", "Chlorides", "Free SO₂", "Total SO₂", "Density", "pH", "Sulphates", "Alcohol", "Quality"];
            fallbackHeaders.forEach(h => {
                const th = document.createElement('th');
                th.innerText = h;
                tableHead.appendChild(th);
            });
        }
        if (!silent) renderTable();
    }
}

function renderTable() {
    const tableBody = document.getElementById('table-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';
    
    cellarData.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.innerText = cell;
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}

// --- Initialization ---
window.addEventListener('DOMContentLoaded', () => {
    loadCellarData(false); // Load and render initial data
});
