/* Session meters — traffic remaining + time left progress bars (status page). */
(function () {
    var box = document.getElementById('meters');
    if (!box || typeof STATUS === 'undefined') return;

    function parseDur(s) {
        if (s === undefined || s === null) return null;
        s = String(s).trim();
        if (!s) return null;
        if (s.indexOf(':') > -1) {          /* HH:MM:SS */
            var p = s.split(':').map(Number), sec = 0;
            for (var i = 0; i < p.length; i++) sec = sec * 60 + (p[i] || 0);
            return sec;
        }
        var mult = { w: 604800, d: 86400, h: 3600, m: 60, s: 1 };
        var total = 0, re = /(\d+)\s*([wdhms])/g, m;
        while ((m = re.exec(s))) total += parseInt(m[1], 10) * (mult[m[2]] || 0);
        return total;
    }

    function fmtBytes(b) {
        b = Number(b) || 0;
        if (b >= 1e9) return (b / 1e9).toFixed(2) + ' GB';
        if (b >= 1e6) return (b / 1e6).toFixed(1) + ' MB';
        if (b >= 1e3) return (b / 1e3).toFixed(0) + ' KB';
        return b + ' B';
    }

    function fmtDur(sec) {
        sec = Math.max(0, Math.round(sec));
        var d = Math.floor(sec / 86400); sec -= d * 86400;
        var h = Math.floor(sec / 3600);  sec -= h * 3600;
        var m = Math.floor(sec / 60);    var s = sec - m * 60;
        var out = [];
        if (d) out.push(d + 'd');
        if (h) out.push(h + 'h');
        if (m) out.push(m + 'm');
        if (!d && !h) out.push(s + 's');
        return out.join(' ');
    }

    function meter(label, valueText, pct, low) {
        pct = Math.max(0, Math.min(100, pct));
        return '<div class="meter' + (low ? ' low' : '') + '">'
            + '<div class="meter-top"><span>' + label + '</span><b>' + valueText + '</b></div>'
            + '<div class="bar"><div class="fill" style="width:' + pct + '%"></div></div>'
            + '</div>';
    }

    var html = '';

    /* ----- data ----- */
    var used  = Number(STATUS.bytesTotal) || 0;
    var limit = (STATUS.limitBytes !== '' && STATUS.limitBytes != null) ? Number(STATUS.limitBytes) : 0;
    if (limit > 0) {
        var left = Math.max(0, limit - used);
        var pct = left / limit * 100;
        html += meter('Data left', fmtBytes(left) + ' / ' + fmtBytes(limit), pct, pct < 15);
    } else {
        html += meter('Data used', fmtBytes(used) + ' · Unlimited', 100, false);
    }

    box.innerHTML = html;
})();
