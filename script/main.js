window.addEventListener('load', () => {
    const workWrapper = document.getElementById('workWrapper');
    const currentWorkPart = document.getElementsByClassName('currentWorkPart');
    let width = 50;
    let interval;
    let isFirstPageActive = true;

    AOS.init();
    
    if (outerWidth > outerHeight) {
        createInterval();
        workWrapper.style.left = `${width}vw`;
    } else {
        workWrapper.style.left = 0;
    }

    window.addEventListener('resize', () => {
        if (outerWidth < outerHeight) {
            clearInterval(interval);
            workWrapper.style.left = 0;

            console.log(document.getElementsByTagName('nav')[0].clientLeft);
        } else {
            document.body.classList.remove('overflowHidden');
        }
    });

    currentWorkPart[0].addEventListener('click', () => {
        workWrapper.style.left = `${width}vw`;
        currentWorkPart[0].style.background = 'lightgray';
        currentWorkPart[1].style.background = 'white';
        createInterval();
    });

    currentWorkPart[1].addEventListener('click', () => {
        workWrapper.style.left = `-${width}vw`;
        currentWorkPart[0].style.background = 'white';
        currentWorkPart[1].style.background = 'lightgray';
        createInterval();
    });
    
    function createInterval() {
        clearInterval(interval);

        isFirstPageActive = !isFirstPageActive;

        interval = setInterval(() => {
            if (isFirstPageActive) {
                currentWorkPart[1].click();
            } else {
                currentWorkPart[0].click();
            }
        }, 15000);
    }
});