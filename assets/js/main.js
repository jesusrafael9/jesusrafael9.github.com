/*
 * jesusrafael9.github.io
 * Plain JavaScript, no dependencies:
 *   1. light/dark theme toggle, remembered in localStorage
 *   2. current year in the footer
 *   3. project cards rendered from data/projects.json
 */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------------------------------------------------------------- Theme */
  // The stored theme is applied by the inline script in <head> before the
  // first paint; this part only handles the button and keeps the UI in sync.

  var THEME_KEY = 'theme';
  var THEME_COLORS = { light: '#faf9f6', dark: '#131211' };
  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  var toggle = document.querySelector('[data-theme-toggle]');

  function systemTheme() {
    return darkQuery.matches ? 'dark' : 'light';
  }

  function currentTheme() {
    var forced = root.getAttribute('data-theme');
    return forced === 'light' || forced === 'dark' ? forced : systemTheme();
  }

  function syncThemeUi() {
    var theme = currentTheme();
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(theme === 'dark'));
    }
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (meta) {
      meta.setAttribute('content', THEME_COLORS[theme]);
    });
  }

  function setTheme(theme) {
    // Choosing what the system already asks for clears the override, so the
    // page goes back to following the system preference.
    var override = theme === systemTheme() ? null : theme;
    if (override) {
      root.setAttribute('data-theme', override);
    } else {
      root.removeAttribute('data-theme');
    }
    try {
      if (override) {
        localStorage.setItem(THEME_KEY, override);
      } else {
        localStorage.removeItem(THEME_KEY);
      }
    } catch (e) {
      // Storage can be blocked (private mode); the theme still applies for this visit.
    }
    syncThemeUi();
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });
  }
  if (darkQuery.addEventListener) {
    darkQuery.addEventListener('change', syncThemeUi);
  }
  syncThemeUi();

  /* ----------------------------------------------------------------- Year */

  document.querySelectorAll('[data-year]').forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  /* ------------------------------------------------------------- Projects */
  // Only entries with "status": "published" are rendered. While there are
  // none (or the JSON cannot be loaded) the section and its nav link stay hidden.

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) {
      node.className = className;
    }
    if (text) {
      node.textContent = text;
    }
    return node;
  }

  function isHttpUrl(value) {
    return typeof value === 'string' && /^https?:\/\//i.test(value);
  }

  function projectLink(url, label, projectName) {
    var link = el('a', 'project__link', label);
    link.href = url;
    link.setAttribute('aria-label', label + ': ' + projectName);
    return link;
  }

  function projectCard(project, copy, labels) {
    var card = el('li', 'card project');

    var header = el('div', 'project__header');
    header.appendChild(el('h3', 'project__name', project.name));
    if (project.language) {
      header.appendChild(el('span', 'tag', project.language));
    }
    card.appendChild(header);

    card.appendChild(el('p', 'project__tagline', copy.tagline));

    if (copy.problem) {
      card.appendChild(el('p', 'card__text', copy.problem));
    }

    var highlights = Array.isArray(copy.highlights) ? copy.highlights.filter(Boolean) : [];
    if (highlights.length) {
      var list = el('ul', 'project__highlights');
      highlights.forEach(function (item) {
        list.appendChild(el('li', '', item));
      });
      card.appendChild(list);
    }

    var links = el('p', 'project__links');
    if (isHttpUrl(project.repo)) {
      links.appendChild(projectLink(project.repo, labels.repo, project.name));
    }
    if (isHttpUrl(project.demo)) {
      links.appendChild(projectLink(project.demo, labels.demo, project.name));
    }
    if (links.childNodes.length) {
      card.appendChild(links);
    }

    return card;
  }

  function renderProjects(section, projects, lang) {
    var list = section.querySelector('[data-projects-list]');
    if (!list || !Array.isArray(projects)) {
      return;
    }

    var labels = {
      repo: section.getAttribute('data-label-repo') || 'Code',
      demo: section.getAttribute('data-label-demo') || 'Demo'
    };

    var cards = [];
    projects.forEach(function (project) {
      if (!project || project.status !== 'published' || !project.name) {
        return;
      }
      var copy = project[lang] || project.es || project.en;
      if (!copy || !copy.tagline) {
        return;
      }
      cards.push(projectCard(project, copy, labels));
    });

    if (!cards.length) {
      return;
    }

    cards.forEach(function (card) {
      list.appendChild(card);
    });
    section.hidden = false;
    document.querySelectorAll('[data-projects-nav]').forEach(function (item) {
      item.hidden = false;
    });
  }

  var projectsSection = document.querySelector('[data-projects]');
  if (projectsSection && window.fetch) {
    var lang = (root.lang || 'es').slice(0, 2).toLowerCase() === 'en' ? 'en' : 'es';

    fetch(projectsSection.getAttribute('data-src'))
      .then(function (response) {
        if (!response.ok) {
          throw new Error('HTTP ' + response.status);
        }
        return response.json();
      })
      .then(function (projects) {
        renderProjects(projectsSection, projects, lang);
      })
      .catch(function () {
        // Nothing to show: the section stays hidden.
      });
  }
})();
