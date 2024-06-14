function slider() {
    var mainWindowSlider = tns({
        container: '.advantages__my-slider',
        controlsContainer: "#advantages__my__custom_controlsContainer", // Исправлено здесь
        prevButton: '#advantages__prev',
        nextButton: '#advantages__next',
        items: 2,
        nav: false,
        responsive: {}
    });
}

export default slider;
