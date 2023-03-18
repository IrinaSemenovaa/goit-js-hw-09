import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('.btn-start'),
  daysTimer: document.querySelector('[data-days]'),
  hoursTimer: document.querySelector('[data-hours]'),
  minutesTimer: document.querySelector('[data-minutes]'),
  secondsTimer: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', handleTimerStart);

let timerId = null;

const fp = flatpickr(refs.input, {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  minDate: 'today',
  allowInput: true,
  time_24hr: true,
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chosenDate = selectedDates[0];

    const currentTime = Date.now();

    if (chosenDate < currentTime) {
      refs.startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }

    refs.startBtn.disabled = false;
  },
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function handleTimerStart() {
  const selectedDate = fp.selectedDates[0];

  timerId = setInterval(() => {
    const startTime = Date.now();
    const countdown = selectedDate - startTime;
    refs.startBtn.disabled = true;

    if (countdown < 0) {
      clearInterval(timerId);

      successMessage();
      return;
    }
    showCountdown(convertMs(countdown));
  }, 1000);
}

function successMessage() {
  Notiflix.Notify.success('Time is up!');
}

function showCountdown({ days, hours, minutes, seconds }) {
  refs.daysTimer.textContent = addLeadingZero(days);
  refs.hoursTimer.textContent = addLeadingZero(hours);
  refs.minutesTimer.textContent = addLeadingZero(minutes);
  refs.secondsTimer.textContent = addLeadingZero(seconds);
}

Notiflix.Notify.init({
  position: 'center-top',
});
