const howManyImages = 22;

window.addEventListener('load', () => {
    const imageWrapper = document.querySelector('#images');
    const slideshowImages = document.querySelector('#slideshowImages');
    const slideshowWrapper = document.getElementById('slideshowWrapper');
    const disableSlideshow = document.getElementById('disableSlideshow');
    const previousImage = document.getElementById('previousImage');
    const nextImage = document.getElementById('nextImage');
    const close = document.getElementById('close');
    const width = 70;
    let newRow = document.createElement('div');
    let rowCounter = 0;

    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' && parseInt(slideshowImages.style.left) - width >= (howManyImages - 1) * (width * (-1)))  {
            nextImage.click();
        } else if (event.key === 'ArrowLeft' && (parseInt(slideshowImages.style.left) + width) <= 0) {
            previousImage.click();
        }
    });

    nextImage.addEventListener('click', () => {
        slideshowImages.style.left = `${parseInt(slideshowImages.style.left) - width}vw`;
    });

    previousImage.addEventListener('click', () => {
        slideshowImages.style.left = `${parseInt(slideshowImages.style.left) + width}vw`;
    });

    close.addEventListener('click', () => {
        disableSlideshow.click();
    });

    disableSlideshow.addEventListener('click', () => {
        slideshowWrapper.style.opacity = 0; 
        slideshowWrapper.style.transform = 'scale(1.3)'; 

        setTimeout(() => {
            slideshowImages.style.transition = 'none';
            slideshowWrapper.classList.add('hide');
            disableSlideshow.classList.add('hide');
            document.body.classList.remove('overflowHidden');
        }, 260);
    });

    for (let i = 0; i < howManyImages; i++) {
        const newImage = document.createElement('img');
        const newSlideshowImage = document.createElement('img');

        newImage.src = `../img/gallery/gallery (${i+1}).jpg`;
        newImage.alt = 'cannot display image';

        newSlideshowImage.src = `../img/gallery/gallery (${i+1}).jpg`;
        newSlideshowImage.alt = 'cannot display image';

        if (i === 12) newSlideshowImage.classList.add('panorama');

        slideshowImages.appendChild(newSlideshowImage);

        if (i !== 12) {
            newImage.classList.add('image');  
        } else {
            newImage.classList.add('panorama');
        }

        newImage.addEventListener('click', () => {
            slideshowWrapper.classList.remove('hide');
            disableSlideshow.classList.remove('hide');
            document.body.classList.add('overflowHidden');

            setTimeout(() => {
                slideshowImages.style.left = `${i * -70}vw`;
                slideshowWrapper.style.opacity = 1; 
                slideshowWrapper.style.transform = 'scale(1)';
            }, 10);

            setTimeout(() => {
                slideshowImages.style.transition = 'left 500ms ease-in-out';
            }, 200);
        });
        
        newRow.appendChild(newImage);
        
        rowCounter++;
        
        if (((rowCounter) % 4 === 0 || i === 12)) {
            imageWrapper.appendChild(newRow);
            newRow = document.createElement('div');
            rowCounter = 0;
        }
    }
});