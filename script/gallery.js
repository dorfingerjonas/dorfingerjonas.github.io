const howManyImages = 21;
let imageIndex = 0;

window.addEventListener('load', () => {
    const imageWrapper = document.querySelector('#images');
    const slideshowImages = document.querySelector('#slideshowImages');
    const slideshowWrapper = document.getElementById('slideshowWrapper');
    const disableSlideshow = document.getElementById('disableSlideshow');
    const previousImage = document.getElementById('previousImageBtn');
    const slideShowImage = document.getElementById('slideShowImage');
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

    // nextImage.addEventListener('click', () => {
    //     if (parseInt(slideshowImages.style.left) - width >= (howManyImages - 1) * (width * (-1))) {
    //         slideshowImages.style.left = `-${width}vw`;

    //         setTimeout(() => {
    //             slideshowImages.style.opacity = 0;
    //             slideshowImages.style.transition = 'none';
    //             slideshowImages.style.left = `${width}vw`;

    //             imageIndex === howManyImages ? imageIndex = 1 : imageIndex++;
    //             slideShowImage.src = `../img/gallery/gallery (${imageIndex}).jpg`;
                
                
    //             setTimeout(() => {
    //                 slideshowImages.style.opacity = 1;
    //                 slideshowImages.style.transition = 'left 500ms ease-in-out';

    //                 setTimeout(() => {
    //                     slideshowImages.style.left = 0;
    //                 }, 5);
    //             }, 5);
    //         }, 505);


    //     }
    // });

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

        // newImage.addEventListener('click', () => {
        //     slideshowWrapper.classList.remove('hide');
        //     disableSlideshow.classList.remove('hide');
        //     document.body.classList.add('overflowHidden');

        //     slideShowImage.src = `../img/gallery/gallery (${i+1}).jpg`;

        //     imageIndex = i + 1;

        //     setTimeout(() => {
        //         slideshowWrapper.style.opacity = 1; 
        //         slideshowWrapper.style.transform = 'scale(1)';
        //     }, 10);

        //     setTimeout(() => {
        //         slideshowImages.style.transition = 'left 500ms ease-in-out';
        //     }, 200);
        // });
        
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