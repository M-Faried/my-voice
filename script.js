const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textArea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

let voices = [];
const utterance = new SpeechSynthesisUtterance();

//////////////////////////////////////////////On Load

data.forEach(createBox);

toggleBtn.addEventListener('click', () => {
  document.getElementById('text-box').classList.toggle('show');
});

closeBtn.addEventListener('click', () => {
  document.getElementById('text-box').classList.remove('show');
});

speechSynthesis.addEventListener('voiceschanged', loadVoices);

voicesSelect.addEventListener('change', (e) => {
  utterance.voice = voices.find((voice) => voice.name === e.target.value);
});

readBtn.addEventListener('click', () => {
  utterance.text = textArea.value;
  speechSynthesis.speak(utterance);
});

/////////////////////////////////////////////Helper Functions

function loadVoices() {
  if (typeof speechSynthesis === 'undefined') {
    return;
  }

  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

function createBox(item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  //@todo add the speak event.
  box.addEventListener('click', () => {
    //Speaking the text.
    utterance.text = text;
    speechSynthesis.speak(utterance);

    //Adding the glow effect on when the box is clicked.
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}
