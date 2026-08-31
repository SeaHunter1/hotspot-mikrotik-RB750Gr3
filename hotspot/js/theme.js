/* Sydney Express — theme switcher (single cycling button) */
(function () {
    var THEMES = [
        { id: 'ocean',    name: 'Ocean' },
        { id: 'sunset',   name: 'Sunset' },
        { id: 'coast',    name: 'Coast' },
        { id: 'midnight', name: 'Midnight' },
        { id: 'aurora',   name: 'Aurora' }
    ];
    var KEY = 'se-theme';

    function idx(id) {
        for (var i = 0; i < THEMES.length; i++) { if (THEMES[i].id === id) return i; }
        return -1;
    }

    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    var current = idx(saved) > -1 ? saved : 'ocean';
    document.documentElement.setAttribute('data-theme', current);

    function updateLabel(id) {
        var k = idx(id);
        var name = k > -1 ? THEMES[k].name : '';
        var els = document.querySelectorAll('.theme-label');
        for (var i = 0; i < els.length; i++) { els[i].textContent = name; }
    }

    function apply(id) {
        if (idx(id) === -1) return;
        document.documentElement.setAttribute('data-theme', id);
        try { localStorage.setItem(KEY, id); } catch (e) {}
        updateLabel(id);
    }

    window.setTheme = apply;

    window.cycleTheme = function () {
        var k = idx(document.documentElement.getAttribute('data-theme'));
        if (k === -1) k = 0;
        apply(THEMES[(k + 1) % THEMES.length].id);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            updateLabel(document.documentElement.getAttribute('data-theme'));
        });
    } else {
        updateLabel(current);
    }
})();
