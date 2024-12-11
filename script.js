// Constants
const MAX_DAILY_HOURS = 12;
const calendarContainer = document.getElementById('calendarContainer');
const selectDay = document.getElementById('selectDay');
const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

// Generate calendar
for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement('div');
    day.className = 'day';
    day.id = `day-${i}`;

    // Dienos skaičius
    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = i;

    // Darbuotojų skaičius
    const employeeCount = document.createElement('div');
    employeeCount.className = 'employee-count';
    employeeCount.textContent = `0 darbuotojų`;

    day.appendChild(dayNumber);
    day.appendChild(employeeCount);
    calendarContainer.appendChild(day);

    // Populate select dropdown
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `Diena ${i}`;
    selectDay.appendChild(option);
}

// Monthly hours calculator
document.getElementById('calculateMonthly').addEventListener('click', () => {
    const monthlyHours = parseFloat(document.getElementById('monthlyHours').value);
    const maxHoursPerEmployee = parseFloat(document.getElementById('maxHoursPerEmployee').value);
    const absenteeism = parseFloat(document.getElementById('absenteeism').value || 0);
    const peakIncrease = parseFloat(document.getElementById('peakIncrease').value || 0);

    if (!monthlyHours || !maxHoursPerEmployee) {
        alert('Prašome įvesti visus laukelius.');
        return;
    }

    const adjustedHours = monthlyHours * (1 + peakIncrease / 100);
    const adjustedForAbsenteeism = adjustedHours * (1 + absenteeism / 100);
    const requiredPositions = (adjustedForAbsenteeism / maxHoursPerEmployee).toFixed(2);

    document.getElementById('monthlyResult').innerText = 
        `Reikalingi etatai per mėnesį (su rezervais): ${requiredPositions}`;
});

// Daily hours calculator
document.getElementById('calculateDaily').addEventListener('click', () => {
    const dailyHours = parseFloat(document.getElementById('dailyHours').value);

    if (!dailyHours) {
        alert('Prašome įvesti darbo valandas.');
        return;
    }

    const requiredEmployees = Math.ceil(dailyHours / MAX_DAILY_HOURS);
    document.getElementById('dailyResult').innerText = `Reikalingi darbuotojai per dieną: ${requiredEmployees}`;
});

// Add to calendar
document.getElementById('addToCalendar').addEventListener('click', () => {
    const dailyHours = parseFloat(document.getElementById('dailyHours').value);
    const selectedDay = parseInt(selectDay.value);

    if (!dailyHours) {
        alert('Prašome įvesti darbo valandas.');
        return;
    }

    if (!selectedDay) {
        alert('Pasirinkite dieną.');
        return;
    }

    const requiredEmployees = Math.ceil(dailyHours / MAX_DAILY_HOURS);

    // Update specific calendar day
    const dayElement = document.getElementById(`day-${selectedDay}`);
    const employeeCountSpan = dayElement.querySelector('.employee-count');
    employeeCountSpan.innerText = `${requiredEmployees} darbuotojų`;

    // Add updated class for permanent color change
    employeeCountSpan.classList.add('updated');
});

// Delete from calendar
document.getElementById('deleteFromCalendar').addEventListener('click', () => {
    const selectedDay = parseInt(selectDay.value);

    if (!selectedDay) {
        alert('Pasirinkite dieną.');
        return;
    }

    const dayElement = document.getElementById(`day-${selectedDay}`);
    const employeeCountSpan = dayElement.querySelector('.employee-count');

    // Reset employees and remove highlight
    employeeCountSpan.innerText = `0 darbuotojų`;
    employeeCountSpan.classList.remove('updated');
});
