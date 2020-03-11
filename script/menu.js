window.addEventListener('load', () => {
    const menuWrapperOne = document.getElementById('menuWrapper');
    const disableNav = document.getElementById('disableNav');
    const nav = document.getElementsByTagName('nav')[0];
  
    menuWrapperOne.addEventListener('click', () => {
      const bars = [
        document.getElementById('barOne'),
        document.getElementById('barTwo'),
        document.getElementById('barThree')
      ];
  
      if (
        bars[0].className.includes('turn') &&
        bars[2].className.includes('turn')
      ) {
        bars[0].classList.toggle('turnLeft');
        bars[2].classList.toggle('turnRight');

        nav.classList.remove('showNav');
        document.body.classList.remove('overflowHidden');
  
        setTimeout(() => {
          for (const bar of bars) {
            bar.classList.toggle('goToMiddle');
          }
  
          bars[1].classList.toggle('hide');
        }, 310);
      } else {
        for (const bar of bars) {
          bar.classList.toggle('goToMiddle');
        }
        nav.classList.add('showNav');
        document.body.classList.add('overflowHidden');
  
        setTimeout(() => {
          bars[0].classList.toggle('turnLeft');
          bars[1].classList.toggle('hide');
          bars[2].classList.toggle('turnRight');
        }, 310);
      }
    });
});