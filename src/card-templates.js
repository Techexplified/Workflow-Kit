import { TRELLO_APP_KEY, TRELLO_APP_NAME, TRELLO_APP_AUTHOR } from './config.js';
import { checklistTemplatesByWorkflow } from './checklist-templates.js';
import { createCardWithChecklist } from './card-creator.js';
import { getOpenLists } from './list-creator.js';

/* global TrelloPowerUp */
const t =
  typeof window.TrelloPowerUp !== 'undefined' && window.TrelloPowerUp.iframe
    ? window.TrelloPowerUp.iframe({
        appKey: TRELLO_APP_KEY,
        appName: TRELLO_APP_NAME,
        appAuthor: TRELLO_APP_AUTHOR,
      })
    : null;

function closeView() {
  if (t) {
    if (typeof t.closeModal === 'function') {
      t.closeModal();
    } else if (typeof t.closePopup === 'function') {
      t.closePopup();
    }
  } else {
    window.close();
  }
}

function resizeView() {
  if (t && typeof t.sizeTo === 'function') {
    t.sizeTo('#container').catch(() => {});
  }
}

const WORKFLOW_TITLES = {
  marketing: 'Marketing',
  'real-estate': 'Real Estate',
  events: 'Events',
};

const CARD_THEMES = {
  'product-launch': { bg: '#FFF5F5', border: '#FEE2E2', iconBg: '#FCE7E7' },
  'brand-campaign': { bg: '#F0F7FF', border: '#DBEAFE', iconBg: '#DBEAFE' },
  'content-marketing': { bg: '#F0FDF4', border: '#DCFCE7', iconBg: '#D1FAE5' },
  'event-marketing': { bg: '#FAF5FF', border: '#EDE9FE', iconBg: '#EDE9FE' },
};

const SVG_TEMPLATE_ICONS = {
  'product-launch': `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E11D48" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  `,
  'brand-campaign': `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  `,
  'content-marketing': `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  `,
  'event-marketing': `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
      <circle cx="8" cy="14" r="1" fill="currentColor"/>
      <circle cx="12" cy="14" r="1" fill="currentColor"/>
      <circle cx="16" cy="14" r="1" fill="currentColor"/>
      <circle cx="8" cy="17" r="1" fill="currentColor"/>
      <circle cx="12" cy="17" r="1" fill="currentColor"/>
      <circle cx="16" cy="17" r="1" fill="currentColor"/>
    </svg>
  `,
};

function getTemplateIcon(template) {
  if (SVG_TEMPLATE_ICONS[template.id]) {
    return SVG_TEMPLATE_ICONS[template.id];
  }
  return template.icon || '📋';
}

function renderListView(workflowId) {
  const container = document.getElementById('view-container');
  if (!container) return;

  const headerSubtext = document.getElementById('header-subtext');
  if (headerSubtext) {
    headerSubtext.textContent = 'Choose a template to get a pre-built checklist and start faster.';
    headerSubtext.style.display = 'block';
  }

  const templates = (workflowId && checklistTemplatesByWorkflow[workflowId]) || [];
  const workflowTitle =
    WORKFLOW_TITLES[workflowId] ||
    (workflowId ? workflowId.charAt(0).toUpperCase() + workflowId.slice(1) : 'Workflow');

  if (templates.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        No card templates available for this workflow yet.
      </div>
      <div class="footer-row">
        <div class="footer-info">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>Templates are provided by <strong>Workflow Kit</strong></span>
        </div>
        <button id="cancel-btn" class="cancel-button">Cancel</button>
      </div>
    `;

    const cancelBtn = document.getElementById('cancel-btn');
    if (cancelBtn) cancelBtn.addEventListener('click', closeView);
    resizeView();
    return;
  }

  container.innerHTML = `
    <div class="section-heading">${workflowTitle} Templates (${templates.length})</div>
    <div class="template-grid" id="template-grid"></div>
    <div class="footer-row">
      <div class="footer-info">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <span>Templates are provided by <strong>Workflow Kit</strong></span>
      </div>
      <button id="cancel-btn" class="cancel-button">Cancel</button>
    </div>
  `;

  const grid = document.getElementById('template-grid');
  templates.forEach((template) => {
    const theme = CARD_THEMES[template.id] || {
      bg: '#F8FAFC',
      border: '#E2E8F0',
      iconBg: template.iconBg || '#EDE9FE',
    };

    const card = document.createElement('div');
    card.className = 'card-item';
    card.style.backgroundColor = theme.bg;
    card.style.borderColor = theme.border;

    const iconBox = document.createElement('div');
    iconBox.className = 'card-icon-box';
    iconBox.style.backgroundColor = template.iconBg || theme.iconBg;
    iconBox.innerHTML = getTemplateIcon(template);

    const info = document.createElement('div');
    info.className = 'card-info';

    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = template.title;

    const desc = document.createElement('div');
    desc.className = 'card-desc';
    desc.textContent = template.description;

    info.appendChild(title);
    info.appendChild(desc);

    const chevron = document.createElement('div');
    chevron.className = 'card-chevron';
    chevron.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    `;

    card.appendChild(iconBox);
    card.appendChild(info);
    card.appendChild(chevron);

    card.addEventListener('click', () => {
      renderPreviewView(template, workflowId);
    });

    grid.appendChild(card);
  });

  const cancelBtn = document.getElementById('cancel-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeView);
  }

  resizeView();
}

