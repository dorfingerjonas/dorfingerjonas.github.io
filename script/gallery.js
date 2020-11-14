window.addEventListener('load', () => {
    const storage = firebase.storage();
    const listRef = storage.ref().child('gallery/preview');
    const imageWrapper = document.getElementById('images');

    listRef.listAll().then(res => {
        createColumns(4);
        createImages(res.items.length);

        res.items.forEach(itemRef => {
            storage.ref(itemRef.fullPath).getDownloadURL().then(url => {
                document.getElementById(`image${getIdOfPath(itemRef.fullPath)}`).src = url;
            }).catch(err => {
                console.error(err.message);
            }); 
        });
    }).catch(err => {
        console.error(err.message);
    });

    function createColumns(amount) {
        for (let i = 0; i < amount; i++) {
            const column = document.createElement('div');
    
            column.id = `column${i + 1}`;
            column.classList.add('column');
    
            imageWrapper.appendChild(column);
        }
    }

    function createImages(amount) {
        for (let i = 0; i < amount; i++) {
            const newImage = document.createElement('img');

            newImage.alt = 'cannot display image';
            newImage.id = `image${i + 1}`;
            newImage.classList.add('image');

            document.getElementById(`column${((i + 1) % 4) + 1}`).appendChild(newImage);
        }
    }

    function getIdOfPath(path) {
        return parseInt(path.substring(25, path.length - 5));
    }
});
