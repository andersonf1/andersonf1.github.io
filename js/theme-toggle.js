(function () {
  const html = document.documentElement;
  const btn = document.getElementById('theme-toggle');

  function setTheme(mode) {
    if (!mode) mode = 'light';
    html.setAttribute('data-theme', mode);
    try { localStorage.setItem('theme', mode); } catch (e) {}
    if (btn) {
      btn.textContent = mode === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-pressed', mode === 'dark' ? 'true' : 'false');
    }
  }

  // Initialize from localStorage or prefers-color-scheme
  try {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setTheme(saved);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  } catch (e) {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }

  if (btn) {
    btn.addEventListener('click', function () {
      const current = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }
})();