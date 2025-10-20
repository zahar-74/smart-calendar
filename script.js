let currentUser = null;

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    fetch('login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${email}&password=${password}`
    }).then(response => response.text()).then(data => {
        if (data === 'Login successful') {
            currentUser = true;
            showDashboard();
        } else {
            alert(data);
        }
    });
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const userType = document.getElementById('regType').value;
    fetch('register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `name=${name}&email=${email}&password=${password}&user_type=${userType}`
    }).then(response => response.text()).then(data => {
        alert(data);
        if (data === 'Registration successful') {
            showLogin();
        }
    });
});

document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('eventTitle').value;
    const description = document.getElementById('eventDesc').value;
    const start = document.getElementById('eventStart').value;
    const end = document.getElementById('eventEnd').value;
    const location = document.getElementById('eventLocation').value;
    const participants = document.getElementById('eventParticipants').value.split(',');
    fetch('create_event.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `title=${title}&description=${description}&start_datetime=${start}&end_datetime=${end}&location=${location}&participants=${JSON.stringify(participants)}`
    }).then(response => response.text()).then(data => {
        alert(data);
        loadEvents();
        hideCreateEvent();
    });
});

function showLogin() {
    document.getElementById('login').classList.remove('hidden');
    document.getElementById('register').classList.add('hidden');
    document.getElementById('welcome').classList.add('hidden');
}

function showRegister() {
    document.getElementById('register').classList.remove('hidden');
    document.getElementById('login').classList.add('hidden');
    document.getElementById('welcome').classList.add('hidden');
}

function showDashboard() {
    document.getElementById('login').classList.add('hidden');
    document.getElementById('register').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
}

function logout() {
    fetch('logout.php').then(() => {
        currentUser = null;
        document.getElementById('dashboard').classList.add('hidden');
        showLogin();
    });
}

function showCalendar() {
    document.getElementById('calendar').classList.remove('hidden');
    document.getElementById('events').classList.add('hidden');
    document.getElementById('reminders').classList.add('hidden');
    document.getElementById('settings').classList.add('hidden');
    document.getElementById('importExport').classList.add('hidden');
    renderCalendar();
}

function showEvents() {
    document.getElementById('events').classList.remove('hidden');
    document.getElementById('calendar').classList.add('hidden');
    document.getElementById('reminders').classList.add('hidden');
    document.getElementById('settings').classList.add('hidden');
    document.getElementById('importExport').classList.add('hidden');
    loadEvents();
}

function showReminders() {
    document.getElementById('reminders').classList.remove('hidden');
    document.getElementById('calendar').classList.add('hidden');
    document.getElementById('events').classList.add('hidden');
    document.getElementById('settings').classList.add('hidden');
    document.getElementById('importExport').classList.add('hidden');
    loadReminders();
}

function showSettings() {
    document.getElementById('settings').classList.remove('hidden');
    document.getElementById('calendar').classList.add('hidden');
    document.getElementById('events').classList.add('hidden');
    document.getElementById('reminders').classList.add('hidden');
    document.getElementById('importExport').classList.add('hidden');
}

function showImportExport() {
    document.getElementById('importExport').classList.remove('hidden');
    document.getElementById('calendar').classList.add('hidden');
    document.getElementById('events').classList.add('hidden');
    document.getElementById('reminders').classList.add('hidden');
    document.getElementById('settings').classList.add('hidden');
}

function loadReminders() {
    fetch('reminders.php').then(response => response.json()).then(reminders => {
        let html = '<ul>';
        reminders.forEach(reminder => {
            html += `<li>${reminder.title} at ${reminder.start_datetime}</li>`;
        });
        html += '</ul>';
        document.getElementById('reminderList').innerHTML = html;
    });
}

function showCreateEvent() {
    document.getElementById('createEvent').classList.remove('hidden');
}

function hideCreateEvent() {
    document.getElementById('createEvent').classList.add('hidden');
}

function renderCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    let html = '<div class="day">Sun</div><div class="day">Mon</div><div class="day">Tue</div><div class="day">Wed</div><div class="day">Thu</div><div class="day">Fri</div><div class="day">Sat</div>';
    for (let i = 0; i < firstDay; i++) {
        html += '<div class="day"></div>';
    }
    for (let day = 1; day <= daysInMonth; day++) {
        html += `<div class="day">${day}</div>`;
    }
    document.getElementById('calendarView').innerHTML = html;
    // Load events and place them
    fetch('get_events.php').then(response => response.json()).then(events => {
        events.forEach(event => {
            const eventDate = new Date(event.start_datetime);
            if (eventDate.getMonth() === month && eventDate.getFullYear() === year) {
                const day = eventDate.getDate();
                const dayDiv = document.querySelector(`#calendarView .day:nth-child(${firstDay + day + 7})`);
                if (dayDiv) {
                    dayDiv.innerHTML += `<div class="event">${event.title}</div>`;
                }
            }
        });
    });
}

function loadEvents() {
    fetch('get_events.php').then(response => response.json()).then(events => {
        let html = '<ul>';
        events.forEach(event => {
            html += `<li>${event.title} - ${event.start_datetime} <button onclick="editEvent(${event.id})">Edit</button> <button onclick="deleteEvent(${event.id})">Delete</button></li>`;
        });
        html += '</ul>';
        document.getElementById('eventList').innerHTML = html;
    });
}

function editEvent(id) {
    // Simple edit: prompt for new title
    const newTitle = prompt('New title:');
    if (newTitle) {
        fetch('edit_event.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `event_id=${id}&title=${newTitle}&description=&start_datetime=&end_datetime=&location=&participants=[]`
        }).then(response => response.text()).then(data => {
            alert(data);
            loadEvents();
        });
    }
}

function deleteEvent(id) {
    if (confirm('Delete event?')) {
        fetch('delete_event.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `event_id=${id}`
        }).then(response => response.text()).then(data => {
            alert(data);
            loadEvents();
        });
    }
}
