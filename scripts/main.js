const colors = [
    '#a9aaeb',
    '#6684b2',
    '#218B82',
    '#7bc0a1',
    '#37667E',
    '#84A6D6',
    '#F7CE76',
    '#8DA47E',
];

window.addEventListener('load', () => {
    const color = colors[Math.floor(Math.random() * colors.length)];

    document.querySelector('meta[name="theme-color"]').setAttribute("content", color);
    document.querySelector(':root')
        .style.setProperty('--primary', color);

    new Parallax(document.getElementById('visual'));
});
