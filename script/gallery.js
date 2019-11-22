const howManyImages = 22;
let currentImage = 1;

window.addEventListener('load', () => {
  const closeSlideshow = document.querySelector('#closeSlideshow');
  const slideshowWrapper = document.getElementById('slideshow');
  const imageWrapper = document.getElementById('slideshowImages');
  const nextImage = document.getElementById('nextImage');
  const previousImage = document.getElementById('previousImage');

  printImages();

  closeSlideshow.addEventListener('click', () => {
    slideshowWrapper.style.opacity = 0;
    imageWrapper.style.transform = 'scale(0.6)';

    setTimeout(() => {
      slideshowWrapper.classList.add('hide');
    }, 310);
  });

  slideshowWrapper.addEventListener('click', () => {
    // closeSlideshow.click();
  });

  nextImage.addEventListener('click', () => {
    currentImage++;

    if (currentImage === 23) {
      currentImage = 1;
    }

    document.getElementById('currentImage').src = `../img/gallery/gallery (${currentImage}).jpg`;
  });

  previousImage.addEventListener('click', () => {
    currentImage--;

    if (currentImage === 0) {
      currentImage = 22;
    }

    document.getElementById('currentImage').src = `../img/gallery/gallery (${currentImage}).jpg`;
  });
});

window.addEventListener('resize', () => {
  initButtonWrapper();  
})

function printImages() {
  const contentSlideshowWrapper = document.querySelector('#images');
  let newRow = document.createElement('div');
  let rowCounter = 0;

  for (let i = 0; i < howManyImages; i++) {
    const newImage = document.createElement('img');

    newImage.src = `../img/gallery/gallery (${i+1}).jpg`;
    newImage.alt = 'cannot display image';

    if (i !== 15) newImage.classList.add('image');
    else newImage.classList.add('panorama');

    newImage.addEventListener('click', () => {
      const slideshowWrapper = document.getElementById('slideshow');
      const imageWrapper = document.getElementById('slideshowImages');
      slideshowWrapper.classList.remove('hide');

      currentImage = i + 1;
      
      document.getElementById('currentImage').src = `../img/gallery/gallery (${i+1}).jpg`;

      initButtonWrapper();
      
      setTimeout(() => {
        slideshowWrapper.style.opacity = 1;
        imageWrapper.style.transform = 'scale(1)';
      }, 10);
    });
    
    newRow.appendChild(newImage);
    
    rowCounter++;
    
    if ((rowCounter) % 3 === 0 || i === 15) {
      contentSlideshowWrapper.appendChild(newRow);
      newRow = document.createElement('div');
      rowCounter = 0;
    }
  }
}

function initButtonWrapper() {
  const buttonWrapper = document.getElementsByClassName('buttonWrapper');

  console.log(document.getElementById('currentImage').clientHeight + 'px');
  
  
  for (const wrapper of buttonWrapper) {
    wrapper.style.height = document.getElementById('currentImage').clientHeight + 'px';
  }
}