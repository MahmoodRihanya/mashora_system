(function () {
  "use strict";

  /* النصوص القليلة التي يكتبها الـJS — حسب لغة الصفحة (<html lang>) */
  var IS_AR = document.documentElement.lang === "ar";
  var TEXT = IS_AR
    ? { openMenu: "فتح القائمة", closeMenu: "إغلاق القائمة", soon: "قريبًا" }
    : { openMenu: "Open menu", closeMenu: "Close menu", soon: "Soon" };

  /* ---------------------------------------------------------------- icons
   * One inline sprite injected at load, referenced as <use href="#i-name"/>.
   * Inline (not an external .svg file) so icons also work when the pages are
   * opened straight from disk (file://), where external <use> is blocked. */
  var ICONS = {
    logo: '<circle cx="60" cy="60" r="52" style="fill:var(--logo-fill,#f0fdfa);stroke:var(--logo-stroke,#0f766e)" stroke-width="5"/><path d="M26 60h22l10-26 13 54 10-28h23" fill="none" style="stroke:var(--logo-stroke,#0f766e)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>',
    video: '<path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    clip: '<path d="m21.4 11.1-9.2 9.2a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
    heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    verified: '<path d="M3.9 8.6a4 4 0 0 1 4.7-4.7 4 4 0 0 1 6.8 0 4 4 0 0 1 4.7 4.7 4 4 0 0 1 0 6.8 4 4 0 0 1-4.7 4.7 4 4 0 0 1-6.8 0 4 4 0 0 1-4.7-4.7 4 4 0 0 1 0-6.8Z"/><path d="m9 12 2 2 4-4"/>',
    support: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    bank: '<path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l9 5H3z"/>',
    "user-plus": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5M12 3v12"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    arrow: '<path d="M5 12h14M13 5l7 7-7 7"/>',
    chev: '<path d="m6 9 6 6 6-6"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    steth: '<path d="M11 2v2M5 2v2M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/>',
    phone: '<rect x="5" y="2" width="14" height="20" rx="3"/><path d="M11 18h2"/>',
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M8 16H3v5"/>',
    pill: '<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>',
    percent: '<path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
    "cal-x": '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M14 14l-4 4M10 14l4 4"/>',
    repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
    msg: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="m9 12 2 2 4-4"/>',
    sparkles: '<path d="M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2z"/><path d="M19 3v4M21 5h-4"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
    mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4"/>',
    cam: '<path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    "phone-off": '<path d="M10.7 13.3a16 16 0 0 0 3.4 2.6l1.3-1.3a2 2 0 0 1 2.1-.5 13 13 0 0 0 2.8.7 2 2 0 0 1 1.7 2v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3 4.2 2 2 0 0 1 5 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.9 9.9"/><path d="M22 2 2 22"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    alert: '<path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"/><path d="M12 9v4M12 17h.01"/>',
    bulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6M10 22h4"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    filter: '<path d="M22 3H2l8 9.5V19l4 2v-8.5z"/>',
    home: '<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    apple: '<path d="M16.4 1.4c0 1.1-.5 2.1-1.2 2.8-.8.8-2.1 1.4-3.1 1.4-.1-1.1.4-2.2 1.2-3 .8-.8 2.1-1.4 3.1-1.2zM19.6 18.6c-.5 1-1 2-1.7 2.9-.9 1.2-1.6 2-2.8 2-1 0-1.3-.6-2.8-.6s-1.8.6-2.7.7c-1.1 0-2-1.3-2.9-2.4-1.9-2.4-3.3-6.8-1.4-9.8 1-1.5 2.6-2.4 4.5-2.4 1.1 0 2.1.7 2.8.7.7 0 1.9-.9 3.2-.8.6 0 2.1.2 3.1 1.7-.1 0-1.8 1.1-1.8 3.2 0 2.5 2.2 3.4 2.2 3.4z"/>',
    play: '<path d="M3.6 2.2c-.4.3-.6.8-.6 1.3v17c0 .5.2 1 .6 1.3l9.4-9.8z"/><path d="m15.9 11 2.6-1.5c.8-.4 1.2-1 1.2-1.6s-.4-1.2-1.2-1.7l-2.9-1.6-3 3.2z"/><path d="m13 12-9.4 9.8c.3.1.6.1.9 0l.6-.2 10.7-6.1-2.8-2.8z"/><path d="M13 11.9v.1l2.9-2.9-10.7-6c-.3-.2-.6-.2-.9-.1z"/>'
  };

  function injectSprite() {
    var symbols = Object.keys(ICONS).map(function (name) {
      var viewBox = name === "logo" ? "0 0 120 120" : "0 0 24 24";
      return '<symbol id="i-' + name + '" viewBox="' + viewBox + '">' + ICONS[name] + "</symbol>";
    }).join("");
    var holder = document.createElement("div");
    holder.setAttribute("aria-hidden", "true");
    holder.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
    holder.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + symbols + "</svg>";
    document.body.insertBefore(holder, document.body.firstChild);
  }

  /* ---------------------------------------------------------------- links */
  function applyLinks() {
    var links = window.MASHORA_LINKS || {};
    document.querySelectorAll("[data-link]").forEach(function (el) {
      var key = el.getAttribute("data-link");
      var value = (links[key] || "").trim();

      if (!value) {
        if (el.hasAttribute("data-hide-empty")) {
          var row = el.closest("li") || el;
          row.hidden = true;
          return;
        }
        el.classList.add("is-soon");
        el.setAttribute("aria-disabled", "true");
        if (!el.hasAttribute("data-soon")) el.setAttribute("data-soon", TEXT.soon);
        el.addEventListener("click", function (event) { event.preventDefault(); });
        return;
      }

      if (key === "supportEmail") {
        el.setAttribute("href", "mailto:" + value);
      } else {
        el.setAttribute("href", value);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
      }
    });
  }

  /* ---------------------------------------------------------------- theme */
  var THEME_KEY = "mashora-theme";

  function currentTheme() {
    var explicit = document.documentElement.getAttribute("data-theme");
    if (explicit) return explicit;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function setupTheme() {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.addEventListener("click", function () {
        var next = currentTheme() === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* storage unavailable */ }
      });
    });
  }

  /* ---------------------------------------------------------------- nav */
  function setupNav() {
    var nav = document.querySelector("[data-nav]");
    var toggle = document.querySelector("[data-menu-toggle]");
    var menu = document.getElementById("mobile-menu");

    if (nav) {
      var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 8); };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    if (!toggle || !menu) return;

    function setOpen(open) {
      menu.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? TEXT.closeMenu : TEXT.openMenu);
      toggle.querySelector("use").setAttribute("href", open ? "#i-x" : "#i-menu");
      document.body.classList.toggle("menu-open", open);
    }

    toggle.addEventListener("click", function () { setOpen(menu.hidden); });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
    document.addEventListener("keydown", function (event) { if (event.key === "Escape" && !menu.hidden) setOpen(false); });
    window.addEventListener("resize", function () { if (window.innerWidth >= 960 && !menu.hidden) setOpen(false); });
  }

  /* ---------------------------------------------------------------- reveal */
  function setupReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------------- guide table of contents */
  function setupScrollSpy() {
    var links = document.querySelectorAll(".toc a[href^='#']");
    if (!links.length || !("IntersectionObserver" in window)) return;

    var byId = {};
    links.forEach(function (link) { byId[link.getAttribute("href").slice(1)] = link; });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) { link.classList.remove("is-active"); });
        var active = byId[entry.target.id];
        if (active) active.classList.add("is-active");
      });
    }, { rootMargin: "-30% 0px -60% 0px" });

    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* ---------------------------------------------------------------- language
   * زر التبديل يحفظ اختيار الزائر (يُقرأ بسكربت <head> بكل صفحة ليفتحها بلغته
   * مباشرة بالزيارات القادمة) وينقل نفس القسم (#hash) للصفحة المقابلة. */
  var LANG_KEY = "mashora-lang";

  function setupLangSwitch() {
    document.querySelectorAll("[data-lang-switch]").forEach(function (link) {
      link.addEventListener("click", function () {
        try { localStorage.setItem(LANG_KEY, link.getAttribute("data-lang-switch")); } catch (e) { /* storage unavailable */ }
        if (location.hash) link.setAttribute("href", link.getAttribute("href").split("#")[0] + location.hash);
      });
    });
  }

  function setupYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
  }

  injectSprite();
  applyLinks();
  setupTheme();
  setupNav();
  setupReveal();
  setupScrollSpy();
  setupLangSwitch();
  setupYear();
})();
