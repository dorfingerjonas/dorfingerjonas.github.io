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

    let content;
    let entries = [];

    firebase.database().ref('public/repos').once('value').then((snapshot) => {

      content = snapshot.val();

      // Fill Array with Database Content
      for (let index in content) {
        entries[entries.length] = content[index];
      }

      for (let i = 0; i < entries.length; i++) {
          let name = entries[i].name;
          let desc = entries[i].description;
          let demo = entries[i].demo;
          let repo = entries[i].repo;
          let lang = entries[i].lang;

        let contentWrapper = document.getElementById('repoWrapper');
        let newRepo = document.createElement('div');

        newRepo.classList.add('repo');

        let descBox = document.createElement('p');
        let demoBox = document.createElement('a');
        let nameBox = document.createElement('h2');
        let repoBox = document.createElement('a');
        let langBox = document.createElement('p');
        let buttonBox = document.createElement('div');
        let img = document.createElement('img');

        let eintragData = [nameBox, descBox];
        let outputArr = [name, desc];

        for (let i = 0; i < outputArr.length; i++) {
            eintragData[i].textContent = outputArr[i];            
            newRepo.appendChild(eintragData[i]);
        }

        if (demo !== 'none') {
            demoBox.href = 'https://' + demo;
            demoBox.target = '_blank';
            demoBox.textContent = 'Demo';
            demoBox.classList.add('button');
            buttonBox.appendChild(demoBox);
        }

        repoBox.href = 'https://' + repo;
        repoBox.target = '_blank';
        repoBox.textContent = 'Repository';
        repoBox.classList.add('button');
        buttonBox.appendChild(repoBox);

        buttonBox.classList.add('buttonBox');
        
        newRepo.appendChild(buttonBox);

        img.src = `../img/${lang}.png`;
        img.alt = 'cannot display image';
        img.title = lang;
        img.draggable = false;
        newRepo.appendChild(img);

        contentWrapper.appendChild(newRepo);
      }
    });
});