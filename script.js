const UNAVAILABLE = 'The weather service is unavailable right now. Please try again later.';

const form = document.querySelector('.search');
const input = form.querySelector('input');
const message = document.getElementById('message');
const result = document.getElementById('result');

function formatTime(text) {
  // The lookup sends the time like "2026-10-31 14:30".
  const match = /^(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{2})$/.exec(text);
  if (!match) return text;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  const day = date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  });
  return day + ', ' + match[4].padStart(2, '0') + ':' + match[5];
}

function showWeather(data) {
  document.getElementById('place').textContent = data.city + ', ' + data.country;
  document.getElementById('time').textContent = formatTime(data.localTime);
  document.getElementById('temp').textContent = Math.round(data.temperatureC) + '°C';
  document.getElementById('icon').src = data.icon;
  document.getElementById('desc').textContent = data.description;
  document.getElementById('feels').textContent = Math.round(data.feelsLikeC) + '°C';
  document.getElementById('humidity').textContent = data.humidity + '%';
  document.getElementById('wind').textContent = Math.round(data.windKph) + ' km/h ' + data.windDirection;
  result.hidden = false;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  message.textContent = '';
  result.hidden = true;

  try {
    const response = await fetch('/api/weather?city=' + encodeURIComponent(input.value.trim()));
    const data = await response.json();
    if (!response.ok) {
      message.textContent = data.message || UNAVAILABLE;
      return;
    }
    showWeather(data);
  } catch (error) {
    message.textContent = UNAVAILABLE;
  }
});
