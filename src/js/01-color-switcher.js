const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

stopBtn.disabled = true;

let timerId = null;

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  setDisabled(startBtn, true);
  setDisabled(stopBtn, false);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);

  setDisabled(startBtn, false);
  setDisabled(stopBtn, true);
});

function setDisabled(element, isDisabled) {
  if (isDisabled) {
    element.setAttribute('disabled', '');
  } else {
    element.removeAttribute('disabled');
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
