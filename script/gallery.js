window.addEventListener('load', () => {
    const imageWrapper = document.getElementById('images');

    for (let i = 0; i < 4; i++) {
        const column = document.createElement('div');

        column.id = `column${i + 1}`;
        column.classList.add('column');

        imageWrapper.appendChild(column);
    }

    for (let i = 1; i <= 24; i++) {
        const newImage = document.createElement('img');
        newImage.src = `../img/gallery/gallery_(${i}).jpg`;
        newImage.alt = 'cannot display image';
        newImage.classList.add('image');
        document.getElementById(`column${(i % 4) + 1}`).appendChild(newImage);
    }
});
