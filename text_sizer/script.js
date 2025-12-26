const text = document.getElementById('text');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');

let fontSize = 16; // Initial font size in pixels

increaseBtn.addEventListener('click', () => {
    fontSize += 2;
    text.style.fontSize = fontSize + 'px';
});

decreaseBtn.addEventListener('click', () => {
    if (fontSize > 10) {
        fontSize -= 2;
        text.style.fontSize = fontSize + 'px';
    }
});
