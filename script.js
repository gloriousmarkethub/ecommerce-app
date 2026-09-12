// List of common timezones
const TIMEZONES = [
    { name: 'New York', tz: 'America/New_York' },
    { name: 'Los Angeles', tz: 'America/Los_Angeles' },
    { name: 'London', tz: 'Europe/London' },
    { name: 'Paris', tz: 'Europe/Paris' },
    { name: 'Tokyo', tz: 'Asia/Tokyo' },
    { name: 'Sydney', tz: 'Australia/Sydney' },
    { name: 'Dubai', tz: 'Asia/Dubai' },
    { name: 'Singapore', tz: 'Asia/Singapore' },
    { name: 'Hong Kong', tz: 'Asia/Hong_Kong' },
    { name: 'Mumbai', tz: 'Asia/Kolkata' },
    { name: 'Bangkok', tz: 'Asia/Bangkok' },
    { name: 'Mexico City', tz: 'America/Mexico_City' },
    { name: 'São Paulo', tz: 'America/Sao_Paulo' },
    { name: 'Cairo', tz: 'Africa/Cairo' },
    { name: 'Moscow', tz: 'Europe/Moscow' },
    { name: 'Istanbul', tz: 'Europe/Istanbul' },
    { name: 'Seoul', tz: 'Asia/Seoul' },
    { name: 'Auckland', tz: 'Pacific/Auckland' },
];

// Default timezones to display
let selectedTimezones = [
    { name: 'New York', tz: 'America/New_York' },
    { name: 'London', tz: 'Europe/London' },
    { name: 'Tokyo', tz: 'Asia/Tokyo' },
    { name: 'Sydney', tz: 'Australia/Sydney' },
];

// Initialize the app
function init() {
    renderClocks();
    renderTimezoneSelector();
    updateClocks();
    setInterval(updateClocks, 1000);
}

// Render clock cards
function renderClocks() {
    const clockGrid = document.getElementById('clockGrid');
    clockGrid.innerHTML = '';

    selectedTimezones.forEach((timezone, index) => {
        const clockCard = document.createElement('div');
        clockCard.className = 'clock-card';
        clockCard.innerHTML = `
            <div class="timezone">${timezone.name}</div>
            <div class="time-display" id="time-${index}">--:--:--</div>
            <div class="date-display" id="date-${index}">Loading...</div>
            <button class="remove-btn" onclick="removeTimezone(${index})">Remove</button>
        `;
        clockGrid.appendChild(clockCard);
    });
}

// Update all clock displays
function updateClocks() {
    selectedTimezones.forEach((timezone, index) => {
        const now = new Date();
        
        // Get time in specified timezone
        const timeString = now.toLocaleTimeString('en-US', {
            timeZone: timezone.tz,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        // Get date in specified timezone
        const dateString = now.toLocaleDateString('en-US', {
            timeZone: timezone.tz,
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        // Update DOM
        const timeElement = document.getElementById(`time-${index}`);
        const dateElement = document.getElementById(`date-${index}`);

        if (timeElement) timeElement.textContent = timeString;
        if (dateElement) dateElement.textContent = dateString;
    });
}

// Render timezone selector
function renderTimezoneSelector() {
    const container = document.querySelector('.container');
    const sectionExists = document.querySelector('.add-timezone-section');

    if (sectionExists) return; // Already rendered

    const section = document.createElement('div');
    section.className = 'add-timezone-section';
    section.innerHTML = `
        <h2>Add Timezone</h2>
        <div class="timezone-input-group">
            <select id="timezoneSelect">
                <option value="">Select a timezone...</option>
                ${TIMEZONES.map(tz => `<option value="${tz.tz}">${tz.name}</option>`).join('')}
            </select>
            <button onclick="addTimezone()">Add</button>
        </div>
    `;

    container.insertBefore(section, container.querySelector('.clock-grid'));
}

// Add a new timezone
function addTimezone() {
    const select = document.getElementById('timezoneSelect');
    const tzValue = select.value;

    if (!tzValue) {
        alert('Please select a timezone');
        return;
    }

    // Find the timezone object
    const tzObject = TIMEZONES.find(tz => tz.tz === tzValue);

    // Check if already added
    if (selectedTimezones.some(tz => tz.tz === tzValue)) {
        alert('This timezone is already added');
        return;
    }

    selectedTimezones.push(tzObject);
    select.value = '';
    renderClocks();
    updateClocks();
}

// Remove a timezone
function removeTimezone(index) {
    selectedTimezones.splice(index, 1);
    renderClocks();
}

// Start the app
init();