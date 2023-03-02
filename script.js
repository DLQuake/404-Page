$(document).ready(function () {
    // Pobierz wszystkie elementy o klasie "digit"
    var digits = $('.digit');

    // Dla każdego elementu ustaw animację opóźnienia w zależności od jego indeksu
    digits.each(function (index) {
        $(this).css('animation-delay', (index * 100) + 'ms');
    });
});