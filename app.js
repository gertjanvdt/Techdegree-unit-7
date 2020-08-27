const alertBanner = document.getElementById('alert'); 
const trafficCanvas = document.getElementById('traffic-chart');
const dailyCanvas = document.getElementById('daily-chart');
const mobileCanvas = document.getElementById('mobile-chart');
const user = document.getElementById("userField");
const message = document.getElementById("messageField");
const send = document.getElementById("send");
const graphTime = document.querySelector('.traffic-nav-links');
const bellIcon = document.querySelector('.notify');
const notifyIcon = document.querySelector('.notification-icon');
const notifyList = document.querySelector('.list');

// ***** NOTIFICATION ICON *****

// If bell icon is clicked display notifications
bellIcon.addEventListener('click', (e) => {    
    if (notifyList.className === 'list unhidden') {
        notifyList.className = 'list hidden';
    } else {
        notifyList.className = 'list unhidden';
    }
});

// Check if one notification will be closed
notifyList.addEventListener('click', (e) => {
    if (e.target.innerHTML === 'X'){
        e.target.parentNode.remove();
    }
    removeNotifyIcon();
});

// Function to remove the notification ball when no more notifcations
function removeNotifyIcon() {
    if (notifyList.firstElementChild === null) { 
        notifyIcon.style.opacity =  '0'; 
    } 
}

// ***** ALERT BANNER *****
alertBanner.innerHTML = 
   ` 
   <div class="alert-banner">
    <p><span>&#9888;</span><strong> Alert:</strong> You have <strong>12</strong> unread messages</p>
    <p class="alert-banner-close">x</p>
    </div>
    `;

alertBanner.addEventListener('click', e => {
    const element = e.target;
    if (element.classList.contains("alert-banner-close")) {
    alertBanner.style.display = "none"
    }
});

// ***** TRAFFIC DATA GRAPH *****
let trafficData = {
    labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
    datasets: [{
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
    }]
};

let trafficDataHourly = {
    labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
    datasets: [{
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
    }]
};

let trafficDataDaily = {
    labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
    datasets: [{
        data: [2250, 1250, 900, 2500, 1500, 1050, 1300, 1850, 750, 1500, 2000],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
    }]
};

let trafficDataWeekly = {
    labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
    datasets: [{
        data: [2500, 1250, 1500, 2000, 800, 1500, 1250, 500, 1000, 1500, 750],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
    }]
};

let trafficDataMonthly = {
    labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
    datasets: [{
        data: [750, 2000, 500, 1500, 1000, 1900, 1250, 900, 500, 1750, 500],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
    }]
};

let trafficOptions = {
    aspectRatio: 2.5,
    animation: {
        duration: 0
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    },
    legend: {
        display: false
    }
};

// Listen for click on time period and set new period
graphTime.addEventListener('click', (e) => {
    if (e.target.textContent === 'Hourly') {
        trafficData = trafficDataHourly;
        setColorLink('Hourly');
    } else if (e.target.textContent === 'Daily') {
        trafficData = trafficDataDaily;
        setColorLink('Daily');
    } else if (e.target.textContent === 'Weekly') {
        trafficData = trafficDataWeekly
        setColorLink('Weekly');
    } else if (e.target.textContent === 'Monthly') {
        setColorLink('Monthly');
        trafficData = trafficDataMonthly;
    }

    let trafficChart = new Chart(trafficCanvas, {
        type: 'line',
        data: trafficData,
        options: trafficOptions
    });
})

// Set defailt of hourly graph
let trafficChart = new Chart(trafficCanvas, {
    type: 'line',
    data: trafficData,
    options: trafficOptions
});

// Function to change the coler of the time period
function setColorLink(button) {
    const buttons = document.getElementsByClassName('traffic-nav-link');
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].innerHTML === button) {
            buttons[i].className = 'traffic-nav-link active'
        } else {
            buttons[i].className = 'traffic-nav-link'
        }
    }
}

// ***** BAR GRAPH *****

const dailyData = {
    labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    datasets: [{
        label: '# of hits',
        data: [75, 115, 175, 125, 225, 200, 100],
        backgroundColor: '#7477BF',
        borderWidth: 1
    }]
};

const dailyOptions  = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    },
    legend: {
        display: false
    }
}

let dailyChart = new Chart(dailyCanvas, {
    type: 'bar',
    data: dailyData,
    options: dailyOptions
});

// ***** MOBILE CHART *****

const mobileData = {
    labels: ['Desktop', 'Tablet', 'Phones'],
    datasets: [{
        label: '# of users',
        data: [2000, 550, 500],
        borderWidth: 0,
        backgroundColor: [
            '#7477BF',
            '#78CF82',
            '#51B6C8',
        ]
    }]
};

const mobileOptions = {
    legend: {
        position: 'right',
        labels: {
            boxWidth: 20,
            fontStyle: 'bold    '
        }
    }
};

let  mobileChart = new Chart(mobileCanvas, {
    type: 'doughnut',
    data: mobileData,
    options: mobileOptions
});

// ***** CHECK SEND CONDITIONS *****

send.addEventListener('click', (e) => {
    // check if user and message are filled out
    if (user.value === '' && message.value === ''){
        alert('Please make sure both user and massage fields are filled out');
    } else if (user.value === '') {
        alert('Please make sure to fill in a user before sending');
    } else if (message.value === '') {
        alert('Please make sure to put in a message before sending');
    } else {
        alert(`Message send to ${user.value}`);
    }
});

// ***** AUTO COMPLETE *****
 const users = [
    'Victoria Chambers',
    'Dale Byrd',
    'Dawn Wood',
    'Dan Oliver',
    'Peter Griffin',
    'Walter White',
    'Frank Underwood',
    'Michael Scott',
    'Carrie Mathison',
 ];