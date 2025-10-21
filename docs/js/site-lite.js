(function () {
  var THEME_KEY = 'site_theme_v1';
  var opts = window.SITE_LITE_OPTIONS || {};

  function applyTheme() {
    try {
      var saved = localStorage.getItem(THEME_KEY);
      if (saved === 'dark') document.documentElement.classList.add('dark');
      else if (saved === 'light') document.documentElement.classList.remove('dark');
      else if (opts.autoRespectPrefersColorScheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      }
    } catch (e) { }
  }

  function toggleTheme() {
    var isDark = document.documentElement.classList.toggle('dark');
    try { localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light'); } catch (e) {}
  }

  function bindToggles() {
    var btns = document.querySelectorAll('[data-theme-toggle]');
    Array.prototype.forEach.call(btns, function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); toggleTheme(); });
    });
    var legacy = document.getElementById('theme-toggle');
    if (legacy) legacy.addEventListener('click', function (e) { e.preventDefault(); toggleTheme(); });
  }

  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('show'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('show'); o.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
  }

  window.siteLite = {
    toggleTheme: toggleTheme,
    applyTheme: applyTheme
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      applyTheme();
      bindToggles();
      initReveal();
    });
  } else {
    applyTheme();
    bindToggles();
    initReveal();
  }
})();