function renderPreviewView(template, workflowId) {
  const container = document.getElementById('view-container');
  if (!container) return;

  const headerSubtext = document.getElementById('header-subtext');
  if (headerSubtext) {
    headerSubtext.style.display = 'none';
  }

  const checklistItems = template.checklist || [];
  const theme = CARD_THEMES[template.id] || {
    bg: '#F8FAFC',
    border: '#E2E8F0',
    iconBg: template.iconBg || '#EDE9FE',
  };

  container.innerHTML = `
    <div class="preview-container">
      <div class="preview-badge-row">
        <div class="preview-badge-icon" style="background-color: ${template.iconBg || theme.iconBg};">
          ${getTemplateIcon(template)}
        </div>
        <div class="preview-badge-text">${template.title}</div>
      </div>

      <div class="preview-heading-group">
        <div class="section-heading" style="margin-bottom: 2px;">Checklist (${checklistItems.length})</div>
        <div class="preview-subtext">This checklist will be added to your card.</div>
      </div>

      <div class="checklist-list" id="checklist-list"></div>

      <div id="inline-error-container"></div>
    </div>

    <div class="footer-row">
      <button id="back-btn" class="back-button">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back
      </button>
      <button id="create-card-btn" class="create-card-button">
        Create Card
      </button>
    </div>
  `;

  const listEl = document.getElementById('checklist-list');
  checklistItems.forEach((itemText) => {
    const item = document.createElement('div');
    item.className = 'checklist-item';
    item.innerHTML = `
      <div class="checklist-checkbox-mock"></div>
      <div class="checklist-item-text">${itemText}</div>
    `;
    listEl.appendChild(item);
  });

  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      renderListView(workflowId);
    });
  }

  const createCardBtn = document.getElementById('create-card-btn');
  if (createCardBtn) {
    createCardBtn.addEventListener('click', () => {
      handleCreateCard(template);
    });
  }

  resizeView();
}

async function handleCreateCard(template) {
  const createCardBtn = document.getElementById('create-card-btn');
  const backBtn = document.getElementById('back-btn');
  const errorContainer = document.getElementById('inline-error-container');

  if (errorContainer) errorContainer.innerHTML = '';

  if (createCardBtn) {
    createCardBtn.disabled = true;
    createCardBtn.innerHTML = `
      <div class="btn-spinner"></div>
      <span>Creating Card…</span>
    `;
  }
  if (backBtn) backBtn.disabled = true;

  try {
    const urlParams = new URLSearchParams(window.location.search);
    let firstListId = urlParams.get('firstListId') || null;
    if (firstListId === 'undefined' || firstListId === 'null' || (typeof firstListId === 'string' && firstListId.trim() === '')) {
      firstListId = null;
    }

    if (!firstListId && t && typeof t.get === 'function') {
      try {
        firstListId = await t.get('board', 'shared', 'activeWorkflowFirstListId');
      } catch (e) {
        console.warn('Could not read activeWorkflowFirstListId:', e);
      }
    }

    await createCardWithChecklist(t, firstListId, template);

    if (t && typeof t.alert === 'function') {
      t.alert({
        message: `"${template.title}" card created with checklist.`,
        display: 'success',
        duration: 6,
      });
    }

    closeView();
  } catch (err) {
    console.error('Failed to create card with checklist:', err);

    if (createCardBtn) {
      createCardBtn.disabled = false;
      createCardBtn.innerHTML = 'Create Card';
    }
    if (backBtn) backBtn.disabled = false;

    if (errorContainer) {
      const displayMsg = err && err.message ? err.message : 'Failed to create card. Please try again.';
      errorContainer.innerHTML = `
        <div class="inline-error-box">
          <div class="inline-error-content">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>${displayMsg}</span>
          </div>
          <button id="retry-link-btn" class="retry-link-btn">Retry</button>
        </div>
      `;

      const retryLinkBtn = document.getElementById('retry-link-btn');
      if (retryLinkBtn) {
        retryLinkBtn.addEventListener('click', () => {
          handleCreateCard(template);
        });
      }
    }

    resizeView();
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const closeBtn = document.getElementById('close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeView);
  }

  const urlParams = new URLSearchParams(window.location.search);
  let workflowId = urlParams.get('workflowId');

  if (!workflowId && t && typeof t.get === 'function') {
    try {
      const storedId = await t.get('board', 'shared', 'activeWorkflowId');
      if (storedId) workflowId = storedId;
    } catch (err) {
      console.warn('Could not retrieve activeWorkflowId:', err);
    }
  }

  if (!workflowId) {
    workflowId = 'marketing';
  }

  renderListView(workflowId);

  if (t && typeof t.render === 'function') {
    t.render(() => {
      resizeView();
    });
  }
});
