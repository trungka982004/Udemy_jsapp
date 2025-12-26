const colorPicker = document.getElementById('colorPicker');
const colorInput = document.getElementById('colorInput');   

function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}

colorPicker.addEventListener('input', function() {
    changeBackgroundColor(colorPicker.value);
    colorInput.value = colorPicker.value;
});

colorInput.addEventListener('input', function() {
    changeBackgroundColor(colorInput.value);
});