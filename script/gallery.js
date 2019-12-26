const howManyImages = 22;
let currentImage = 1;

window.addEventListener('load', () => {
  const closeSlideshow = document.querySelector('#closeSlideshow');
  const slideshowWrapper = document.getElementById('slideshow');
  const imageWrapper = document.getElementById('slideshowImages');
  const nextImage = document.getElementById('nextImage');
  const previousImage = document.getElementById('previousImage');
  const disableSlideshow = document.getElementById('disableSlideshow');

  const firebaseConfig = {
    apiKey: "AIzaSyBd4ZNQRImSA-DLkRuQUShh8jqH-L9DVJM",
    authDomain: "jonas-dorfinger.firebaseapp.com",
    databaseURL: "https://jonas-dorfinger.firebaseio.com",
    projectId: "jonas-dorfinger",
    storageBucket: "jonas-dorfinger.appspot.com",
    messagingSenderId: "47344971189",
    appId: "1:47344971189:web:7dd58623493ae508"
  };

  firebase.initializeApp(firebaseConfig);

  printImages();

  closeSlideshow.addEventListener('click', () => {
    slideshowWrapper.style.opacity = 0;
    imageWrapper.style.transform = 'scale(0.6)';
    disableSlideshow.classList.add('hide');
    document.body.classList.remove('overflowHidden');

    setTimeout(() => {
      slideshowWrapper.classList.add('hide');
    }, 310);
  });

  disableSlideshow.addEventListener('click', () => {
    closeSlideshow.click();
  });

  nextImage.addEventListener('click', () => {
    currentImage++;

    if (currentImage === howManyImages + 1) {
      currentImage = 1;
    }

    document.getElementById('currentImage').src = `../img/gallery/gallery (${currentImage}).jpg`;
  });

  previousImage.addEventListener('click', () => {
    currentImage--;

    if (currentImage === 0) {
      currentImage = howManyImages;
    }

    document.getElementById('currentImage').src = `../img/gallery/gallery (${currentImage}).jpg`;
  });
});

window.addEventListener('resize', () => {
  initButtonWrapper();  
});

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

      disableSlideshow.classList.remove('hide');
      document.body.classList.add('overflowHidden');
      
      setTimeout(() => {
        slideshowWrapper.style.opacity = 1;
        imageWrapper.style.transform = 'scale(1)';
      }, 10);
    });
    
    newRow.appendChild(newImage);
    
    rowCounter++;
    
    if (((rowCounter) % 3 === 0 || i === 15) && window.innerWidth >= 1160) {
      contentSlideshowWrapper.appendChild(newRow);
      newRow = document.createElement('div');
      rowCounter = 0;
    } else if (window.innerWidth < 1160) {
      contentSlideshowWrapper.appendChild(newImage);
    }
  }
}

function initButtonWrapper() {
  const buttonWrapper = document.getElementsByClassName('buttonWrapper');  
  
  for (const wrapper of buttonWrapper) {
    wrapper.style.height = document.getElementById('currentImage').clientHeight + 'px';
  }
}

function getPaths() {
  const storage = firebase.storage();
  const storageRef = storage.ref();
  const directory = storageRef.child('gallery');
  const paths = [];

  directory.listAll().then((res) => {
    for (const image of res['items']) {
      const imagesRef = storageRef.child(image.fullPath);
      
      imagesRef.getDownloadURL().then((url) => {
        paths.push(url);

        if (paths.length >= 2) {
          for (let i = 0; i < paths.length; i++) {
            for (let j = i; j < paths.length; j++) {
              console.log(paths);
              
              let path1 = paths[i].location.path;
              let path2 = paths[j].location.path;
              
              let parts = path1.split('(');
              parts = parts[1].split(')');
              path1 = parseInt(parts[0]);
              
              parts = path2.split('(');
              parts = parts[1].split(')');
              path2 = parseInt(parts[0]);
        
              console.log(path1);
              console.log(path2);
              
              if (path1 > path2) {
                const temp = paths[i];
                paths[i] = paths[j];
                paths[j] = temp;
              }
            }
          }
        }
        // const newImage = document.createElement('img');

        // newImage.src = url;
        // newImage.alt = 'cannot display image';

        // newImage.classList.add('image');

        // newImage.addEventListener('click', () => {
        //   const slideshowWrapper = document.getElementById('slideshow');
        //   const imageWrapper = document.getElementById('slideshowImages');
        //   slideshowWrapper.classList.remove('hide');

        //   currentImage = i + 1;
          
        //   document.getElementById('currentImage').src = url;

        //   initButtonWrapper();
          
        //   setTimeout(() => {
        //     slideshowWrapper.style.opacity = 1;
        //     imageWrapper.style.transform = 'scale(1)';
        //   }, 10);
        // });
        
        // newRow.appendChild(newImage);
        
        // rowCounter++;
        
        // if ((rowCounter) % 3 === 0) {
        //   contentSlideshowWrapper.appendChild(newRow);
        //   newRow = document.createElement('div');
        //   rowCounter = 0;
        // }
        console.log(paths.length);
      });

      // i++; 
    }
  });

  console.log(paths);

  return paths;
}