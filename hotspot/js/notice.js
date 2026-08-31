/* Onboard notice banner — text is loaded from notice.txt (edit that file to change it). */
(function () {
    var el = document.getElementById('notice');
    if (!el) return;
    var textEl = el.querySelector('.notice-text');
    if (!textEl) return;

    fetch('notice.txt?ts=' + Date.now(), { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.text() : ''; })
        .then(function (t) {
            t = (t || '').replace(/\r/g, '').trim();
            if (!t) { el.style.display = 'none'; return; }
            var esc = t
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\n/g, '<br>');
            textEl.innerHTML = esc;
            el.style.display = '';
        })
        .catch(function () { el.style.display = 'none'; });
})();
