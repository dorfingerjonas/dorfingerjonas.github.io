/*
 * Runs synchronously in <head>, before first paint:
 * picks the accent colour for this visit and restores the saved theme,
 * so nothing flashes once the page renders.
 */
(function () {
    var root = document.documentElement;
    root.classList.add('js');

    try {
        var saved = localStorage.getItem('theme');
        if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;
    } catch (e) { /* storage blocked: follow the system theme */ }

    var palette = [
        {name: 'Lavender', hex: '#a9aaeb'},
        {name: 'Steel', hex: '#6684b2'},
        {name: 'Lagoon', hex: '#218b82'},
        {name: 'Mint', hex: '#7bc0a1'},
        {name: 'Deep sea', hex: '#37667e'},
        {name: 'Sky', hex: '#84a6d6'},
        {name: 'Butter', hex: '#f7ce76'},
        {name: 'Sage', hex: '#8da47e'},
        {name: 'Margherita', hex: '#e9654b'}
    ];

    // WCAG relative luminance, used to pick readable text on top of the accent.
    function luminance(hex) {
        var c = [1, 3, 5].map(function (i) {
            var v = parseInt(hex.substr(i, 2), 16) / 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    }

    var api = {
        palette: palette,
        index: 0,
        set: function (i) {
            api.index = i;
            var hex = palette[i].hex;
            var l = luminance(hex);
            var dark = (l + 0.05) / 0.055;   // contrast against near-black text
            var light = 1.05 / (l + 0.05);   // contrast against white text
            root.style.setProperty('--accent', hex);
            root.style.setProperty('--on-accent', dark >= light ? '#0e0e0d' : '#ffffff');
        }
    };

    api.set(Math.floor(Math.random() * palette.length));
    window.portfolio = api;
})();
