const slider = document.getElementById('color-slider');
const error404 = document.getElementById('error-404');

function updateFontSize() {
    const screenWidth = window.innerWidth;

    if (screenWidth > 1200) {
        error404.style.fontSize = '25rem';
    } else if (screenWidth > 768) {
        error404.style.fontSize = '20rem';
    } else {
        error404.style.fontSize = '15rem';
    }
}

// Funkcja do zmiany koloru "404" i aktualizacji suwaka
slider.addEventListener('input', function () {
    const hue = slider.value;
    error404.style.color = `hsl(${hue}, 100%, 50%)`;
    slider.style.background = `linear-gradient(to right,
                            hsl(0, 100%, 50%),
                            hsl(${hue}, 100%, 50%),
                            hsl(60, 100%, 50%),
                            hsl(120, 100%, 50%),
                            hsl(180, 100%, 50%),
                            hsl(240, 100%, 50%),
                            hsl(300, 100%, 50%),
                            hsl(360, 100%, 50%))`;
});

window.addEventListener('resize', updateFontSize);

updateFontSize();
