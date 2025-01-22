// Funções de Utilidade
function formatDate(date) {
    return date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Atualização da Interface
function updateDate() {
    const dateElement = document.getElementById('current-date');
    dateElement.textContent = formatDate(new Date());
}

function updateMoodTracker(mood) {
    const buttons = document.querySelectorAll('.mood-button');
    buttons.forEach(btn => btn.classList.remove('selected'));
    mood.classList.add('selected');
    
    // Salvar no localStorage
    localStorage.setItem('currentMood', mood.title);
}

function updateEnergyLevel(level) {
    localStorage.setItem('energyLevel', level);
}

// Gerenciamento de Tarefas
function addTask(taskList, task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        <span>${task.description}</span>
        <div class="task-actions">
            <button onclick="completeTask(this)" class="btn-complete">✓</button>
            <button onclick="deleteTask(this)" class="btn-delete">×</button>
        </div>
    `;
    document.getElementById(taskList).appendChild(li);
}

function completeTask(button) {
    const taskItem = button.closest('.task-item');
    taskItem.classList.toggle('completed');
}

function deleteTask(button) {
    const taskItem = button.closest('.task-item');
    taskItem.remove();
}

// Gerenciamento de Metas
function addGoal(goal) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        <span>${goal.description}</span>
        <div class="progress-bar">
            <div class="progress" style="width: ${goal.progress}%"></div>
        </div>
    `;
    document.getElementById('daily-goals').appendChild(li);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    updateDate();
    
    // Configurar listeners do humor
    const moodButtons = document.querySelectorAll('.mood-button');
    moodButtons.forEach(button => {
        button.addEventListener('click', () => updateMoodTracker(button));
    });
    
    // Configurar listener do nível de energia
    const energySlider = document.querySelector('.energy-level input');
    energySlider.addEventListener('change', (e) => updateEnergyLevel(e.target.value));
    
    // Carregar dados salvos
    const savedMood = localStorage.getItem('currentMood');
    const savedEnergy = localStorage.getItem('energyLevel');
    
    if (savedMood) {
        const moodButton = Array.from(moodButtons).find(btn => btn.title === savedMood);
        if (moodButton) updateMoodTracker(moodButton);
    }
    
    if (savedEnergy) {
        energySlider.value = savedEnergy;
    }
}); 