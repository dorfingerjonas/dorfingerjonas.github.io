window.addEventListener('load', () => {
    const nav = document.getElementsByTagName('nav')[0];
    const homeSection = document.getElementById('homeSection');
    const aboutSection = document.getElementById('aboutSection');
    const workSection = document.getElementById('workSection');
    const gallerySection = document.getElementById('gallerySection');
    const skillsSection = document.getElementById('skillsSection');
    const homeNav = document.getElementById('homeNav');
    const aboutNav = document.getElementById('aboutNav');
    const skillsNav = document.getElementById('skillsNav');
    const workNav = document.getElementById('workNav');
    const galleryNav = document.getElementById('galleryNav');
    const contactNav = document.getElementById('contactNav');

    homeNav.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    });

    aboutNav.addEventListener('click', () => {
        window.scrollTo({
            top: homeSection.clientHeight - navHeight() + 2,
            left: 0,
            behavior: 'smooth'
        });
    });

    skillsNav.addEventListener('click', () => {
        window.scrollTo({
            top: homeSection.clientHeight + aboutSection.clientHeight - navHeight() + 2,
            left: 0,
            behavior: 'smooth'
        });
    });

    workNav.addEventListener('click', () => {
        window.scrollTo({
            top: homeSection.clientHeight + skillsSection.clientHeight + aboutSection.clientHeight - navHeight() + 2,
            left: 0,
            behavior: 'smooth'
        });
    });

    galleryNav.addEventListener('click', () => {
        window.scrollTo({
            top: homeSection.clientHeight + aboutSection.clientHeight + skillsSection.clientHeight + workSection.clientHeight - navHeight() + 2,
            left: 0,
            behavior: 'smooth'
        });
    });
    
    contactNav.addEventListener('click', () => {
        window.scrollTo({
            top: homeSection.clientHeight + aboutSection.clientHeight + skillsSection.clientHeight + workSection.clientHeight + gallerySection.clientHeight - navHeight() + 2,
            left: 0,
            behavior: 'smooth'
        });
    });

    function navHeight() {
        return window.outerHeight > outerWidth ?  0 : nav.clientHeight;
    }
});