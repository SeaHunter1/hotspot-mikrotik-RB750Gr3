/* Removes the third-party "Design by Starlink Boat & Starlink Minik" credit
   that mainjs.js injects into the footer at runtime. */
(function () {
    function clean() {
        /* remove wrapped credit (a <p>/<div>/<span> starting with "Design by ...") */
        var nodes = document.querySelectorAll('p, div, span, small, a');
        for (var i = nodes.length - 1; i >= 0; i--) {
            var el = nodes[i];
            var t = (el.textContent || '').replace(/\s+/g, ' ').trim();
            if (/(Boat|Minik)/i.test(t) && /design\s*by/i.test(t) &&
                el.querySelectorAll('*').length <= 8) {
                if (el.parentNode) el.parentNode.removeChild(el);
            }
        }
        /* remove any leftover links pointing at the boat/minik credit */
        var links = document.querySelectorAll('a');
        for (var j = links.length - 1; j >= 0; j--) {
            var a = links[j];
            if (/(Boat|Minik)/i.test(a.textContent || '')) {
                if (a.parentNode) a.parentNode.removeChild(a);
            }
        }
        /* clean stray text nodes like "Design by" / "&" left behind */
        var credit = document.querySelector('.credit');
        if (credit) {
            var kids = credit.childNodes;
            for (var k = kids.length - 1; k >= 0; k--) {
                var n = kids[k];
                if (n.nodeType === 3 && /design\s*by|^\s*&\s*$/i.test(n.nodeValue || '')) {
                    credit.removeChild(n);
                }
            }
        }
    }

    document.addEventListener('DOMContentLoaded', clean);
    window.addEventListener('load', clean);
    /* mainjs may inject slightly later — sweep a few times */
    var n = 0, t = setInterval(function () { clean(); if (++n > 15) clearInterval(t); }, 200);
})();
