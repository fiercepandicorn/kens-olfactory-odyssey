/* Ken's Olfactory Odyssey — interactions */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  /* ---- Sticky nav state ---- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 24) nav.classList.add("is-stuck");
    else nav.classList.remove("is-stuck");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Hero entrance ---- */
  var hero = document.getElementById("hero");
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { if (hero) hero.classList.add("in"); });
  });

  /* ---- Marquee: duplicate track for seamless loop ---- */
  var mq = document.getElementById("marquee");
  if (mq) { mq.innerHTML += mq.innerHTML; }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Age distribution bar: reveal on view ---- */
  var ageStack = document.getElementById("ageStack");
  if (ageStack) {
    if ("IntersectionObserver" in window) {
      var so = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { ageStack.classList.add("in"); so.disconnect(); } });
      }, { threshold: 0.3 });
      so.observe(ageStack);
    } else { ageStack.classList.add("in"); }
  }

  /* ---- Count-up figures (instrument calibration) ---- */
  (function () {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var nums = document.querySelectorAll(".stat .n[data-count]");
    var grid = document.querySelector(".kit-grid");
    if (!nums.length || !grid) return;
    function fmt(el, v) {
      var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
      var s = dec > 0 ? v.toFixed(dec) : String(Math.round(v));
      if (el.hasAttribute("data-comma")) s = Number(s).toLocaleString("en-US");
      return (el.getAttribute("data-prefix") || "") + s;
    }
    function run(el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var tn = el.firstChild;
      if (!tn || tn.nodeType !== 3) return;
      var t0 = performance.now(), dur = 1500;
      function step(now) {
        var p = Math.min(1, (now - t0) / dur);
        var e = 1 - Math.pow(1 - p, 3);
        tn.nodeValue = fmt(el, target * e);
        if (p < 1) requestAnimationFrame(step); else tn.nodeValue = fmt(el, target);
      }
      requestAnimationFrame(step);
    }
    var fired = false;
    function go() { if (fired) return; fired = true; nums.forEach(run); }
    if ("IntersectionObserver" in window) {
      var o = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { go(); o.disconnect(); } });
      }, { threshold: 0.25 });
      o.observe(grid);
    } else { go(); }
  })();

  /* ---- Specimen analysis: fill accord + measurement bars on view ---- */
  (function () {
    var analysis = document.querySelector(".analysis");
    if (!analysis) return;
    var fills = analysis.querySelectorAll(".ax-fill[data-pct]");
    var done = false;
    function fill() {
      if (done) return; done = true;
      fills.forEach(function (b) { b.style.width = b.getAttribute("data-pct") + "%"; });
    }
    if ("IntersectionObserver" in window) {
      var ob = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { fill(); ob.disconnect(); } });
      }, { threshold: 0.2 });
      ob.observe(analysis);
    } else { fill(); }
  })();

  /* ---- Specimen viewer (inline reel) ---- */
  (function () {
    var reel = document.getElementById("reel");
    if (!reel) return;
    var frame = document.getElementById("reelFrame");
    var sidEl = document.getElementById("reelSid");
    var titleEl = document.getElementById("reelTitle");
    var UPLOADS = "UUL0rWUyXSw27LOGw1Vhx1lQ"; // channel uploads playlist (newest first)
    function open(vid, sid, title) {
      if (sid) sidEl.textContent = sid;
      if (title) titleEl.textContent = title;
      var src = vid
        ? "https://www.youtube.com/embed/" + vid + "?autoplay=1&rel=0&playsinline=1&modestbranding=1"
        : "https://www.youtube.com/embed/videoseries?list=" + UPLOADS + "&autoplay=1&rel=0&playsinline=1&modestbranding=1";
      frame.innerHTML = '<iframe src="' + src +
        '" title="Ken\'s Olfactory Odyssey — ' + (title || 'reel') + '" ' +
        'allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
      reel.classList.add("open");
      reel.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function close() {
      reel.classList.remove("open");
      reel.setAttribute("aria-hidden", "true");
      frame.innerHTML = "";
      document.body.style.overflow = "";
    }
    document.querySelectorAll(".short-card").forEach(function (card) {
      card.addEventListener("click", function (e) {
        e.preventDefault();
        var sid = card.querySelector(".sid");
        var title = card.querySelector(".short-title");
        open(card.getAttribute("data-vid"), sid ? sid.textContent : "Specimen", title ? title.textContent : "");
      });
    });
    reel.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-reel-close")) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && reel.classList.contains("open")) close();
    });
  })();

  /* ---- Daily-views chart: grow bars on view ---- */
  (function () {
    var chart = document.getElementById("viewChart");
    if (!chart) return;
    var bars = chart.querySelectorAll(".vbar");
    var done = false;
    function grow() {
      if (done) return; done = true;
      bars.forEach(function (b, i) {
        setTimeout(function () { b.style.height = (b.getAttribute("data-h") || 0) + "%"; }, i * 26);
      });
    }
    if ("IntersectionObserver" in window) {
      var o = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { grow(); o.disconnect(); } });
      }, { threshold: 0.3 });
      o.observe(chart);
    } else { grow(); }
  })();

  /* ---- Smooth anchor offset for fixed nav ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (ev) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      ev.preventDefault();
      var y = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });
})();
