let currentWeek = 0;
let currentDayIdx = 0;

// STORAGE STATE
let weightHistory = JSON.parse(localStorage.getItem('jatin_weight')) || [70];
let completedDates = JSON.parse(localStorage.getItem('jatin_done')) || [];
let checkStates = JSON.parse(localStorage.getItem('jatin_checks')) || {};

function init() {
    renderWeekGrid();
    renderCharts();
}

// NAVIGATION
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0,0);
}

function renderWeekGrid() {
    const grid = document.getElementById('week-grid');
    grid.innerHTML = '';
    for (let i = 1; i <= 52; i++) {
        const div = document.createElement('div');
        div.className = "glass p-4 rounded-xl text-center cursor-pointer hover:bg-blue-600/20 active:scale-90 transition";
        div.innerHTML = `<span class="text-[10px] text-gray-500 block uppercase font-bold text-shadow-sm">Wk</span><span class="text-lg font-black italic">${i}</span>`;
        div.onclick = () => openWeek(i - 1);
        grid.appendChild(div);
    }
}

function openWeek(index) {
    currentWeek = index;
    const weekData = workoutData[0]; 
    document.getElementById('day-title').innerText = `Week ${index + 1} Plan`;
    const list = document.getElementById('day-list');
    list.innerHTML = '';
    weekData.days.forEach((day, dIdx) => {
        const item = document.createElement('div');
        item.className = "glass p-5 rounded-2xl flex justify-between items-center cursor-pointer active:scale-95 transition";
        item.innerHTML = `<div><h3 class="font-black italic uppercase">${day.name}</h3><p class="text-xs text-gray-500 font-bold">${day.focus}</p></div><i class="fas fa-chevron-right text-blue-500"></i>`;
        item.onclick = () => openDay(day, dIdx);
        list.appendChild(item);
    });
    showPage('page-days');
}

function openDay(day, dIdx) {
    currentDayIdx = dIdx;
    document.getElementById('exercise-day-name').innerText = day.name;
    document.getElementById('exercise-focus').innerText = day.focus;
    
    const list = document.getElementById('exercise-list');
    list.innerHTML = '';
    day.exercises.forEach((ex, index) => {
        const checkKey = `w${currentWeek}-d${currentDayIdx}-ex${index}`;
        const isChecked = checkStates[checkKey] ? 'checked' : '';
        const card = document.createElement('div');
        card.className = "glass p-4 rounded-2xl flex items-center justify-between";
        card.innerHTML = `
            <div onclick="openModal('${ex.name}', '${ex.info}')" class="cursor-pointer">
                <h4 class="font-black italic text-lg uppercase">${ex.name}</h4>
                <p class="text-blue-500 text-xs font-black tracking-widest uppercase mt-1">${ex.sets} SETS • ${ex.reps} REPS</p>
            </div>
            <input type="checkbox" ${isChecked} onchange="saveCheckState('${checkKey}', this.checked)" class="w-8 h-8 rounded-lg bg-gray-800 accent-blue-500 cursor-pointer">
        `;
        list.appendChild(card);
    });

    document.getElementById('weight-prompt').classList.toggle('hidden', day.name !== "Friday");
    showPage('page-exercises');
}

// ACTIONS
function saveCheckState(key, isChecked) {
    checkStates[key] = isChecked;
    localStorage.setItem('jatin_checks', JSON.stringify(checkStates));
}

function completeDay() {
    const today = new Date().toISOString().split('T')[0];
    if(!completedDates.includes(today)) {
        completedDates.push(today);
        localStorage.setItem('jatin_done', JSON.stringify(completedDates));
    }
    alert("Workout Saved, Jatin!");
    showPage('page-weeks');
    renderCharts();
}

function saveWeight() {
    const val = document.getElementById('weight-input').value;
    if(val && !isNaN(val)) {
        weightHistory.push(parseFloat(val));
        localStorage.setItem('jatin_weight', JSON.stringify(weightHistory));
        renderCharts();
        alert("Weight Updated!");
        document.getElementById('weight-input').value = '';
    }
}

function resetAllData() {
    if(confirm("Jatin, are you sure? This deletes everything!")) {
        localStorage.clear();
        location.reload();
    }
}

// CHARTS (FIXED ALIGNMENT)
function renderCharts() {
    renderWeightChart();
    renderConsistencyChart();
}

function renderWeightChart() {
    const ctx = document.getElementById('weightChart').getContext('2d');
    if (window.wChart) window.wChart.destroy();
    window.wChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: weightHistory.map((_, i) => i === 0 ? 'Start' : `W${i}`),
            datasets: [{ data: weightHistory, borderColor: '#3b82f6', tension: 0.4, fill: true, backgroundColor: 'rgba(59, 130, 246, 0.05)', pointRadius: 4 }]
        },
        options: { plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { grid: { display: false }, ticks: { color: '#4b5563' } } } }
    });
}

function renderConsistencyChart() {
    const ctx = document.getElementById('consistencyChart').getContext('2d');
    if (window.cChart) window.cChart.destroy();
    const now = new Date();
    const last7 = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date(); d.setDate(now.getDate() - i);
        last7.push(d.toISOString().split('T')[0]);
    }
    const data = last7.map(d => completedDates.includes(d) ? 1 : 0.05);
    window.cChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: last7.map(d => new Date(d).toLocaleDateString('en-US', { weekday: 'short' })[0]),
            datasets: [{ data: data, backgroundColor: data.map(v => v === 1 ? '#3b82f6' : '#1e293b'), borderRadius: 5 }]
        },
        options: { plugins: { legend: { display: false } }, scales: { y: { display: false, max: 1 }, x: { grid: { display: false }, ticks: { color: '#4b5563' } } } }
    });
}

function openModal(title, desc) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerText = desc;
    document.getElementById('anim-modal').classList.remove('hidden');
}

function closeModal() { document.getElementById('anim-modal').classList.add('hidden'); }

init();