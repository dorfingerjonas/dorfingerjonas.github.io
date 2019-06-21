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

  printRepos();

  function printRepos() {
    toggleAnimation();
    firebase.database().ref('public/repos').once('value').then((snapshot) => {

      let content;
      let entries = [];

      content = snapshot.val();

      // Fill Array with Database Content
      for (let index in content) {
        entries[entries.length] = content[index];
      }

      console.log(entries);
      

      for (let i = 0; i < entries.length; i++) {
          let name = entries[i].name;
          name = name.replace(' ', '-');
          name = name.toLowerCase();
          let desc = entries[i].description;
          let demo = entries[i].demo;
          let repo = entries[i].repo;
          let lang = entries[i].lang;
          let state = entries[i].state;
          state = 'state: ' + state;

        let contentWrapper = document.getElementById('repoWrapper');
        let newRepo = document.createElement('div');

        newRepo.classList.add('repo');

        let descBox = document.createElement('p');
        let demoBox = document.createElement('a');
        let nameBox = document.createElement('h2');
        let repoBox = document.createElement('a');
        let stateBox = document.createElement('p');
        let buttonBox = document.createElement('div');
        let img = document.createElement('img');

        let eintragData = [nameBox, descBox, stateBox];
        let outputArr = [name, desc, state];

        for (let i = 0; i < outputArr.length; i++) {
            eintragData[i].textContent = outputArr[i];            
            newRepo.appendChild(eintragData[i]);
        }

        if (demo !== 'none') {
            demoBox.href = 'https://' + demo;
            demoBox.target = '_blank';
            demoBox.textContent = 'Preview';
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
        document.getElementById('addBtnWrapper').style.display = 'flex';

      }
      toggleAnimation();
    });
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (user.uid === 'eFslsgqr1XZ9kHuGMQPdrfgmc0E3') {
        createAddButton();
      }
      console.log("logged in");
      
    } else {
      deleteAddButton();
      console.log("not logged in");
    }
  });
});

function createAddButton() {
  const wrapper = document.getElementById('addBtnWrapper');
  let buttonElm = document.createElement('div');
  let iElm = document.createElement('i');
  
  iElm.classList.add('fas');
  iElm.classList.add('fa-plus');

  wrapper.appendChild(buttonElm.appendChild(iElm));

  iElm.style.transform = 'rotateZ(0deg)';

  wrapper.addEventListener('click', () => {

    const addRepoWndw = document.getElementById('addRepoWndw');
    const addRepoBtn = document.getElementById('addRepoBtn');

    if (iElm.style.transform === 'rotateZ(0deg)') {
      iElm.style.transform = 'rotateZ(45deg)';
      addRepoWndw.style.display = 'flex';
      addRepoBtn.addEventListener('click', addNewRepo);
    } else {
      iElm.style.transform = 'rotateZ(0)';
      addRepoWndw.style.display = 'none';
      addRepoBtn.removeEventListener('click', addNewRepo);
    }
  });

  function addNewRepo() {
    let name = document.getElementById('repoName').value;
    const desc = document.getElementById('repoDesc').value;
    const state = document.getElementById('repoState').value;
    const lang = document.getElementById('repoLang').value;
    const demo = document.getElementById('repoDemo').value;
    const repo = document.getElementById('repoRepo').value;

    while (name.includes('.')) {
      name = name.replace('.', '-');
    }
  
    firebase.database().ref('public/repos/' + name).set({
      name: name,
      description: desc,
      state: state,
      lang: lang,
      demo: demo,
      repo: repo
    }, (error) => {
      if (error) {
        console.log('couldnt add new repo');
        console.error(error);
      } else {
        console.log('added new repo');
        wrapper.click();
        printRepos();
        const repoWrapper = document.getElementById('repoWrapper');
        while (repoWrapper.firstChild) repoWrapper.removeChild(repoWrapper.firstChild);
      }
    });
  }
}

function toggleAnimation() {
  const repoLoader = document.getElementById('repoLoader')
  const elements = repoLoader.getElementsByTagName('div');

  repoLoader.classList.toggle('hide');

  elements[0].classList.toggle('animate');

  setTimeout(() => {
    elements[1].classList.toggle('animate');
  }, 250);

  setTimeout(() => {
    elements[2].classList.toggle('animate');
  }, 500);
}

function deleteAddButton() {
  const wrapper = document.getElementById('addBtnWrapper');
  while (wrapper.firstChild) wrapperr.removeChild(wrapper.firstChild);
      
}