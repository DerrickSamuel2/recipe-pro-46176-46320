(function () {
  'use strict';

  // Utility helpers
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function navigateTo(path) {
    try {
      window.location.href = path;
    } catch (e) {
      console.warn('Navigation failed:', e, 'Attempted path:', path);
    }
  }

  // PUBLIC_INTERFACE
  function debounce(fn, delay = 300) {
    /** Debounces a function by the given delay (ms). */
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(null, args), delay);
    };
  }

  // PUBLIC_INTERFACE
  function logSelection(type, value) {
    /** Logs a selection for simple demo interactions. */
    console.log(`[Selection] ${type}:`, value);
  }

  // Sign In screen bindings
  (function initSignIn() {
    const screen = document.getElementById('sign-in-screen');
    if (!screen) return;

    const btn = document.getElementById('cta-button');
    const email = $('#input-email .input-real');
    const password = $('#input-password .input-real');

    if (btn) {
      btn.addEventListener('click', () => {
        const data = {
          email: email ? email.value : '',
          password: password ? '(hidden)' : ''
        };
        console.log('[Sign In] Submit clicked with data:', data);
        // Navigate to home.html
        navigateTo('./home.html');
      });
    }

    const forgot = document.getElementById('forgot-password');
    if (forgot) {
      forgot.addEventListener('click', () => {
        console.log('[Sign In] Forgot Password clicked');
        alert('Forgot Password clicked');
      });
      forgot.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          forgot.click();
        }
      });
    }

    const btnGoogle = document.getElementById('btn-google');
    if (btnGoogle) {
      btnGoogle.addEventListener('click', () => {
        console.log('[Sign In] Google auth selected');
        alert('Google Sign In');
      });
    }

    const btnFb = document.getElementById('btn-fb');
    if (btnFb) {
      btnFb.addEventListener('click', () => {
        console.log('[Sign In] Facebook auth selected');
        alert('Facebook Sign In');
      });
    }
  })();

  // Home screen bindings
  (function initHome() {
    const homeRoot = document.getElementById('screen-home');
    if (!homeRoot) return;

    // Category chips click logging
    const chips = $$('.chip', homeRoot);
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        logSelection('category', chip.textContent.trim());
      });
    });

    // Recipe cards click logging
    const recipeCards = $$('.dish-card, .new-card', homeRoot);
    recipeCards.forEach((card, idx) => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        logSelection('recipe-card', `Card#${idx + 1}`);
      });
    });

    // Filter button placeholder (navigate or open panel)
    const filterBtn = $('.filter-btn', homeRoot);
    if (filterBtn) {
      filterBtn.style.cursor = 'pointer';
      filterBtn.addEventListener('click', () => {
        console.log('[Home] Filter clicked');
        alert('Open filters (Home)');
      });
    }

    // Nav home indicator buttons (stubs)
    const navHome = $('.nav-home', homeRoot);
    if (navHome) {
      navHome.style.cursor = 'pointer';
      navHome.addEventListener('click', () => navigateTo('./home.html'));
    }
  })();

  // Search screen bindings
  (function initSearch() {
    const searchRoot = document.getElementById('screen-search');
    if (!searchRoot) return;

    // Back button
    const backBtn = document.getElementById('back-button');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        console.log('[Search] Back clicked - navigating to home.html');
        navigateTo('./home.html');
      });
    }

    // Filter button toggle a simple panel
    const filterBtn = document.getElementById('filter-button');
    let filterPanel = null;

    function ensureFilterPanel() {
      if (!filterPanel) {
        filterPanel = document.createElement('div');
        filterPanel.setAttribute('id', 'filter-panel');
        filterPanel.style.position = 'absolute';
        filterPanel.style.right = '20px';
        filterPanel.style.top = '150px';
        filterPanel.style.width = '180px';
        filterPanel.style.padding = '12px';
        filterPanel.style.background = '#ffffff';
        filterPanel.style.border = '1px solid #e5e5e5';
        filterPanel.style.borderRadius = '10px';
        filterPanel.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
        filterPanel.style.zIndex = '999';
        filterPanel.style.display = 'none';
        filterPanel.innerHTML = `
          <strong style="display:block;margin-bottom:8px;font-family:Poppins,sans-serif;font-size:12px;">Filters</strong>
          <label style="display:block;margin-bottom:6px;font-size:12px;"><input type="checkbox" data-filter="veg"> Vegetarian</label>
          <label style="display:block;margin-bottom:6px;font-size:12px;"><input type="checkbox" data-filter="quick"> Under 20 mins</label>
          <label style="display:block;margin-bottom:6px;font-size:12px;"><input type="checkbox" data-filter="popular"> Rating 4.0+</label>
          <button id="apply-filters" style="margin-top:8px;width:100%;height:32px;border:none;border-radius:8px;background:#129575;color:#fff;cursor:pointer;">Apply</button>
        `;
        document.body.appendChild(filterPanel);

        const apply = filterPanel.querySelector('#apply-filters');
        apply.addEventListener('click', () => {
          const active = Array.from(filterPanel.querySelectorAll('input[type="checkbox"]:checked')).map(
            (el) => el.getAttribute('data-filter')
          );
          console.log('[Search] Apply filters:', active);
          alert('Applied filters: ' + (active.join(', ') || 'none'));
          filterPanel.style.display = 'none';
        });
      }
    }

    if (filterBtn) {
      filterBtn.addEventListener('click', () => {
        console.log('[Search] Filter button clicked');
        ensureFilterPanel();
        filterPanel.style.display = filterPanel.style.display === 'none' ? 'block' : 'none';
      });
    }

    // Create an input element overlay for typing and debounce search
    // Replace placeholder text with an actual input while keeping visual layout.
    const searchComponent = $('.search-component', searchRoot);
    if (searchComponent) {
      let input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Search recipe';
      input.setAttribute('aria-label', 'Search recipe');
      input.style.position = 'absolute';
      input.style.left = '10px';
      input.style.top = '6px';
      input.style.width = '235px';
      input.style.height = '28px';
      input.style.border = 'none';
      input.style.outline = 'none';
      input.style.background = 'transparent';
      input.style.fontFamily = 'Poppins, sans-serif';
      input.style.fontSize = '13px';
      input.style.color = '#121212';

      // Hide placeholder div for visual duplication
      const ph = $('.search-placeholder', searchComponent);
      if (ph) ph.style.visibility = 'hidden';

      searchComponent.appendChild(input);

      // Mock list of card titles for filtering by text
      const cards = $$('.cards .card', searchRoot);
      const titleOf = (card) => {
        const t = $('.food-title', card);
        return (t ? t.textContent : '').toLowerCase();
      };

      const runFilter = debounce((q) => {
        const term = q.trim().toLowerCase();
        console.log('[Search] Query:', term);
        cards.forEach((card) => {
          const match = !term || titleOf(card).includes(term);
          card.style.display = match ? 'block' : 'none';
        });
      }, 250);

      input.addEventListener('input', (e) => runFilter(e.target.value));
    }
  })();
})();
