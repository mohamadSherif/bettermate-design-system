/* @ds-bundle: {"format":4,"namespace":"BetterMate","components":[{"name":"DisplayStandby"},{"name":"DisplayBrew"},{"name":"DisplayShot"},{"name":"DisplayModes"},{"name":"DisplayMenu"},{"name":"DisplayStates"},{"name":"TickRing"},{"name":"WebPhone"},{"name":"WebDesktop"},{"name":"WebPages"},{"name":"WebStates"},{"name":"ActionBanner"},{"name":"Button"},{"name":"StatTile"},{"name":"Chip"},{"name":"SegmentBar"},{"name":"Chart"},{"name":"Segmented"},{"name":"ModeBar"},{"name":"Nav"},{"name":"Stepper"},{"name":"ListRow"},{"name":"Tile"},{"name":"Field"},{"name":"Select"},{"name":"NumberField"},{"name":"Dial"},{"name":"StageTrack"},{"name":"Icon"},{"name":"Notice"},{"name":"Toast"},{"name":"EmptyState"},{"name":"Loader"},{"name":"Dialog"},{"name":"Menu"},{"name":"Tooltip"},{"name":"States"},{"name":"MotionDisplay"},{"name":"MotionWeb"}]} */
(function () {
  'use strict';
  /* Icon paths: copied from web/src/design/outlinePaths.js. 24 unit grid, 1.6 stroke, round caps and joins. */
  var P = {"arrow-left":"M19 12H5m6-6-6 6 6 6","arrow-right":"M5 12h14m-6-6 6 6-6 6","bean":"M18 3C6-1 0 14 7 20c7 6 19-7 11-17ZM8 19c-2-5 8-8 7-15","bluetooth":"m7 6 10 12V6L7 18m5-16 5 4-5 6V2m0 10v10l5-4","chart-column":"M4 3v18h17M8 17v-6m5 6V6m5 11V9","check":"m5 12 4 4L19 6","chevron-down":"m6 9 6 6 6-6","chevron-left":"m15 6-6 6 6 6","chevron-right":"m9 6 6 6-6 6","chevron-up":"m6 15 6-6 6 6","download":"M12 3v12m-5-5 5 5 5-5M4 21h16","upload":"M12 15V3M7 8l5-5 5 5M4 21h16","circle-alert":"M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 5v5m0 3h.01","clock":"M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v5l4 2","coffee":"M4 8h12v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Zm12 0h2a3 3 0 0 1 0 6h-2M7 2v3m4-3v3","droplet":"M12 2C9 7 5 10 5 14a7 7 0 0 0 14 0c0-4-4-7-7-12Z","flame":"M12 2c2 7-6 6-6 13a6 6 0 0 0 12 0c0-4-1-6-3-8 0 3-2 4-3 5","gauge":"M4 19a10 10 0 1 1 16 0H4Zm8-5 5-6M5 12h2m4-7v2m8 5h-2","hand":"M8 12V5a2 2 0 0 1 4 0v7m0-5a2 2 0 0 1 4 0v5m0-3a2 2 0 0 1 4 0v7a5 5 0 0 1-5 5h-4c-3 0-6-5-7-8a2 2 0 0 1 3-2l1 1","history":"M3 4v5h5M3 9a9 9 0 1 1 0 6m9-8v5l4 2","house":"m3 10 9-7 9 7M5 9v12h14V9m-9 12v-7h4v7","info":"M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 8v6m0-10h.01","list":"M8 5h13M8 12h13M8 19h13M3 5h.01M3 12h.01M3 19h.01","menu":"M4 6h16M4 12h16M4 18h16","more-horizontal":"M5 12h.01M12 12h.01M19 12h.01","minus":"M5 12h14","monitor":"M3 4h18v13H3V4Zm9 13v4m-4 0h8","moon":"M20 15A9 9 0 0 1 9 4 9 9 0 1 0 20 15Z","panel-left-close":"M3 4h18v16H3V4Zm5 0v16m9-12-4 4 4 4","pause":"M7 4v16M17 4v16","pencil":"m15 3 6 6L9 21H3v-6L15 3Zm-3 3 6 6","play":"m7 4 14 8-14 8V4Z","plus":"M5 12h14M12 5v14","power":"M12 2v10M6 5a9 9 0 1 0 12 0","refresh-cw":"M20 3v6h-6m6 0a9 9 0 1 0 0 6","save":"M3 3h14l4 4v14H3V3Zm4 0v6h9V3M7 21v-7h10v7","scale":"M12 3v18M4 7h16M6 7 2 15h8L6 7Zm12 0-4 8h8l-4-8ZM7 21h10","search":"M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm5 12 6 6","settings":"M10 3h4l1 3 3 1 3 3v4l-3 1-1 3-3 3h-4l-1-3-3-1-3-3v-4l3-1 1-3 3-3Zm2 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z","sliders-horizontal":"M3 6h5m4 0h9M3 18h9m4 0h5M8 3v6m4 6v6","square-pen":"M12 3H3v18h18v-9M17 2l5 5-10 10H7v-5L17 2Z","stop":"M5 5h14v14H5V5Z","sun":"M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-6v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1","thermometer":"M9 14V5a3 3 0 0 1 6 0v9a5 5 0 1 1-6 0Zm3-7v10","timer":"M12 6a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM9 2h6m-3 0v4m0 4v4l3 2m4-9 2-2","trash-2":"M3 6h18M5 6l1 15h12l1-15M9 6V3h6v3m-5 4v7m4-7v7","triangle-alert":"m12 3 10 18H2L12 3Zm0 6v5m0 3h.01","waves":"M2 6c3-4 7 4 10 0s7 4 10 0M2 12c3-4 7 4 10 0s7 4 10 0M2 18c3-4 7 4 10 0s7 4 10 0","wifi":"M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8 16a6 6 0 0 1 8 0M12 20h.01","wind":"M3 8h10a3 3 0 1 0-3-3M3 12h15a3 3 0 1 0-3-3M3 16h10a3 3 0 1 1-3 3","x":"m5 5 14 14M19 5 5 19","eye":"M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Zm10-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z","eye-off":"m3 3 18 18M9 5c6-2 11 5 13 7l-3 4M6 6l-4 6s4 7 10 7l4-1m-6-8 4 4"};

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function icon(name, size, cls) {
    size = size || 24;
    return '<svg class="bm-icon' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + (P[name] || P.info) + '"/></svg>';
  }

  /* ---- Ring geometry: 480 box, centre 240, angles clockwise from +x (y down). ---- */
  var C = 240, R_IN = 212, R_OUT = 234, R_NOTCH = 204;
  var ARCS = {
    left: { start: 110, sweep: 140, n: 36 },   /* temperature: bottom-left up to top-left */
    right: { start: 70, sweep: -140, n: 36 },  /* pressure: bottom-right up to top-right */
    full: { start: 120, sweep: 300, n: 76 }    /* single ring, 60 degree gap at the bottom */
  };
  function pt(deg, r) { var a = deg * Math.PI / 180; return [C + r * Math.cos(a), C + r * Math.sin(a)]; }
  function tickAngles(arc) { var a = ARCS[arc], out = []; for (var i = 0; i < a.n; i++) out.push(a.start + a.sweep * i / (a.n - 1)); return out; }
  function litCount(fraction, n) { return Math.max(0, Math.min(n, Math.round(fraction * n))); }
  function notchIndex(fraction, n) { return fraction < 0 ? -1 : Math.max(0, Math.min(n - 1, Math.round(fraction * (n - 1)))); }
  function ringArc(arc, value, target, tone) {
    var degs = tickAngles(arc), n = degs.length, on = litCount(value || 0, n), ti = notchIndex(target == null ? -1 : target, n), s = '';
    for (var i = 0; i < n; i++) {
      var notch = i === ti, p0 = pt(degs[i], notch ? R_NOTCH : R_IN), p1 = pt(degs[i], R_OUT);
      s += '<line class="bmf-tick' + (i < on ? ' ' + tone : '') + (notch ? ' notch' : '') + '" x1="' + p0[0].toFixed(1) + '" y1="' + p0[1].toFixed(1) + '" x2="' + p1[0].toFixed(1) + '" y2="' + p1[1].toFixed(1) + '"/>';
    }
    return '<g class="bmf-arc bmf-arc-' + arc + '">' + s + '</g>';
  }
  /* ring({left:[value,target,tone], right:[...]}) or ring({full:[value,target,tone]}) as a standalone svg */
  function ringParts(o) {
    var s = '';
    ['left', 'right', 'full'].forEach(function (k) { if (o[k]) s += ringArc(k, o[k][0], o[k][1], o[k][2] || 'ink'); });
    return s;
  }
  function ring(o) { return '<svg viewBox="0 0 480 480" aria-hidden="true">' + ringParts(o) + '</svg>'; }

  /* ---- Display drawing primitives ---- */
  function tx(x, y, cls, str, anchor) { return '<text x="' + x + '" y="' + y + '" class="' + cls + '" text-anchor="' + (anchor || 'middle') + '">' + esc(str) + '</text>'; }
  function iconAt(cx, cy, size, name, cls) {
    return '<svg x="' + (cx - size / 2) + '" y="' + (cy - size / 2) + '" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" class="' + (cls || 'bmf-c-ink') + '" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="' + (P[name] || P.info) + '"/></svg>';
  }
  function pill(cx, y, w, label, tone, h) {
    h = h || 64;
    return '<g class="bmf-pill"><rect x="' + (cx - w / 2) + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + h / 2 + '" class="bmf-' + tone + '"/>' + tx(cx, y + h / 2 + 8, 'bmf-btn bmf-on-' + tone, label) + '</g>';
  }
  function disc(cx, cy, r, name, fill, ic, size) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" class="bmf-' + (fill || 'disc') + '"/>' + iconAt(cx, cy, size || 28, name, ic || 'bmf-c-ink');
  }
  function quiet(cx, y, w, label, h) {
    h = h || 64;
    return '<g class="bmf-pill"><rect x="' + (cx - w / 2) + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + h / 2 + '" class="bmf-disc"/>' + tx(cx, y + h / 2 + 8, 'bmf-btn bmf-muted', label) + '</g>';
  }
  function handle() { return iconAt(240, 446, 32, 'chevron-up', 'bmf-c-muted'); }
  function exception(kind) { return kind ? iconAt(240, 34, 28, kind === 'update' ? 'download' : 'triangle-alert', kind === 'update' ? 'bmf-c-muted' : 'bmf-c-warn') : ''; }
  function stepper(y) { return disc(82, y, 30, 'minus') + disc(398, y, 30, 'plus'); }
  function chipAt(cx, y, text, fill, ink) {
    var w = Math.round(text.length * 13.2 + 24);
    return '<rect x="' + (cx - w / 2) + '" y="' + y + '" width="' + w + '" height="36" rx="10" class="bmf-' + fill + '"/>' + tx(cx, y + 25, 'bmf-label bmf-' + ink, text);
  }
  function segRow(y, items, active) {
    var w = 244, x0 = 240 - w / 2, each = (w - 8) / items.length, s = '<rect x="' + x0 + '" y="' + y + '" width="' + w + '" height="56" rx="28" class="bmf-card"/>';
    items.forEach(function (label, i) {
      var cx = x0 + 4 + each * i + each / 2, on = i === active;
      if (on) s += '<rect x="' + (x0 + 4 + each * i) + '" y="' + (y + 4) + '" width="' + each + '" height="48" rx="24" class="bmf-ink"/>';
      s += tx(cx, y + 35, 'bmf-label ' + (on ? 'bmf-on-ink' : 'bmf-muted'), label);
    });
    return s;
  }
  function stageBars(y, phases) {
    var total = 0, w = 220, gap = 6, x = 130, s = '';
    phases.forEach(function (p) { total += p[0]; });
    var usable = w - gap * (phases.length - 1);
    phases.forEach(function (p) {
      var pw = usable * p[0] / total;
      s += '<rect x="' + x.toFixed(1) + '" y="' + y + '" width="' + pw.toFixed(1) + '" height="8" rx="4" class="bmf-track"/>';
      if (p[1] > 0) s += '<rect x="' + x.toFixed(1) + '" y="' + y + '" width="' + Math.max(8, pw * p[1]).toFixed(1) + '" height="8" rx="4" class="bmf-ink"/>';
      x += pw + gap;
    });
    return s;
  }
  function wrap(inner, label) {
    return '<svg class="bm-face" viewBox="0 0 480 480" role="img" aria-label="' + esc(label || 'Round display') + '"><circle cx="240" cy="240" r="240" class="bmf-ground"/>' + inner + '</svg>';
  }

  /* ---- The display's screens. Each returns the inside of a face. ---- */
  var screens = {
    standby: function (o) {
      if (o.rest) return tx(240, 282, 'bmf-hero bmf-faint', o.time || '10:51');
      var s = ringParts({ full: [o.temp || 0, -1, o.busy ? 'ink' : 'faint'] }) + exception(o.exception);
      s += tx(240, 136, 'bmf-label bmf-muted', o.date || 'THU 12 NOV');
      s += tx(240, 256, 'bmf-hero bmf-ink', o.time || '10:51');
      s += tx(240, 298, 'bmf-body bmf-muted', o.line || 'Boiler off · 21°');
      if (!o.busy) s += pill(240, 330, 176, 'WAKE', 'primary');
      return s;
    },
    brew: function (o) {
      var heating = o.state === 'heating';
      var s = ringParts({ left: [o.tempF, o.targetF, 'heat'], right: [o.pressureF || 0, -1, 'primary'] }) + exception(o.exception);
      s += tx(240, 98, 'bmf-label ' + (heating ? 'bmf-heat' : 'bmf-muted'), heating ? 'HEATING TO ' + o.target + '°' : 'BREW');
      s += tx(240, 222, 'bmf-hero bmf-ink', o.temp);
      s += tx(240, 254, 'bmf-label bmf-muted', '°C');
      var name = o.profile || 'Classic', half = name.length * 7.3;
      var py = o.scale ? 292 : 300;
      s += tx(240 - 10, py, 'bmf-title bmf-ink', name) + iconAt(240 + half + 6, py - 9, 24, 'chevron-right', 'bmf-c-muted');
      if (o.scale) s += tx(240, 324, 'bmf-label bmf-muted', o.scale + ' · TARE');
      s += o.pending ? quiet(240, o.scale ? 340 : 334, 188, 'STARTING') : pill(240, o.scale ? 340 : 334, 188, 'START', 'primary');
      return s + (o.pending ? '' : handle());
    },
    shot: function (o) {
      var s = ringParts({ left: [o.tempF, o.targetF, 'heat'], right: [o.pressureF, o.pTargetF, 'primary'] });
      s += tx(240, 94, 'bmf-label bmf-muted', o.phase);
      s += tx(240, 206, 'bmf-hero bmf-ink', o.time);
      if (o.phases) s += stageBars(228, o.phases);
      s += tx(172, 296, 'bmf-value bmf-ink', o.a[0]) + tx(172, 324, 'bmf-label bmf-muted', o.a[1]);
      s += tx(308, 296, 'bmf-value bmf-ink', o.b[0]) + tx(308, 324, 'bmf-label bmf-muted', o.b[1]);
      s += pill(240, 344, 168, o.done ? 'DONE' : 'STOP', o.done ? 'primary' : 'ink');
      return s;
    },
    mode: function (o) {
      var s = ringParts({ full: [o.tempF, o.targetF, 'heat'] }) + exception(o.exception);
      s += tx(240, 86, 'bmf-label bmf-muted', o.name);
      s += tx(240, 146, 'bmf-value ' + (o.heating ? 'bmf-heat' : 'bmf-ink'), o.live);
      s += stepper(250) + tx(240, 284, 'bmf-hero-sm bmf-ink', o.target) + tx(240, 318, 'bmf-label bmf-muted', o.unit || 'TARGET °C');
      s += o.action ? pill(240, 344, 176, o.action[0], o.action[1]) : tx(240, 380, 'bmf-body bmf-muted', o.note || '');
      return s + (o.running ? '' : handle());
    },
    grind: function (o) {
      var s = ringParts({ full: [o.progress || 0, -1, 'ink'] });
      s += tx(240, 86, 'bmf-label bmf-muted', 'GRIND');
      if (!o.running) s += segRow(106, ['TIME', 'WEIGHT'], o.by === 'weight' ? 1 : 0) + stepper(250);
      else s += tx(240, 146, 'bmf-value bmf-ink', o.live || '');
      s += tx(240, 284, 'bmf-hero-sm bmf-ink', o.target) + tx(240, 318, 'bmf-label bmf-muted', o.unit);
      s += pill(240, 344, 176, o.running ? 'STOP' : 'START', o.running ? 'ink' : 'primary');
      return s + (o.running ? '' : handle());
    },
    adjust: function (o) {
      var s = tx(240, 86, 'bmf-label bmf-muted', o.title || 'CLASSIC · UNSAVED');
      s += segRow(106, o.fields || ['TEMP', 'BAR', 'TIME'], o.field || 0) + stepper(250);
      s += tx(240, 284, 'bmf-hero-sm bmf-ink', o.value) + tx(240, 318, 'bmf-label bmf-muted', o.unit);
      return s + pill(240, 344, 176, 'SAVE', 'primary');
    },
    menu: function (o) {
      var items = o.items || [['brew', 'coffee', 'BREW'], ['steam', 'wind', 'STEAM'], ['water', 'droplet', 'WATER'], ['grind', 'bean', 'GRIND'], ['info', 'info', 'INFO']];
      var s = exception(o.exception), n = items.length;
      items.forEach(function (it, i) {
        var a = (-90 + i * 360 / n) * Math.PI / 180, cx = Math.round(240 + 134 * Math.cos(a)), cy = Math.round(240 + 134 * Math.sin(a)), on = it[0] === o.active;
        s += '<circle cx="' + cx + '" cy="' + cy + '" r="58" class="bmf-' + (on ? 'ink' : 'card') + '"/>' + iconAt(cx, cy - 14, 36, it[1], on ? 'bmf-c-on-ink' : 'bmf-c-ink') + tx(cx, cy + 32, 'bmf-label ' + (on ? 'bmf-on-ink' : 'bmf-muted'), it[2]);
      });
      return s + disc(240, 240, 44, 'power', 'disc', 'bmf-c-ink', 36);
    },
    profiles: function (o) {
      var s = tx(240, 86, 'bmf-label bmf-muted', 'PROFILE ' + o.index + ' / ' + o.count);
      s += tx(240, 168, 'bmf-value bmf-ink', o.name);
      var x = 240 - (o.facts.length * 104 - 8) / 2;
      o.facts.forEach(function (f) { s += '<rect x="' + x + '" y="194" width="96" height="44" rx="14" class="bmf-card"/>' + tx(x + 48, 223, 'bmf-label bmf-ink', f); x += 104; });
      s += tx(240, 278, 'bmf-body bmf-muted', o.phases);
      for (var i = 0; i < o.count; i++) s += '<circle cx="' + (240 - (o.count - 1) * 10 + i * 20) + '" cy="308" r="5" class="bmf-' + (i === o.index - 1 ? 'ink' : 'track') + '"/>';
      s += disc(56, 240, 28, 'chevron-left') + disc(424, 240, 28, 'chevron-right');
      return s + pill(206, 340, 152, 'SELECT', 'primary') + disc(322, 372, 28, 'pencil');
    },
    info: function (o) {
      var s = tx(240, 84, 'bmf-label bmf-muted', o.heading || 'CONNECTED TO') + tx(240, 122, 'bmf-title bmf-ink', o.ssid);
      s += '<rect x="166" y="142" width="148" height="148" rx="14" class="bmf-qr"/>';
      var seed = 7, m = 21, cell = 6, ox = 177, oy = 153;
      function finder(r, c) { return (r < 7 && c < 7) || (r < 7 && c > 13) || (r > 13 && c < 7); }
      function inFinder(r, c) { var rr = r > 13 ? r - 14 : r, cc = c > 13 ? c - 14 : c; return rr === 0 || rr === 6 || cc === 0 || cc === 6 || (rr > 1 && rr < 5 && cc > 1 && cc < 5); }
      for (var r = 0; r < m; r++) for (var c2 = 0; c2 < m; c2++) {
        seed = (seed * 73 + 17) % 251;
        var on = finder(r, c2) ? inFinder(r, c2) : seed % 2 === 0;
        if (on) s += '<rect x="' + (ox + c2 * cell) + '" y="' + (oy + r * cell) + '" width="6" height="6" class="bmf-qr-ink"/>';
      }
      s += tx(240, 322, 'bmf-label bmf-ink', o.ip) + tx(240, 350, 'bmf-label bmf-muted', o.hint || 'SCAN TO OPEN');
      return s + (o.action === false ? '' : tx(240, 400, 'bmf-btn bmf-ink', o.action || 'ABOUT'));
    },
    warnings: function (o) {
      var s = tx(240, 112, 'bmf-label bmf-muted', 'BEFORE YOUR NEXT SHOT'), y = 138;
      o.rows.forEach(function (row) {
        var err = row[0] === 'ERROR';
        s += '<rect x="48" y="' + y + '" width="384" height="64" rx="20" class="bmf-card"/>';
        s += '<rect x="62" y="' + (y + 14) + '" width="' + (err ? 90 : 76) + '" height="36" rx="10" class="bmf-' + (err ? 'danger' : 'warn') + '-soft"/>' + tx(62 + (err ? 45 : 38), y + 39, 'bmf-label bmf-' + (err ? 'danger' : 'warn'), row[0]);
        s += tx(62 + (err ? 104 : 90), y + 40, 'bmf-body bmf-ink', row[1], 'start');
        y += 72;
      });
      return s + pill(240, 340, 168, 'DONE', 'ink');
    },
    sheet: function (o) {
      var s = tx(240, 122, 'bmf-title bmf-ink', o.title);
      s += pill(240, 158, 244, o.actions[0], 'primary');
      s += '<rect x="118" y="234" width="244" height="64" rx="32" class="bmf-disc"/>' + tx(240, 274, 'bmf-btn bmf-ink', o.actions[1]);
      return s + tx(240, 350, 'bmf-btn bmf-muted', o.actions[2]);
    },
    fault: function (o) {
      var lines = o.lines || [], s = iconAt(240, 34, 28, 'triangle-alert', 'bmf-c-danger');
      s += chipAt(240, 84, 'ERROR', 'danger-soft', 'danger');
      s += tx(240, 178, 'bmf-title bmf-ink', o.title);
      lines.forEach(function (line, i) { s += tx(240, 222 + i * 30, 'bmf-body bmf-muted', line); });
      if (o.action) s += pill(240, 330, 188, o.action[0], o.action[1] || 'ink');
      return s;
    },
    update: function (o) {
      var p = o.progress || 0, s = ringParts({ full: [p, -1, 'ink'] });
      s += tx(240, 98, 'bmf-label bmf-muted', o.heading || 'UPDATING');
      s += tx(240, 252, 'bmf-hero bmf-ink', String(Math.round(p * 100)));
      s += tx(240, 284, 'bmf-label bmf-muted', '%');
      s += tx(240, 336, 'bmf-body bmf-ink', o.line || 'Keep the machine on');
      if (o.note) s += tx(240, 370, 'bmf-label bmf-muted', o.note);
      return s;
    }
  };
  function face(o) { var fn = screens[o.s] || screens.brew; return wrap(fn(o), o.label || o.s); }

  /* ---- Web helpers ---- */
  function segbar(on, total, target) { var s = ''; for (var i = 0; i < total; i++) s += '<i class="' + (i < on ? 'on' : '') + (i === target ? ' target' : '') + '"></i>'; return s; }

  /* loader(): the display's busy comet for the web. Twelve ticks, three lit; bundle.css steps the lit group round. */
  function loader(size) {
    size = size || 24;
    var all = '', lit = '';
    for (var i = 0; i < 12; i++) {
      var a = (i * 30 - 90) * Math.PI / 180, l = '<line x1="' + (12 + 6.5 * Math.cos(a)).toFixed(2) + '" y1="' + (12 + 6.5 * Math.sin(a)).toFixed(2) + '" x2="' + (12 + 10 * Math.cos(a)).toFixed(2) + '" y2="' + (12 + 10 * Math.sin(a)).toFixed(2) + '"/>';
      all += l; if (i < 3) lit += l;
    }
    return '<svg class="bm-loader" viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" aria-hidden="true">' + all + '<g class="bm-loader__lit">' + lit + '</g></svg>';
  }

  /* chart({w, h, label, x:{max, ticks, unit}, y:{max, ticks}, series:[{key, max, unit, digits, points:[[x, y], ...]}]})
     Lines only. key is pressure, temperature, flow or weight and picks colour, weight and dash. The left axis is y.max;
     a series with its own max is scaled to it and read from its end label, which states the last value and its unit. */
  function chartKey(key) { return '<svg class="bm-chart__key" viewBox="0 0 20 6" aria-hidden="true"><line class="bm-chart__line bm-chart__line--' + esc(key) + '" x1="1" y1="3" x2="19" y2="3"/></svg>'; }
  function chart(o) {
    var W = o.w || 640, H = o.h || 220, L = 30, R = o.right == null ? 76 : o.right, T = 10, B = 26;
    var pw = W - L - R, ph = H - T - B, xm = o.x.max, ym = o.y.max, grid = '', s = '', ends = [];
    function X(v) { return L + pw * v / xm; }
    function Y(v, max) { return T + ph * (1 - Math.max(0, Math.min(1, v / max))); }
    (o.y.ticks || []).forEach(function (t) { var y = Y(t, ym); grid += 'M' + L + ' ' + y.toFixed(1) + 'H' + (L + pw); s += tx(L - 6, (y + 4).toFixed(1), 'bm-chart__tick', t, 'end'); });
    (o.x.ticks || []).forEach(function (t, i, all) { s += tx(X(t).toFixed(1), H - 6, 'bm-chart__tick', t + (i === 0 && o.x.unit ? ' ' + o.x.unit : ''), i === 0 ? 'start' : i === all.length - 1 ? 'end' : 'middle'); });
    s = '<path class="bm-chart__grid" d="' + grid + '"/>' + s;
    (o.series || []).forEach(function (se) {
      var max = se.max || ym, pts = se.points || [], d = '';
      pts.forEach(function (p, i) { d += (i ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1], max).toFixed(1); });
      if (!pts.length) return;
      s += '<path class="bm-chart__line bm-chart__line--' + esc(se.key) + '" d="' + d + '"/>';
      var last = pts[pts.length - 1];
      ends.push({ y: Y(last[1], max), text: last[1].toFixed(se.digits == null ? 1 : se.digits) + (se.unit || '') });
    });
    ends.sort(function (a, b) { return a.y - b.y; });
    for (var i = 1; i < ends.length; i++) if (ends[i].y - ends[i - 1].y < 16) ends[i].y = ends[i - 1].y + 16;
    for (var j = ends.length - 1, floor = T + ph; j >= 0; j--) { if (ends[j].y > floor) ends[j].y = floor; floor = ends[j].y - 16; }
    ends.forEach(function (e) { s += tx(L + pw + 8, (e.y + 4).toFixed(1), 'bm-chart__end', e.text, 'start'); });
    return '<svg class="bm-chart" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="' + esc(o.label || 'Chart') + '">' + s + '</svg>';
  }

  /* hydrate(): fill the declarative hooks used by the previews and by static pages.
     data-icon="play" [data-size]   data-segbar="on/total[/target]"   data-dots="on/total"
     data-ring='{"left":[0.58,0.58,"heat"],"right":[0,-1,"primary"]}'   data-face='{"s":"brew",...}'
     data-loader [data-size]   data-chart='{...}' (drawn at the element's width)   data-chart-key="flow"
     A warning or danger Chip with no glyph of its own gets one: triangle-alert or circle-alert. */
  function hydrate(root) {
    root = root || document;
    [].forEach.call(root.querySelectorAll('[data-icon]'), function (el) { el.innerHTML = icon(el.getAttribute('data-icon'), +el.getAttribute('data-size') || 24); });
    [].forEach.call(root.querySelectorAll('[data-segbar]'), function (el) { var p = el.getAttribute('data-segbar').split('/'); el.innerHTML = segbar(+p[0], +p[1], p[2] == null ? -1 : +p[2]); });
    [].forEach.call(root.querySelectorAll('[data-dots]'), function (el) { var p = el.getAttribute('data-dots').split('/'); el.innerHTML = segbar(+p[0], +p[1], -1); });
    [].forEach.call(root.querySelectorAll('[data-ring]'), function (el) { el.insertAdjacentHTML('afterbegin', ring(JSON.parse(el.getAttribute('data-ring')))); });
    [].forEach.call(root.querySelectorAll('[data-face]'), function (el) { el.innerHTML = face(JSON.parse(el.getAttribute('data-face'))); });
    [].forEach.call(root.querySelectorAll('[data-loader]'), function (el) { el.innerHTML = loader(+el.getAttribute('data-size') || 24); });
    [].forEach.call(root.querySelectorAll('[data-chart-key]'), function (el) { el.innerHTML = chartKey(el.getAttribute('data-chart-key')); });
    [].forEach.call(root.querySelectorAll('[data-chart]'), function (el) { var o = JSON.parse(el.getAttribute('data-chart')); if (!o.w) o.w = Math.max(240, Math.round(el.clientWidth)) || 640; el.innerHTML = chart(o); });
    [].forEach.call(root.querySelectorAll('.bm-chip--warning,.bm-chip--danger'), function (el) { if (!el.querySelector('svg')) el.insertAdjacentHTML('afterbegin', icon(el.classList.contains('bm-chip--danger') ? 'circle-alert' : 'triangle-alert', 14)); });
  }

  window.BetterMate = {
    icon: icon, icons: Object.keys(P), ring: ring, ringParts: ringParts, ringArc: ringArc, face: face, wrap: wrap, screens: screens,
    segbar: segbar, loader: loader, chart: chart, chartKey: chartKey, hydrate: hydrate,
    geometry: { centre: C, inner: R_IN, outer: R_OUT, notch: R_NOTCH, arcs: ARCS, tickAngles: tickAngles, litCount: litCount, notchIndex: notchIndex, point: pt },
    draw: { tx: tx, iconAt: iconAt, pill: pill, disc: disc, stepper: stepper, stageBars: stageBars, handle: handle, chipAt: chipAt, quiet: quiet }
  };
})();
