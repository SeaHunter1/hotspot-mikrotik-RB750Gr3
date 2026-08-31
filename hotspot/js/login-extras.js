/* Login conveniences: show-password toggle + remember cabin username. */
(function () {
    var KEY = 'se-cabin';
    var f = document.login;
    if (!f) return;
    var uu = f.username;

    /* prefill last used cabin name if the server didn't already fill it */
    try {
        if (uu && !uu.value) {
            var saved = localStorage.getItem(KEY);
            if (saved) uu.value = saved;
        }
    } catch (e) {}

    /* remember cabin name on submit */
    f.addEventListener('submit', function () {
        try { if (uu && uu.value) localStorage.setItem(KEY, uu.value); } catch (e) {}
    });

    /* show / hide password */
    window.togglePw = function (btn) {
        var inp = btn.parentNode.querySelector('input[name="password"]');
        if (!inp) return;
        var show = inp.type === 'password';
        inp.type = show ? 'text' : 'password';
        btn.classList.toggle('on', show);
        btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    };
})();
