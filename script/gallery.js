window.addEventListener('load', () => {
  const howManyImages = 22;
  const contentWrapper = document.querySelector('#images');
  let newRow = document.createElement('div');
  let rowCounter = 0;

  for (let i = 0; i < howManyImages; i++) {
    const newImage = document.createElement('img');

    newImage.src = `../img/gallery/gallery (${i+1}).jpg`;
    newImage.alt = 'cannot display image';

    if (i !== 15) newImage.classList.add('image');
    else newImage.classList.add('panorama');
    
    newRow.appendChild(newImage);
    
    rowCounter++;
    
    if ((rowCounter) % 3 === 0 || i === 15) {
      contentWrapper.appendChild(newRow);
      newRow = document.createElement('div');
      rowCounter = 0;
    }
  }
});