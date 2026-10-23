/* Ouroboros Hospitality, Koksar */
(function () {
  "use strict";

  var PHONE = "+917876655220";
  var WA = "917876655220";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var hasGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined" && !reduce;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- icon sprite ---------- */
  var I = {
    heat: '<path d="M4 8h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M8 8v12M12 8v12M16 8v12"/><path d="M9 2.5c-1 1.5 1 2 0 3.5M15 2.5c-1 1.5 1 2 0 3.5"/>',
    bath: '<path d="M3 12h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z"/><path d="M6 12V5.5a2.5 2.5 0 0 1 4.6-1.3"/><path d="M7 20l-1 2M17 20l1 2"/>',
    water: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9.5 14.5A2.5 2.5 0 0 0 12 17"/>',
    kettle: '<path d="M6 9h11l-1 11H7z"/><path d="M8 9c0-3 2-5 4.5-5S17 6 17 9"/><path d="M17 12h1.5a2 2 0 0 1 0 4h-2"/><path d="M6 11 3.5 8"/>',
    wifi: '<path d="M2 8.5a15 15 0 0 1 20 0"/><path d="M5 12a10 10 0 0 1 14 0"/><path d="M8.5 15.5a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
    parking: '<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M9.5 17V7h3.5a3 3 0 0 1 0 6H9.5"/>',
    bell: '<path d="M4 17a8 8 0 0 1 16 0"/><path d="M2 17h20"/><path d="M12 9V7M10 7h4"/><path d="M4 20h16"/>',
    mountain: '<path d="M2 20 9 7l4 7 2.5-4L22 20z"/><path d="M7.2 10.3 9 12l2-1.6"/>',
    view: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m3 17 5-5 4 4 3-3 6 6"/><circle cx="16" cy="8.5" r="1.5"/>',
    flame: '<path d="M12 22c4 0 7-2.7 7-6.8 0-3.7-2.6-6.2-4.2-8.2-.4 2-1.4 3-2.8 3.8C12.5 7.5 11 4.5 8.5 2.5 8.5 7 5 9.3 5 15.2 5 19.3 8 22 12 22z"/><path d="M12 22c-1.7 0-3-1.2-3-3 0-2 1.6-2.8 2.2-4.3.9 1 1.6 1.4 2.3 1.3.9 1 1.5 1.9 1.5 3 0 1.8-1.3 3-3 3z"/>',
    cup: '<path d="M4 9h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5h-2"/><path d="M8 2.5c-.8 1.2.8 1.8 0 3M12 2.5c-.8 1.2.8 1.8 0 3"/>',
    bowl: '<path d="M3 12h18a9 9 0 0 1-18 0z"/><path d="M8 21h8"/><path d="M14 4l-3 8M18 5l-5 7"/>',
    phone: '<path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    wa: '<path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z"/><path d="M9 8.3c0 3.6 3 6.6 6.6 6.6l1-1.7-2-1-1 .9a5 5 0 0 1-2.8-2.8l.9-1-1-2z"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowUR: '<path d="M7 17 17 7M8 7h9v9"/>',
    snow: '<path d="M12 2v20M4.9 4.9l14.2 14.2M2 12h20M4.9 19.1 19.1 4.9"/><path d="m9 4 3 2 3-2M9 20l3-2 3 2M4 9l2 3-2 3M20 9l-2 3 2 3"/>',
    pin: '<path d="M12 22s7-6.1 7-12a7 7 0 0 0-14 0c0 5.9 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    river: '<path d="M2 8c2.5-2 4.5-2 7 0s4.5 2 7 0 4.5-2 6 0M2 13c2.5-2 4.5-2 7 0s4.5 2 7 0 4.5-2 6 0M2 18c2.5-2 4.5-2 7 0s4.5 2 7 0 4.5-2 6 0"/>',
    tunnel: '<path d="M3 20v-8a9 9 0 0 1 18 0v8"/><path d="M7 20v-7a5 5 0 0 1 10 0v7"/><path d="M2 20h20"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    sunset: '<path d="M17 18a5 5 0 0 0-10 0"/><path d="M12 9V2M4.2 10.2l1.4 1.4M1 18h2M21 18h2M18.4 11.6l1.4-1.4M23 22H1M16 5l-4 4-4-4"/>',
    heart: '<path d="M12 20s-7.5-4.6-9.3-9.2C1.4 7.4 3.6 4 7 4c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.6 3.4 4.3 6.8C19.5 15.4 12 20 12 20z"/>',
    quad: '<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M9 17h6M5 13l3-5h5l2 3h3l2 3"/>',
    fort: '<path d="M3 21V9h3V6h3v3h6V6h3v3h3v12z"/><path d="M10 21v-5h4v5"/>',
    car: '<path d="M5 16V11l2-5h10l2 5v5"/><path d="M3 16h18v3H3z"/><circle cx="7.5" cy="19.5" r="1.5"/><circle cx="16.5" cy="19.5" r="1.5"/><path d="M5 11h14"/>',
    leaf: '<path d="M5 19c0-9 6-14 15-15-1 9-6 15-15 15z"/><path d="M5 19 13 11"/>',
    moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    plane: '<path d="M10.5 13.5 3 11l1.5-1.5 8 1L17 6a2 2 0 0 1 3 3l-4.5 4.5 1 8L15 23l-2.5-7.5L9 19v3l-1.5 1L6 19.5 2.5 18l1-1.5h3z"/>',
    train: '<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M9 21l-2 1M15 21l2 1M8 17l-1 4M16 17l1 4"/><circle cx="9" cy="14" r=".8"/><circle cx="15" cy="14" r=".8"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>'
  };
  (function () {
    var s = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">';
    Object.keys(I).forEach(function (k) {
      s += '<symbol id="i-' + k + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">' + I[k] + "</symbol>";
    });
    document.body.insertAdjacentHTML("afterbegin", s + "</svg>");
  })();

  if (hasGsap) { document.documentElement.classList.add("js-anim"); gsap.registerPlugin(ScrollTrigger); }

  /* ---------- smooth scroll ---------- */
  var lenis = null;
  if (typeof window.Lenis !== "undefined" && !reduce) {
    lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    if (hasGsap) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
    }
  }
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href"); if (id.length < 2) return;
      var t = $(id); if (!t) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(t, { offset: -40, duration: 1.6 }); else t.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ---------- word splitting ---------- */
  function splitWords(el) {
    var frag = document.createDocumentFragment();
    Array.prototype.slice.call(el.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach(function (w) {
          if (!w) return;
          if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(" ")); return; }
          var o = document.createElement("span"); o.className = "sw";
          var i = document.createElement("span"); i.textContent = w;
          o.appendChild(i); frag.appendChild(o);
        });
      } else if (n.nodeType === 1 && n.tagName === "BR") {
        frag.appendChild(n.cloneNode());
      } else if (n.nodeType === 1) {
        var c = n.cloneNode(false); c.innerHTML = n.innerHTML; splitWords(c); frag.appendChild(c);
      }
    });
    el.innerHTML = ""; el.appendChild(frag);
  }
  if (hasGsap) $$("[data-split]").forEach(splitWords);

  /* ---------- preloader ---------- */
  var loaderDone = new Promise(function (resolve) {
    var loader = $(".loader");
    if (!loader || document.documentElement.classList.contains("no-loader")) { resolve(); return; }
    var count = $(".loader__count", loader), start = performance.now(), dur = reduce ? 200 : 1500;
    (function step(now) {
      var n = Math.min(100, Math.round(((now - start) / dur) * 100));
      if (count) count.textContent = (n < 10 ? "0" : "") + n;
      if (n < 100) requestAnimationFrame(step);
      else {
        loader.classList.add("is-done");
        try { sessionStorage.setItem("ob-seen", "1"); } catch (e) {}
        setTimeout(resolve, 400);
        setTimeout(function () { loader.remove(); }, 1300);
      }
    })(start);
  });

  /* ---------- hero intro ---------- */
  loaderDone.then(function () {
    if (!hasGsap) return;
    var tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    var m = $(".hx__media");
    if (m) tl.fromTo(m, { scale: 1.18 }, { scale: 1, duration: 2.6 }, 0);
    var lines = $$(".hx__title .ln > span");
    if (lines.length) tl.to(lines, { y: 0, duration: 1.5, stagger: 0.12 }, 0.15);
    var words = $$("[data-hero] .sw > span");
    if (words.length) tl.to(words, { y: 0, duration: 1.4, stagger: 0.05 }, 0.05);
    var bits = $$("[data-hero-fade]");
    if (bits.length) tl.fromTo(bits, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.08 }, 0.55);
  });

  /* ---------- nav ---------- */
  var nav = $(".nav");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) {
      nav.classList.toggle("is-scrolled", y > 40);
    }
    var past = y > window.innerHeight * 0.6;
    var bb = $(".bookbar"); if (bb) bb.classList.toggle("is-on", past);
    var wf = $(".wa-float"); if (wf) wf.classList.toggle("is-on", past);
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  var burger = $(".burger");
  if (burger) {
    var closeMenu = function () { document.body.classList.remove("menu-open"); burger.setAttribute("aria-expanded", "false"); document.documentElement.style.overflow = ""; if (lenis) lenis.start(); };
    burger.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.documentElement.style.overflow = open ? "hidden" : "";
      if (lenis) { open ? lenis.stop() : lenis.start(); }
    });
    $$(".menu a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  }

  /* ---------- cursor ---------- */
  if (finePointer && !reduce) {
    var cur = document.createElement("div"); cur.className = "cursor";
    cur.innerHTML = '<div class="cursor__dot"></div><div class="cursor__ring"><span>View</span></div>';
    document.body.appendChild(cur);
    var dot = cur.children[0], ring = cur.children[1], label = ring.firstChild;
    var mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    window.addEventListener("mousemove", function (e) { mx = e.clientX; my = e.clientY; dot.style.transform = "translate(" + mx + "px," + my + "px)"; });
    (function loop() { rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15; ring.style.transform = "translate(" + rx + "px," + ry + "px)"; requestAnimationFrame(loop); })();
    document.addEventListener("mouseover", function (e) {
      var v = e.target.closest("[data-cursor]"), l = e.target.closest("a,button,input,select,textarea,label,summary");
      var isView = !!v && !l;
      cur.classList.toggle("is-view", isView);
      cur.classList.toggle("is-link", !!l);
      if (isView) label.textContent = v.getAttribute("data-cursor");
    });
    $$("[data-magnetic]").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.transform = "translate(" + (e.clientX - r.left - r.width / 2) * 0.25 + "px," + (e.clientY - r.top - r.height / 2) * 0.3 + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* ---------- particles ---------- */
  function Particles(canvas, opt) {
    this.c = canvas; this.x = canvas.getContext("2d");
    this.o = Object.assign({ density: 0.0001, max: 200, min: 40, speed: 1, size: [0.6, 2.4], type: "snow" }, opt || {});
    this.p = []; this.on = false; this.wind = 0; this.tw = 0;
    var self = this; this.resize(); window.addEventListener("resize", function () { self.resize(); });
  }
  Particles.prototype.resize = function () {
    var r = this.c.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2);
    this.w = r.width; this.h = r.height; this.c.width = this.w * d; this.c.height = this.h * d;
    this.x.setTransform(d, 0, 0, d, 0, 0);
    var n = Math.max(this.o.min, Math.min(this.o.max, Math.round(this.w * this.h * this.o.density)));
    while (this.p.length < n) this.p.push(this.make(true));
    this.p.length = n;
  };
  Particles.prototype.make = function (init) {
    var s = this.o.size[0] + Math.random() * (this.o.size[1] - this.o.size[0]), petal = this.o.type === "petal";
    var cols = ["163,27,32", "186,36,44", "120,12,20", "201,71,75"];
    return { x: Math.random() * this.w, y: init ? Math.random() * this.h : -20, r: s,
      vy: (petal ? 0.5 + Math.random() * 0.7 : 0.22 + s * 0.34) * this.o.speed, ph: Math.random() * 6.28, sp: 0.005 + Math.random() * 0.02,
      a: petal ? 0.85 : 0.25 + Math.random() * 0.6, rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.04,
      col: petal ? cols[(Math.random() * cols.length) | 0] : (this.o.col || "255,255,255") };
  };
  Particles.prototype.frame = function () {
    var ctx = this.x, w = this.w, h = this.h; ctx.clearRect(0, 0, w, h);
    this.wind += (this.tw - this.wind) * 0.03;
    for (var i = 0; i < this.p.length; i++) {
      var p = this.p[i];
      p.ph += p.sp; p.y += p.vy; p.x += Math.sin(p.ph) * 0.45 + this.wind * (0.4 + p.r * 0.25);
      if (p.y > h + 20 || p.x < -30 || p.x > w + 30) { this.p[i] = this.make(false); continue; }
      ctx.fillStyle = "rgba(" + p.col + "," + p.a + ")";
      if (this.o.type === "petal") {
        p.rot += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(1, 0.55 + Math.abs(Math.sin(p.ph)) * 0.45);
        ctx.beginPath(); ctx.moveTo(0, -p.r); ctx.bezierCurveTo(p.r, -p.r, p.r, p.r * 0.6, 0, p.r); ctx.bezierCurveTo(-p.r, p.r * 0.6, -p.r, -p.r, 0, -p.r); ctx.fill(); ctx.restore();
      } else { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill(); }
    }
  };
  Particles.prototype.start = function () { if (this.on || reduce) return; this.on = true; var s = this; (function l() { if (!s.on) return; s.frame(); requestAnimationFrame(l); })(); };
  Particles.prototype.stop = function () { this.on = false; };
  function autoRun(sys, el) {
    if (!("IntersectionObserver" in window)) { sys.start(); return; }
    new IntersectionObserver(function (es) { es[0].isIntersecting ? sys.start() : sys.stop(); }).observe(el);
  }
  $$("canvas.petals").forEach(function (c) { autoRun(new Particles(c, { type: "petal", density: 0.00003, max: 40, min: 16, size: [5, 10], speed: 0.8 }), c.parentElement); });

  /* ---------- HERO: season change (glass shards) + live weather ---------- */
  var hxEl = $(".hx");
  var slides = $$(".hx__slide"), seasonLabel = $("[data-season-label]"), shardBox = $(".hx__shards");
  if (hxEl && shardBox && slides.length > 1 && !reduce && Element.prototype.animate) {
    var cur = 0, hxVisible = true, busy = false;
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { hxVisible = es[0].isIntersecting; }).observe(hxEl);

    // where the photo actually sits inside the box (object-fit: cover + object-position)
    var coverRect = function (img, W, H) {
      var s = Math.max(W / img.naturalWidth, H / img.naturalHeight), bw = img.naturalWidth * s, bh = img.naturalHeight * s;
      var pos = getComputedStyle(img).objectPosition.split(" ").map(function (v) { return parseFloat(v) / 100; });
      return { w: bw, h: bh, x: (W - bw) * pos[0], y: (H - bh) * (pos[1] == null ? 0.5 : pos[1]) };
    };

    var shatterIn = function (img, done) {
      var W = shardBox.clientWidth, H = shardBox.clientHeight, cr = coverRect(img, W, H);
      var cols = W < 640 ? 4 : 8, rows = W < 640 ? 7 : 5, cw = W / cols, ch = H / rows;
      // jittered lattice, so the pieces read as broken glass rather than tiles
      var pts = [];
      for (var r = 0; r <= rows; r++) {
        pts[r] = [];
        for (var c = 0; c <= cols; c++) {
          var edgeX = c === 0 || c === cols, edgeY = r === 0 || r === rows;
          pts[r][c] = [c * cw + (edgeX ? 0 : (Math.random() - 0.5) * cw * 0.7), r * ch + (edgeY ? 0 : (Math.random() - 0.5) * ch * 0.7)];
        }
      }
      var frag = document.createDocumentFragment(), anims = [];
      var addShard = function (tri) {
        var xs = tri.map(function (p) { return p[0]; }), ys = tri.map(function (p) { return p[1]; });
        var x0 = Math.floor(Math.min.apply(0, xs)) - 1, y0 = Math.floor(Math.min.apply(0, ys)) - 1;
        var x1 = Math.ceil(Math.max.apply(0, xs)) + 1, y1 = Math.ceil(Math.max.apply(0, ys)) + 1;
        var cx = (xs[0] + xs[1] + xs[2]) / 3, cy = (ys[0] + ys[1] + ys[2]) / 3;
        // nudge each corner away from the centroid by ~1px to hide hairline seams
        var poly = tri.map(function (p) {
          var dx = p[0] - cx, dy = p[1] - cy, d = Math.hypot(dx, dy) || 1;
          return (p[0] + dx / d - x0) + "px " + (p[1] + dy / d - y0) + "px";
        }).join(",");
        var el = document.createElement("div");
        el.className = "hx__shard";
        el.style.cssText = "left:" + x0 + "px;top:" + y0 + "px;width:" + (x1 - x0) + "px;height:" + (y1 - y0) + "px;" +
          "background-image:url('" + img.currentSrc + "');background-size:" + cr.w + "px " + cr.h + "px;" +
          "background-position:" + (cr.x - x0) + "px " + (cr.y - y0) + "px;clip-path:polygon(" + poly + ");" +
          "transform-origin:" + (cx - x0) + "px " + (cy - y0) + "px";
        frag.appendChild(el);
        // pieces settle in a soft diagonal sweep, each drifting from slightly above and turned
        var delay = (cx / W * 0.65 + cy / H * 0.35) * 1100 + Math.random() * 380;
        var rot = (Math.random() - 0.5) * 14, tx = (Math.random() - 0.5) * 40, ty = -30 - Math.random() * 40;
        anims.push(function () {
          return el.animate([
            { opacity: 0, transform: "translate(" + tx + "px," + ty + "px) rotate(" + rot + "deg) scale(1.12)", filter: "blur(6px) brightness(1.45)" },
            { opacity: 0.85, offset: 0.55, filter: "blur(1.5px) brightness(1.15)" },
            { opacity: 1, transform: "none", filter: "blur(0) brightness(1)" }
          ], { duration: 1500, delay: delay, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" }).finished;
        });
      };
      for (var r2 = 0; r2 < rows; r2++) {
        for (var c2 = 0; c2 < cols; c2++) {
          var a = pts[r2][c2], b = pts[r2][c2 + 1], cc = pts[r2 + 1][c2 + 1], d = pts[r2 + 1][c2];
          if (Math.random() < 0.5) { addShard([a, b, cc]); addShard([a, cc, d]); } else { addShard([a, b, d]); addShard([b, cc, d]); }
        }
      }
      shardBox.appendChild(frag);
      Promise.all(anims.map(function (f) { return f(); })).then(done, done);
    };

    var nextSeason = function () {
      if (busy || !hxVisible || document.hidden) return;
      busy = true;
      var from = slides[cur], to = slides[(cur + 1) % slides.length];
      var ready = to.decode ? to.decode().catch(function () {}) : Promise.resolve();
      ready.then(function () {
        if (seasonLabel) {
          var next = to.getAttribute("data-season");
          seasonLabel.classList.add("is-out");
          setTimeout(function () { seasonLabel.textContent = next; seasonLabel.classList.remove("is-out"); }, 900);
        }
        shatterIn(to, function () {
          // shards now cover the frame pixel-for-pixel: swap underneath, then clear them
          to.classList.add("is-on"); from.classList.remove("is-on");
          requestAnimationFrame(function () { shardBox.innerHTML = ""; cur = slides.indexOf(to); busy = false; });
        });
      });
    };
    setInterval(nextSeason, 7500);
  }

  var clock = $("[data-clock]");
  if (clock) {
    var tick = function () { try { clock.textContent = new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" }); } catch (e) {} };
    tick(); setInterval(tick, 15000);
  }
  if ($("[data-temp]") && window.fetch) {
    var WMO = { 0: "Clear skies", 1: "Mostly clear", 2: "Partly cloudy", 3: "Overcast", 45: "Misty valley", 48: "Frosty fog", 51: "Light drizzle", 53: "Drizzle", 55: "Drizzle", 61: "Light rain", 63: "Rain", 65: "Heavy rain", 71: "Light snow", 73: "Snowing", 75: "Heavy snow", 77: "Snow grains", 80: "Showers", 81: "Showers", 82: "Heavy showers", 85: "Snow showers", 86: "Snow showers", 95: "Thunderstorm" };
    fetch("https://api.open-meteo.com/v1/forecast?latitude=32.40&longitude=77.24&current=temperature_2m,weather_code,is_day&daily=sunset&timezone=Asia%2FKolkata&forecast_days=1")
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var c = d.current || {}, cond = WMO[c.weather_code] || "Mountain weather";
        if (c.is_day === 0 && c.weather_code <= 1) cond = "Clear, starry night";
        $$("[data-temp]").forEach(function (el) { el.textContent = Math.round(c.temperature_2m) + "°C · " + cond; });
        if (d.daily && d.daily.sunset && d.daily.sunset[0]) {
          var ss = new Date(d.daily.sunset[0] + ":00+05:30");
          $$("[data-sunset]").forEach(function (el) { el.textContent = ss.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" }); });
        }
      })
      .catch(function () { $$("[data-temp]").forEach(function (el) { el.textContent = "Crisp mountain air"; }); });
  }

  /* ---------- velocity marquees ---------- */
  var marqs = $$("[data-marquee]");
  if (marqs.length && !reduce) {
    var vel = 0, lastSY = window.scrollY, dir = 1;
    var ms = marqs.map(function (m) { return { el: m, x: 0, w: 0 }; });
    var measure = function () { ms.forEach(function (m) { m.w = m.el.scrollWidth / 2; }); };
    measure(); window.addEventListener("resize", measure); window.addEventListener("load", measure);
    (function mloop() {
      var y = window.scrollY, d = y - lastSY; lastSY = y;
      vel += (d - vel) * 0.1;
      if (Math.abs(d) > 0.5) dir = d > 0 ? 1 : -1;
      ms.forEach(function (m, i) {
        m.x -= (0.5 + Math.min(Math.abs(vel), 60) * 0.2) * dir * (i % 2 ? -1 : 1);
        if (m.w) { if (m.x <= -m.w) m.x += m.w; if (m.x > 0) m.x -= m.w; }
        m.el.style.transform = "translate3d(" + m.x + "px,0,0)";
      });
      requestAnimationFrame(mloop);
    })();
  }

  /* ---------- amenities viewer ---------- */
  var amItems = $$(".am__item"), amImgs = $$(".am__frame img"), amCap = $("[data-am-cap]"), amNum = $("[data-am-num]");
  function setAm(i) {
    amItems.forEach(function (it, k) { it.classList.toggle("is-on", k === i); });
    amImgs.forEach(function (im, k) { im.classList.toggle("is-on", k === i); });
    if (amCap && amItems[i]) amCap.textContent = $("h3", amItems[i]).textContent;
    if (amNum) amNum.textContent = (i < 9 ? "0" : "") + (i + 1) + " / " + amItems.length;
  }
  if (amItems.length) {
    setAm(0);
    amItems.forEach(function (it, i) { it.addEventListener("mouseenter", function () { setAm(i); }); });
  }

  /* ---------- amenities v2: tiles drive the photo ---------- */
  var amxTiles = $$("[data-amx]"), amxImgs = $$(".amx__photo img"), amxCap = $("[data-amx-cap]"), amxNum = $("[data-amx-num]");
  if (amxTiles.length) {
    var amxCur = 0, amxHold = false;
    var setAmx = function (i) {
      amxCur = i;
      amxTiles.forEach(function (t, k) { t.classList.toggle("is-on", k === i); });
      amxImgs.forEach(function (im, k) { im.classList.toggle("is-on", k === i); });
      if (amxCap) amxCap.innerHTML = $("h3", amxTiles[i]).innerHTML;
      if (amxNum) amxNum.textContent = (i < 9 ? "0" : "") + (i + 1) + " / " + amxTiles.length;
    };
    amxTiles.forEach(function (t, i) {
      t.addEventListener("mouseenter", function () { amxHold = true; setAmx(i); });
      t.addEventListener("focus", function () { amxHold = true; setAmx(i); });
      t.addEventListener("click", function () { amxHold = true; setAmx(i); });
    });
    var grid = $(".amx__tiles");
    if (grid) grid.addEventListener("mouseleave", function () { amxHold = false; });
    /* slow auto tour so the section feels alive on phones too */
    var amxVisible = false;
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { amxVisible = es[0].isIntersecting; }).observe(grid || amxTiles[0]);
    setInterval(function () { if (amxVisible && !amxHold && !document.hidden && !reduce) setAmx((amxCur + 1) % amxTiles.length); }, 3200);
  }

  /* ---------- nearby slider ---------- */
  $$(".near").forEach(function (sec) {
    var tr = $(".near__track", sec), bar = $(".near__progress i", sec);
    if (!tr) return;
    var upd = function () {
      var max = tr.scrollWidth - tr.clientWidth, p = max > 0 ? tr.scrollLeft / max : 0, wpct = Math.min(100, tr.clientWidth / tr.scrollWidth * 100);
      if (bar) { bar.style.width = wpct + "%"; bar.style.left = p * (100 - wpct) + "%"; }
    };
    tr.addEventListener("scroll", upd, { passive: true }); window.addEventListener("resize", upd); upd();
    var step = function () { var c = $(".near__card", tr); return c ? c.offsetWidth + 16 : 300; };
    var prev = $("[data-near-prev]", sec), next = $("[data-near-next]", sec);
    if (prev) prev.addEventListener("click", function () { tr.scrollBy({ left: -step(), behavior: "smooth" }); });
    if (next) next.addEventListener("click", function () { tr.scrollBy({ left: step(), behavior: "smooth" }); });
    if (finePointer) {
      var down = false, sx = 0, sl = 0, moved = 0;
      tr.addEventListener("pointerdown", function (e) { if (e.pointerType !== "mouse") return; down = true; moved = 0; sx = e.clientX; sl = tr.scrollLeft; tr.classList.add("is-drag"); });
      window.addEventListener("pointermove", function (e) { if (!down) return; moved = Math.abs(e.clientX - sx); tr.scrollLeft = sl - (e.clientX - sx) * 1.3; });
      window.addEventListener("pointerup", function () { if (!down) return; down = false; tr.classList.remove("is-drag"); });
      tr.addEventListener("click", function (e) { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);
    }
  });

  /* ---------- scroll animations ---------- */
  if (hasGsap) {
    ScrollTrigger.batch("[data-reveal]", {
      start: "top 90%", once: true,
      onEnter: function (els) {
        gsap.fromTo(els, { opacity: 0, y: 36 }, {
          opacity: 1, y: 0, duration: 1.3, ease: "expo.out", stagger: 0.08,
          onStart: function () { els.forEach(function (e) { e.classList.add("is-in"); }); },
          onComplete: function () { gsap.set(els, { clearProps: "transform,opacity" }); }
        });
      }
    });

    $$("[data-split]").forEach(function (el) {
      if (el.hasAttribute("data-hero")) return;
      gsap.to($$(".sw > span", el), { y: 0, duration: 1.4, ease: "expo.out", stagger: 0.035, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
    });

    $$("[data-words]").forEach(function (el) {
      splitWords(el);
      var ws = $$(".sw", el);
      ws.forEach(function (w) { w.style.overflow = "visible"; w.classList.add("w"); });
      gsap.to(ws, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 45%", scrub: true } });
    });

    $$("[data-speed]").forEach(function (el) {
      var s = parseFloat(el.getAttribute("data-speed")) || 10;
      gsap.fromTo(el, { yPercent: -s }, { yPercent: s * 0.4, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });

    $$("[data-clip]").forEach(function (el) {
      var img = $("img", el);
      var tl2 = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      tl2.to(el, { clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "expo.inOut" });
      if (img && !img.hasAttribute("data-speed")) tl2.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 2, ease: "expo.out" }, 0.1);
    });

    $$("[data-count]").forEach(function (el) {
      var end = parseFloat(el.getAttribute("data-count")), suf = el.getAttribute("data-suffix") || "", o = { v: 0 };
      gsap.to(o, { v: end, duration: 2.2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true }, onUpdate: function () { el.textContent = Math.round(o.v) + suf; } });
    });

    /* hero scroll out */
    if (hxEl) {
      gsap.timeline({ scrollTrigger: { trigger: hxEl, start: "top top", end: "bottom top", scrub: true } })
        .to(".hx__media", { yPercent: 22, scale: 1.08, ease: "none" }, 0)
        .to(".hx__main", { yPercent: -18, opacity: 0, ease: "none" }, 0)
        .to(".hx__bar", { opacity: 0, ease: "none" }, 0);
    }

    var tub = $(".tub");
    if (tub) {
      var frame = $(".tub__frame", tub);
      gsap.timeline({ scrollTrigger: { trigger: tub, start: "top top", end: "bottom bottom", scrub: 0.6 } })
        .to(frame, { "--ct": "0%", "--cs": "0%", "--cb": "0%", "--cr": "0px", ease: "none", duration: 1 }, 0)
        .fromTo($("img", frame), { scale: 1.3 }, { scale: 1, ease: "none", duration: 1 }, 0)
        .fromTo($$(".tub__copy .wrap > *, .tub__chip", tub), { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.4 }, 0.5);
    }

    var mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", function () {
      var pin = $(".rooms__pin"), track = $(".rooms__track");
      if (pin && track) {
        var bar = $(".rooms__progress i");
        var dist = function () { return Math.max(0, track.scrollWidth - window.innerWidth); };
        gsap.to(track, { x: function () { return -dist(); }, ease: "none",
          scrollTrigger: { trigger: pin, start: "top top", end: function () { return "+=" + dist(); }, pin: true, scrub: 0.8, invalidateOnRefresh: true,
            onUpdate: function (s) { if (bar) bar.style.transform = "scaleX(" + s.progress + ")"; } } });
      }
      /* amenities: activate the item crossing the middle of the screen */
      amItems.forEach(function (it, i) {
        ScrollTrigger.create({ trigger: it, start: "top 55%", end: "bottom 55%", onToggle: function (s) { if (s.isActive) setAm(i); } });
      });
    });

    var cards = $$(".stack__card");
    cards.forEach(function (card, i) {
      var img = $(".stack__media img", card);
      if (img) gsap.fromTo(img, { yPercent: -6 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "top top", scrub: true } });
      var next = cards[i + 1]; if (!next) return;
      gsap.to(card, { scale: 0.93 - (cards.length - i) * 0.006, filter: "brightness(.7)", ease: "none",
        scrollTrigger: { trigger: next, start: "top 60%", end: "top " + (100 + i * 14) + "px", scrub: true } });
    });

    var route = $(".route");
    if (route) {
      var fill = $(".route__fill", route), car = $(".route__car", route), line = $(".route__line", route), stops = $$(".reach__stop", route);
      ScrollTrigger.create({
        trigger: route, start: "top 70%", end: "bottom 60%", scrub: 0.5,
        onUpdate: function (s) {
          var p = s.progress, h = line.offsetHeight;
          fill.style.transform = "scaleY(" + p + ")"; car.style.transform = "translateY(" + p * h + "px)";
          var lr = line.getBoundingClientRect(), headY = lr.top + p * h;
          stops.forEach(function (st) { st.classList.toggle("is-on", st.getBoundingClientRect().top + 14 <= headY + 2); });
        }
      });
    }

    var fm = $("[data-foot-mark] img");
    if (fm) gsap.from(fm, { y: 40, opacity: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: fm, start: "top 95%", once: true } });

    var pb = document.createElement("div"); pb.className = "progress"; document.body.appendChild(pb);
    gsap.to(pb, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

    window.addEventListener("load", function () { ScrollTrigger.refresh(); });
  } else {
    var f = $(".tub__frame"); if (f) f.style.clipPath = "none";
    $$(".reach__stop").forEach(function (s) { s.classList.add("is-on"); });
  }

  /* ---------- hover image list ---------- */
  var items = $$("[data-img]");
  if (items.length && finePointer) {
    var hv = document.createElement("div"); hv.className = "hover-img"; hv.innerHTML = "<img alt=''>"; document.body.appendChild(hv);
    var hImg = hv.firstChild, hx = 0, hy = 0, tx2 = 0, ty2 = 0, running = false;
    var follow = function () { hx += (tx2 - hx) * 0.14; hy += (ty2 - hy) * 0.14; hv.style.left = hx + "px"; hv.style.top = hy + "px"; if (running) requestAnimationFrame(follow); };
    items.forEach(function (it) {
      it.addEventListener("mouseenter", function (e) { hImg.src = it.getAttribute("data-img"); tx2 = hx = e.clientX; ty2 = hy = e.clientY; hv.classList.add("is-on"); if (!running) { running = true; follow(); } });
      it.addEventListener("mousemove", function (e) { tx2 = e.clientX + 40; ty2 = e.clientY; });
      it.addEventListener("mouseleave", function () { hv.classList.remove("is-on"); running = false; });
    });
  }

  /* ---------- season compare ---------- */
  $$(".compare").forEach(function (c) {
    var input = $("input", c), set = function (v) { c.style.setProperty("--pos", v + "%"); };
    input.addEventListener("input", function () { set(input.value); }); set(input.value);
    if (hasGsap) ScrollTrigger.create({ trigger: c, start: "top 70%", once: true, onEnter: function () {
      var o = { v: 50 }, u = function () { set(o.v); input.value = o.v; };
      gsap.timeline().to(o, { v: 76, duration: 1, ease: "power2.inOut", onUpdate: u }).to(o, { v: 50, duration: 1.1, ease: "power2.inOut", onUpdate: u });
    } });
  });

  /* ---------- lightbox ---------- */
  var lbItems = $$("[data-lb]");
  if (lbItems.length) {
    var lb = document.createElement("div"); lb.className = "lb"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true");
    lb.innerHTML = '<img alt=""><div class="lb__cap"></div><button class="lb__btn lb__close" aria-label="Close"><svg><use href="#i-close"/></svg></button><button class="lb__btn lb__prev" aria-label="Previous"><svg><use href="#i-arrow"/></svg></button><button class="lb__btn lb__next" aria-label="Next"><svg><use href="#i-arrow"/></svg></button>';
    document.body.appendChild(lb);
    var li = 0, lImg = $("img", lb), lCap = $(".lb__cap", lb);
    var show = function (i) { li = (i + lbItems.length) % lbItems.length; var a = lbItems[li]; lImg.src = a.getAttribute("href"); lImg.alt = a.getAttribute("data-cap") || ""; lCap.textContent = a.getAttribute("data-cap") || ""; };
    var close = function () { lb.classList.remove("is-open"); if (lenis) lenis.start(); };
    lbItems.forEach(function (a, i) { a.addEventListener("click", function (e) { e.preventDefault(); show(i); lb.classList.add("is-open"); if (lenis) lenis.stop(); }); });
    $(".lb__close", lb).addEventListener("click", close);
    $(".lb__prev", lb).addEventListener("click", function () { show(li - 1); });
    $(".lb__next", lb).addEventListener("click", function () { show(li + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) { if (!lb.classList.contains("is-open")) return; if (e.key === "Escape") close(); if (e.key === "ArrowRight") show(li + 1); if (e.key === "ArrowLeft") show(li - 1); });
    var sx2 = 0;
    lb.addEventListener("touchstart", function (e) { sx2 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) { var dx = e.changedTouches[0].clientX - sx2; if (Math.abs(dx) > 50) show(li + (dx < 0 ? 1 : -1)); });
  }

  /* ---------- booking form to WhatsApp ---------- */
  var form = $("#bookingForm");
  if (form) {
    var today = new Date().toISOString().split("T")[0];
    $$('input[type="date"]', form).forEach(function (d) { d.min = today; });
    var ci = form.elements.checkin, co = form.elements.checkout;
    if (ci && co) ci.addEventListener("change", function () { co.min = ci.value; if (co.value && co.value < ci.value) co.value = ""; });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var v = function (n) { var el = form.elements[n]; return el ? (el.value || "").trim() : ""; };
      var lines = ["Hello Ouroboros Koksar, I would like to enquire about a stay.", "", "Name: " + v("name"), "Phone: " + v("phone")];
      if (v("email")) lines.push("Email: " + v("email"));
      if (v("checkin")) lines.push("Check-in: " + v("checkin"));
      if (v("checkout")) lines.push("Check-out: " + v("checkout"));
      if (v("guests")) lines.push("Guests: " + v("guests"));
      var occ = form.querySelector('input[name="occasion"]:checked'); if (occ) lines.push("Occasion: " + occ.value);
      var extras = $$('input[name="extras"]:checked', form).map(function (x) { return x.value; });
      if (extras.length) lines.push("Add-ons: " + extras.join(", "));
      if (v("message")) lines.push("", v("message"));
      window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
      var ok = $(".form__ok", form); if (ok) ok.classList.add("is-on");
    });
  }

  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  $$("[data-tel]").forEach(function (a) { a.setAttribute("href", "tel:" + PHONE); });
})();
