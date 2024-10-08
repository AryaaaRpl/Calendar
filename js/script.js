let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let today = date.getDate();

const day = document.querySelector(".calendar-dates");
const currdate = document.querySelector(".calendar-current-date");
const prenexIcons = document.querySelectorAll(".calendar-navigation span");
const holidayList = document.getElementById("holiday-list");

currdate.textContent = `${getMonthName(month - 1)} ${year}`;

function getMonthName(month) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[month];
}

function prevMonth() {
    month--;
    if (month < 1) {
        month = 12;
        year--;
    }
    updateCalendar();
}

function nextMonth() {
    month++;
    if (month > 12) {
        month = 1;
        year++;
    }
    updateCalendar();
}

function updateCalendar() {
    currdate.textContent = `${getMonthName(month - 1)} ${year}`;
    const calendarGrid = document.querySelector(".calendar-grid tbody");
    calendarGrid.innerHTML = "";
    const firstDay = new Date(year, month - 1, 1);
    const firstDayOfWeek = firstDay.getDay();
    const lastDay = new Date(year, month, 0);
    const lastDate = lastDay.getDate();
    let dayCounter = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");
            if (i === 0 && j < firstDayOfWeek) {
                cell.textContent = "";
            } else if (dayCounter > lastDate) {
                cell.textContent = "";
            } else {
                cell.textContent = dayCounter;
                if (dayCounter === today && month === date.getMonth() + 1 && year === date.getFullYear()) {
                    cell.classList.add("today");
                }
                dayCounter++;
            }
            row.appendChild(cell);
        }
        calendarGrid.appendChild(row);
    }
    predictHolidays();
}

function predictHolidays() {
    const holidays = [
        { date: new Date(year, 0, 1), name: "Tahun Baru Masehi" },
        { date: new Date(year, 1, 14), name: "Hari Valentine" },
        { date: new Date(year, 2, 17), name: "Hari Raya Nyepi" },
        { date: new Date(year, 3, 1), name: "April Mop" },
        { date: new Date(year, 4, 1), name: "Hari Buruh Internasional" },
        { date: new Date(year, 4, 20), name: "Hari Kebangsaan Pancasila" },
        { date: new Date(year, 5, 1), name: "Hari Lahir Pancasila" },
        { date: new Date(year, 6, 17), name: "Hari Kemerdekaan RI" },
        { date: new Date(year, 8, 11), name: "Hari Raya Idul Fitri" },
        { date: new Date(year, 9, 31), name: "Hari Raya Idul Adha" },
        { date: new Date(year, 10, 25), name: "Hari Raya Natal" },
    ];
    const upcomingHolidays = holidays.filter(holiday => holiday.date > new Date());
    holidayList.innerHTML = "";
    upcomingHolidays.forEach(holiday => {
        const li = document.createElement("li");
        li.textContent = `${holiday.name} - ${holiday.date.toLocaleDateString()}`;
        holidayList.appendChild(li);
    });
}

updateCalendar();

const player = new Plyr('#background-video', {
    controls: false,
    autoplay: true,
    loop: true,
    muted: true,
  });