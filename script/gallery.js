const howManyImages = 21;
let imageIndex = 0;

window.addEventListener('load', () => {
    const imageWrapper = document.querySelector('#images');
    const slideshowImages = document.querySelector('#slideshowImages');
    const slideshowWrapper = document.getElementById('slideshowWrapper');
    const disableSlideshow = document.getElementById('disableSlideshow');
    const previousImage = document.getElementById('previousImageBtn');
    const nextImage = document.getElementById('nextImageBtn');
    const close = document.getElementById('close');
    const width = 70;
    let newRow = document.createElement('div');
    let rowCounter = 0;

    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight')  {
            nextImage.click();
        } else if (event.key === 'ArrowLeft') {
            previousImage.click();
        }
    });

    previousImage.addEventListener('click', () => {
        if (parseInt(slideshowImages.style.left) + width <= 0) {
            slideshowImages.style.left = `${parseInt(slideshowImages.style.left) + width}vw`;
        }
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

        newImage.src = `../img/gallery/gallery (${i+1}).jpg`;
        newImage.alt = 'cannot display image';

        if (i !== 12) {
            newImage.classList.add('image');  
        } else {
            newImage.classList.add('panorama');
        }
        
        newRow.appendChild(newImage);

        if (i > 11) {
            newRow.classList.add('hide');
        }
        
        rowCounter++;
        
        if (((rowCounter) % 4 === 0 || i === 12)) {
            imageWrapper.appendChild(newRow);
            newRow = document.createElement('div');
            rowCounter = 0;
        }
    }
});