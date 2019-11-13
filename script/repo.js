window.addEventListener('load', () => {
  const octokit = new Octokit();
  const entries = [];

  octokit.request("GET https://api.github.com/users/:username/repos", {
    username: 'dorfingerjonas',
    per_page: 100
  }).then(({data}) => {
    const contentWrapper = document.querySelector('#repoWrapper');
    
    for (const repo of data) {
      const newRepo = document.createElement('div');

      const name = repo.name;
      const language = repo.language;
      const description = repo.description;
      const lastUpdate = repo.pushed_at;
      const homepage = repo.homepage;

      const nameText = document.createElement('a');
      nameText.textContent = name;
      nameText.href = repo.html_url;
      nameText.classList.add('name');

      const infoWrapper = document.createElement('div');

      const descriptionWrapper = document.createElement('div');
      const descriptionText = document.createElement('p');
      descriptionText.textContent = description;

      const languageWrapper = document.createElement('div');
      const languageCircle = document.createElement('div');
      const languageText = document.createElement('p');

      const updateWrapper = document.createElement('div');
      const updateText = document.createElement('p');
      
      let parts = lastUpdate.split('T');
      const updated = new Date(parts[0]);
      updateText.textContent = `Updated on ${updated.getDate()} ${getMonthShortString(updated.getMonth() + 1)}`;

      updateWrapper.setAttribute('class', `updateWrapper`);
      updateWrapper.appendChild(updateText);

      languageCircle.setAttribute('class', `languageCircle ${language.toLowerCase()}`);
      languageText.textContent = language;

      languageWrapper.appendChild(languageCircle);
      languageWrapper.appendChild(languageText);

      const buttonWrapper = document.createElement('div');
      buttonWrapper.classList.add('buttonWrapper');

      if (homepage !== '' && homepage !== null) {
        const homepageBtn = document.createElement('a');
        homepageBtn.href = homepage;
        homepageBtn.innerHTML = '<i class="fas fa-globe-americas"></i>';
        homepageBtn.classList.add('button');
        buttonWrapper.appendChild(homepageBtn);
      }

      // const cloneBtn = document.createElement('input');
      // cloneBtn.value = repo.clone_url;
      // cloneBtn.innerHTML = '<i class="fas fa-clone"></i>';
      // cloneBtn.classList.add('cloneBtn');
      // cloneBtn.classList.add('button');
      // const popup = document.createElement('span');
      // popup.textContent = 'Copied!';
      // popup.classList.add('popupText');

      // cloneBtn.addEventListener('click', () => {
      //   popup.classList.toggle('show');
      // });

      // buttonWrapper.appendChild(cloneBtn);

      newRepo.classList.add('repo');
      languageWrapper.classList.add('languageWrapper');

      descriptionWrapper.appendChild(descriptionText);
      descriptionWrapper.classList.add('descriptionWrapper');

      infoWrapper.classList.add('infoWrapper');
      infoWrapper.appendChild(languageWrapper);
      infoWrapper.appendChild(updateWrapper);

      newRepo.appendChild(nameText);
      newRepo.appendChild(descriptionWrapper);
      newRepo.appendChild(infoWrapper);
      newRepo.appendChild(buttonWrapper);
      contentWrapper.appendChild(newRepo);
      entries.push({name: name, language: language.toLowerCase(), element: newRepo});
    }
    searchRepo();
  });

  function getMonthShortString(month) {
    switch (month) {
      case 1:
        return 'Jan';
      case 2:
        return 'Feb';
      case 3:
        return 'Mar';
      case 4:
        return 'Apr';
      case 5:
        return 'May';
      case 6:
        return 'Jun';
      case 7:
        return 'Jul';
      case 8:
        return 'Aug';
      case 9:
        return 'Sep';
      case 10:
        return 'Oct';
      case 11:
        return 'Nov';
      case 12:
        return 'Dec';
    }
  }

  function searchRepo() {
    const searchField = document.getElementById('search');
    
    searchField.addEventListener('input', () => {
      for (const repo of entries) {        
        if (!(repo.name.toLowerCase().includes(searchField.value.toLowerCase()))) {
          repo.element.style.display = 'none';
        } else {
          repo.element.style.display = 'flex';
        }

        if (repo.language.toLowerCase().includes(searchField.value.toLowerCase())) {
          repo.element.style.display = 'flex';
        }
      }      
    })
  }
});
