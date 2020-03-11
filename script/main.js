window.addEventListener('load', () => {
    const showMoreImagesButton = document.getElementById('showMoreImagesButton');
    const workWrapper = document.getElementById('workWrapper');
    const currentWorkPart = document.getElementsByClassName('currentWorkPart');
    let width = 50;
    let interval;
    let isFirstPageActive = true;
    showMoreImagesButton.showMore = true;

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

    
    showMoreImagesButton.addEventListener('click', () => {
        const entries = document.getElementById('images').childNodes;
        
        if (showMoreImagesButton.showMore) {
            for (const entry of entries) {
                entry.classList.remove('hide');
            }

            showMoreImagesButton.textContent = 'show less';
        } else {            
            for (let i = 3; i < entries.length; i++) {
                entries[i].classList.add('hide');
            }

            showMoreImagesButton.textContent = 'show more';
        }

        showMoreImagesButton.showMore = !showMoreImagesButton.showMore;
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