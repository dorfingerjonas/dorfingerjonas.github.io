window.addEventListener('load', () => {
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

    firebase.database().ref('/public/work/').once('value').then((snapshot) => {
        const contentwrapper = document.getElementById('content');
        const works = [];

        for (const key in snapshot.val()) {
            works.push(snapshot.val()[key]);
        }

        for (let i = 0; i < works.length; i++) {
            for (let j = i; j < works.length; j++) {
                if (works[i].priority > works[j].priority) {
                    const temp = works[i];
                    works[i] = works[j];
                    works[j] = temp;
                }
            }   
        }

        for (const work of works) {
            const newWork = document.createElement('div');
            newWork.classList.add('work');

            const workName = document.createElement('h2');
            const description = document.createElement('p');

            workName.textContent = work.name;
            description.textContent = work.description;

            newWork.appendChild(workName);
            newWork.appendChild(description);
            // if (createPlatformWrapper(work.platform) !== null) newWork.appendChild(createPlatformWrapper(work.platform));
            // newWork.appendChild(document.createElement('hr'));
            contentwrapper.appendChild(newWork);
        }
    });

    function createPlatformWrapper(platforms) {
        if (platforms !== undefined) {
            const platformWrapper = document.createElement('div');

            for (const platform of platforms) {
                if (platform === 'Web') {
                    const icon = document.createElement('i');
                    icon.setAttribute('class', 'fas fa-globe-americas');
                    icon.title = platform;
                    platformWrapper.appendChild(icon);
                } else if (platform === 'Android') {
                    const icon = document.createElement('i');
                    icon.setAttribute('class', 'fab fa-android');
                    icon.title = platform;
                    platformWrapper.appendChild(icon);
                } else if (platform === 'IOS') {
                    const icon = document.createElement('i');
                    icon.setAttribute('class', 'fab fa-apple');
                    icon.title = platform;
                    platformWrapper.appendChild(icon);
                } else if (platform === 'Windows') {
                    const icon = document.createElement('i');
                    icon.setAttribute('class', 'fab fa-windows');
                    icon.title = platform;
                    platformWrapper.appendChild(icon);
                }
            }

            return platformWrapper;
        } else {
            return null;
        }
    }
});