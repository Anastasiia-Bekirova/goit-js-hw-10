import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const numberOfDays = document.querySelector('.value[data-days]');
const numberOfHours = document.querySelector('.value[data-hours]');
const numberOfMinutes = document.querySelector('.value[data-minutes]');
const numberOfSeconds = document.querySelector('.value[data-seconds]');

let userSelectedDate = new Date();
 startBtn.setAttribute('disabled', true);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
        if (selectedDates[0].getTime() <= Date.now()) {
            startBtn.setAttribute('disabled', true);
            iziToast.warning({
    title: 'Caution',
                message: 'Please choose a date in the future',
    position: 'topCenter',
});

          
      } else {
          
            startBtn.removeAttribute('disabled'); 
            userSelectedDate = selectedDates[0];
        
          
      }
  },
};
flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', startingCountdown);

function startingCountdown() {
    startBtn.setAttribute('disabled', true);
    dateInput.setAttribute('disabled', true);
    const timerId = setInterval(() => {
        let deltaTime = userSelectedDate.getTime() - Date.now();
            
        let timeRemained = convertMs(deltaTime);
         if (deltaTime <= 0) {
             clearInterval(timerId);
             dateInput.removeAttribute('disabled');
             
         } else {
               timeRemainedTimer(timeRemained);
        }
                   
    }, 1000)
    
}

function timeRemainedTimer(time) {
    numberOfDays.textContent = addLeadingZero(time.days);
    numberOfHours.textContent = addLeadingZero(time.hours);
    numberOfMinutes.textContent = addLeadingZero(time.minutes);
     numberOfSeconds.textContent = addLeadingZero(time.seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
 return String(value).padStart(2, '0');
}
