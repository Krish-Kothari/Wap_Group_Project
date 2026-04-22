import { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weeks = [];
  let day = 1;
  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        week.push(null);
      } else if (day > daysInMonth) {
        week.push(null);
      } else {
        week.push(day);
        day++;
      }
    }
    weeks.push(week);
    if (day > daysInMonth) break;
  }

  const isToday = (d) => {
    const today = new Date();
    return d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>◀</button>
        <span className="month-year">{monthNames[month]} {year}</span>
        <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>▶</button>
      </div>

      <div className="calendar-weekdays">
        {weekDays.map(day => <div key={day}>{day}</div>)}
      </div>

      <div className="calendar-grid">
        {weeks.map((week, i) => (
          <div key={i} className="calendar-week">
            {week.map((day, j) => (
              <div
                key={j}
                className={`calendar-day ${day && isToday(day) ? 'today' : ''}`}
              >
                {day || ''}
              </div>
            ))}
          </div>
        ))}
      </div>

      <button className="today-btn" onClick={() => setCurrentDate(new Date())}>
        Today
      </button>
    </div>
  );
};

export default Calendar;
