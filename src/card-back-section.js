import { TRELLO_APP_KEY, TRELLO_APP_NAME, TRELLO_APP_AUTHOR } from './config.js';

/* global TrelloPowerUp */
const t =
  typeof window.TrelloPowerUp !== 'undefined' && window.TrelloPowerUp.iframe
    ? window.TrelloPowerUp.iframe({
        appKey: TRELLO_APP_KEY,
        appName: TRELLO_APP_NAME,
        appAuthor: TRELLO_APP_AUTHOR,
      })
    : null;

function resizeSection() {
  if (t && typeof t.sizeTo === 'function') {
    t.sizeTo('#section-container').catch(() => {});
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const addBtn = document.getElementById('add-checklist-btn');
  const badgeEl = document.getElementById('list-badge');
  const subtitleEl = document.getElementById('section-subtitle');

  if (t) {
    try {
      let card = null;
      if (typeof t.card === 'function') {
        try {
          card = await t.card('id', 'name', 'idList');
        } catch (e) {}
      }

      let listName = '';
      if (card && card.idList && typeof t.lists === 'function') {
        try {
          const boardLists = await t.lists('id', 'name');
          if (Array.isArray(boardLists)) {
            const found = boardLists.find((l) => l.id === card.idList);
            if (found) listName = found.name;
          }
        } catch (e) {}
      } else if (typeof t.list === 'function') {
        try {
          const l = await t.list('id', 'name');
          if (l) listName = l.name;
        } catch (e) {}
      }

      if (listName) {
        if (badgeEl) {
          badgeEl.textContent = listName;
          badgeEl.style.display = 'inline-block';
        }
        if (subtitleEl) {
          subtitleEl.textContent = `Pre-built checklists ready for "${listName}"`;
        }
      }
    } catch (err) {
      console.warn('Error reading card list in card-back-section:', err);
    }
  }

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      if (t && typeof t.modal === 'function') {
        t.modal({
          title: 'Workflow Kit - Add Checklist',
          url: t.signUrl('./card-templates.html'),
          fullscreen: true,
          accentColor: '#7C3AED',
        });
      } else {
        window.open('./card-templates.html', '_blank');
      }
    });
  }

  resizeSection();

  if (t && typeof t.render === 'function') {
    t.render(() => {
      resizeSection();
    });
  }
});
