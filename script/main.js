window.addEventListener('load', () => {
    const showMoreWorkButton = document.getElementById('showMoreWorkButton');
    const showMoreImagesButton = document.getElementById('showMoreImagesButton');
    showMoreWorkButton.showMore = true;
    showMoreImagesButton.showMore = true;

    AOS.init();

    showMoreWorkButton.addEventListener('click', () => {
        if (showMoreWorkButton.showMore) {
            const entries = document.getElementsByClassName('work');

            for (const entry of entries) {
                entry.classList.remove('hide');
            }

            showMoreWorkButton.textContent = 'show less';
        } else {
            const entries = document.getElementsByClassName('work');
            
            for (let i = 3; i < entries.length; i++) {
                entries[i].classList.add('hide');
            }

            showMoreWorkButton.textContent = 'show more';
        }

        showMoreWorkButton.showMore = !showMoreWorkButton.showMore;
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
});