/* Ouroboros: interactive effects (page transitions, image ripple, 3D tilt, cursor trail) */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* =====================================================
     2. WebGL image ripple on hover
     ===================================================== */
  var distortTargets = fine && !reduce ? $$(".room-card__img, .near__card, .exp__card, .dine__card, .gal__item, .rrow__media") : [];
  (function () {
    if (!distortTargets.length) return;
    var canvas = document.createElement("canvas");
    canvas.className = "fx-canvas";
    var gl = canvas.getContext("webgl", { premultipliedAlpha: false, antialias: true });
    if (!gl) return;
    var vs = "attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;v.y=1.-v.y;gl_Position=vec4(p,0.,1.);}";
    var fs = [
      "precision mediump float;varying vec2 v;uniform sampler2D t;uniform vec2 res;uniform vec2 img;uniform vec2 m;uniform float time;uniform float amt;",
      "vec2 cover(vec2 uv){float rs=res.x/res.y,ri=img.x/img.y;vec2 s=rs<ri?vec2(rs/ri,1.):vec2(1.,ri/rs);return (uv-.5)*s+.5;}",
      "void main(){vec2 uv=v;vec2 asp=vec2(res.x/res.y,1.);float d=distance(uv*asp,m*asp);",
      "float fall=smoothstep(.6,0.,d);float w=sin(d*26.-time*3.2)*.014*amt*fall;",
      "vec2 dir=normalize(uv-m+.0001);uv+=dir*w;uv.y+=sin(uv.x*9.+time*1.4)*.004*amt;",
      "vec2 c=cover(uv);float sh=.005*amt*fall;",
      "gl_FragColor=vec4(texture2D(t,c+vec2(sh,0.)).r,texture2D(t,c).g,texture2D(t,c-vec2(sh,0.)).b,1.);}"
    ].join("");
    function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; }
    var prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    var U = {}; ["res", "img", "m", "time", "amt"].forEach(function (n) { U[n] = gl.getUniformLocation(prog, n); });
    var cache = {}, host = null, img = null, amt = 0, tamt = 0, mx = .5, my = .5, tmx = .5, tmy = .5, running = false, t0 = performance.now(), broken = false;

    function texFor(im) {
      if (cache[im.currentSrc || im.src]) return cache[im.currentSrc || im.src];
      var tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im);
      cache[im.currentSrc || im.src] = tex; return tex;
    }
    function frame(now) {
      if (!running) return;
      amt += (tamt - amt) * 0.08; mx += (tmx - mx) * 0.12; my += (tmy - my) * 0.12;
      gl.uniform1f(U.time, (now - t0) / 1000); gl.uniform1f(U.amt, amt); gl.uniform2f(U.m, mx, my);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (tamt === 0 && amt < 0.02) { running = false; canvas.classList.remove("is-on"); return; }
      requestAnimationFrame(frame);
    }
    function enter(el, e) {
      if (broken) return;
      var im = el.querySelector("img:not(.near__ring)");
      if (!im || !im.complete || !im.naturalWidth) return;
      var r = el.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      try { gl.bindTexture(gl.TEXTURE_2D, texFor(im)); } catch (err) { broken = true; return; }
      if (gl.getError() !== gl.NO_ERROR) { broken = true; return; }
      im.after(canvas); host = el; img = im;
      gl.uniform2f(U.res, r.width, r.height); gl.uniform2f(U.img, im.naturalWidth, im.naturalHeight);
      tmx = mx = (e.clientX - r.left) / r.width; tmy = my = (e.clientY - r.top) / r.height;
      amt = 0; tamt = 1; canvas.classList.add("is-on");
      if (!running) { running = true; requestAnimationFrame(frame); }
    }
    distortTargets.forEach(function (el) {
      el.classList.add("has-fx");
      el.addEventListener("mouseenter", function (e) { enter(el, e); });
      el.addEventListener("mousemove", function (e) { if (host !== el) return; var r = el.getBoundingClientRect(); tmx = (e.clientX - r.left) / r.width; tmy = (e.clientY - r.top) / r.height; });
      el.addEventListener("mouseleave", function () { if (host === el) tamt = 0; });
    });
  })();

  /* =====================================================
     3. 3D tilt with glare
     ===================================================== */
  if (fine && !reduce) {
    $$(".room-card, .exp__card, .near__card, .rrow__media").forEach(function (el) {
      var target = el.classList.contains("room-card") ? el.querySelector(".room-card__img") || el : el;
      var glare = document.createElement("span"); glare.className = "glare"; target.appendChild(glare);
      el.classList.add("tilt");
      var rx = 0, ry = 0, trx = 0, try_ = 0, on = false;
      function loop() {
        rx += (trx - rx) * 0.12; ry += (try_ - ry) * 0.12;
        el.style.setProperty("--rx", rx.toFixed(2) + "deg"); el.style.setProperty("--ry", ry.toFixed(2) + "deg");
        if (on || Math.abs(rx) + Math.abs(ry) > 0.05) requestAnimationFrame(loop);
      }
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        trx = (0.5 - py) * 9; try_ = (px - 0.5) * 11;
        glare.style.setProperty("--gx", px * 100 + "%"); glare.style.setProperty("--gy", py * 100 + "%");
      });
      el.addEventListener("mouseenter", function () { on = true; el.classList.add("is-tilt"); requestAnimationFrame(loop); });
      el.addEventListener("mouseleave", function () { on = false; trx = 0; try_ = 0; el.classList.remove("is-tilt"); requestAnimationFrame(loop); });
    });
  }

  /* =====================================================
     4. Cursor image trail
     ===================================================== */
  $$(".trail").forEach(function (sec) {
    if (reduce) return;
    var srcs = (sec.getAttribute("data-trail") || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    if (!srcs.length) return;
    srcs.forEach(function (s) { var i = new Image(); i.src = s; });
    var idx = 0, lx = -999, ly = -999, z = 1, lastAt = 0, inView = false, auto = 0;
    var gap = function () { return Math.max(70, sec.clientWidth * 0.07); };
    function spawn(x, y) {
      var el = document.createElement("img");
      el.className = "trail__img"; el.src = srcs[idx++ % srcs.length]; el.alt = "";
      el.style.left = x + "px"; el.style.top = y + "px"; el.style.zIndex = ++z;
      el.style.setProperty("--r", (Math.random() * 14 - 7).toFixed(1) + "deg");
      sec.appendChild(el);
      requestAnimationFrame(function () { el.classList.add("is-in"); });
      setTimeout(function () { el.classList.add("is-out"); }, 900);
      setTimeout(function () { el.remove(); }, 1900);
    }
    function move(cx, cy) {
      var r = sec.getBoundingClientRect(), x = cx - r.left, y = cy - r.top;
      if (Math.hypot(x - lx, y - ly) > gap()) { spawn(x, y); lx = x; ly = y; }
      lastAt = performance.now();
    }
    sec.addEventListener("mousemove", function (e) { move(e.clientX, e.clientY); });
    sec.addEventListener("touchmove", function (e) { var t = e.touches[0]; move(t.clientX, t.clientY); }, { passive: true });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { inView = es[0].isIntersecting; }).observe(sec);
    /* gentle autoplay when nobody is interacting, so phones see it too */
    setInterval(function () {
      if (!inView || performance.now() - lastAt < 2500 || document.hidden) return;
      auto += 0.55;
      var w = sec.clientWidth, h = sec.clientHeight;
      spawn(w * (0.5 + Math.sin(auto) * 0.34), h * (0.5 + Math.sin(auto * 1.7) * 0.28));
    }, 420);
  });
})();
