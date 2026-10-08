import { TRELLO_APP_KEY, TRELLO_APP_NAME, TRELLO_APP_AUTHOR } from './config.js';
import { checklistTemplatesByWorkflow, getChecklistForCategoryAndList } from './checklist-templates.js';
import { addChecklistToExistingCard, createCardWithChecklist } from './card-creator.js';
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
    if (typeof t.closePopup === 'function') {
      t.closePopup();
    } else if (typeof t.closeModal === 'function') {
      t.closeModal();
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

const WORKFLOW_BRAND_CONFIG = {
  marketing: {
    bg: '#f5f3ff',
    color: '#7c3aed',
    btnBg: '#7c3aed',
    svg: `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 4.5v12.2a1 1 0 0 1-1.38.93l-5.62-2.34v-8.58l5.62-2.34A1 1 0 0 1 21 4.5zM12 7H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.55.83l3.45-2.3A1 1 0 0 0 12 15.7V7z"/>
      </svg>
    `,
  },
  'real-estate': {
    bg: '#eff6ff',
    color: '#2563eb',
    btnBg: '#2563eb',
    svg: `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3 2 12h3v8a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-8h3L12 3z"/>
      </svg>
    `,
  },
  events: {
    bg: '#f0fdf4',
    color: '#16a34a',
    btnBg: '#16a34a',
    svg: `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V9h14v11z"/>
        <rect x="7" y="11" width="3" height="3" rx="0.5" fill="currentColor"/>
        <rect x="11" y="11" width="3" height="3" rx="0.5" fill="currentColor"/>
        <rect x="15" y="11" width="3" height="3" rx="0.5" fill="currentColor"/>
        <rect x="7" y="15" width="3" height="3" rx="0.5" fill="currentColor"/>
        <rect x="11" y="15" width="3" height="3" rx="0.5" fill="currentColor"/>
        <rect x="15" y="15" width="3" height="3" rx="0.5" fill="currentColor"/>
      </svg>
    `,
  },
};

const CARD_THEMES = {
  // Marketing templates
  'product-launch': { bg: '#FFF5F5', border: '#FEE2E2', iconBg: '#FCE7E7' },
  'brand-campaign': { bg: '#F0F7FF', border: '#DBEAFE', iconBg: '#DBEAFE' },
  'content-marketing': { bg: '#F0FDF4', border: '#DCFCE7', iconBg: '#D1FAE5' },
  'event-marketing': { bg: '#FAF5FF', border: '#EDE9FE', iconBg: '#EDE9FE' },

  // Events templates
  'general-event': { bg: '#FAF5FF', border: '#EDE9FE', iconBg: '#EDE9FE' },
  'corporate-event': { bg: '#F0F7FF', border: '#DBEAFE', iconBg: '#DBEAFE' },
  'wedding-event': { bg: '#FDF2F8', border: '#FCE7F3', iconBg: '#FCE7F3' },
  'party-celebration': { bg: '#FFFBEB', border: '#FEF3C7', iconBg: '#FEF3C7' },

  // Real Estate templates
  'buyer-journey': { bg: '#F0F7FF', border: '#DBEAFE', iconBg: '#DBEAFE' },
  'seller-journey': { bg: '#F0FDF4', border: '#DCFCE7', iconBg: '#D1FAE5' },
  'open-house-event': { bg: '#FFFBEB', border: '#FEF3C7', iconBg: '#FEF3C7' },
  'rental-property': { bg: '#FAF5FF', border: '#EDE9FE', iconBg: '#EDE9FE' },
};

const SVG_TEMPLATE_ICONS = {
  // Marketing
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

  // Events
  'general-event': `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
      <path d="m9 16 2 2 4-4"/>
    </svg>
  `,
  'corporate-event': `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  `,
  'wedding-event': `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DB2777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  `,
  'party-celebration': `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5.8 11.3 2 22l10.7-3.79"/>
      <path d="M4 3h.01"/>
      <path d="M22 8h.01"/>
      <path d="M15 2h.01"/>
      <path d="M22 20h.01"/>
      <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 12"/>
      <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.64-.7 1.08-1.35.98l-.63-.1a1.5 1.5 0 0 0-1.6 2.05L16 17"/>
    </svg>
  `,

  // Real Estate
  'buyer-journey': `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  `,
  'seller-journey': `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  `,
  'open-house-event': `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/>
      <path d="M2 20h20"/>
      <circle cx="14" cy="12" r="1.5" fill="currentColor"/>
    </svg>
  `,
  'rental-property': `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
      <line x1="9" y1="22" x2="9" y2="18"/>
      <line x1="15" y1="22" x2="15" y2="18"/>
      <line x1="9" y1="6" x2="9.01" y2="6"/>
      <line x1="15" y1="6" x2="15.01" y2="6"/>
      <line x1="9" y1="10" x2="9.01" y2="10"/>
      <line x1="15" y1="10" x2="15.01" y2="10"/>
      <line x1="9" y1="14" x2="9.01" y2="14"/>
      <line x1="15" y1="14" x2="15.01" y2="14"/>
    </svg>
  `,
};

function getTemplateIcon(template) {
  if (SVG_TEMPLATE_ICONS[template.id]) {
    return SVG_TEMPLATE_ICONS[template.id];
  }
  return template.icon || '📋';
}

function updateBrandHeader(workflowId, cardContext) {
  const brandConfig = WORKFLOW_BRAND_CONFIG[workflowId] || WORKFLOW_BRAND_CONFIG.marketing;
  const brandIconEl = document.querySelector('.brand-icon');
  if (brandConfig && brandIconEl) {
    brandIconEl.style.backgroundColor = brandConfig.bg;
    brandIconEl.style.color = brandConfig.color;
    brandIconEl.innerHTML = brandConfig.svg;
  }

  const brandTitleEl = document.getElementById('brand-title');
  if (brandTitleEl) {
    brandTitleEl.textContent = cardContext ? 'Add Checklist' : 'Create a card with a template';
  }
}

async function getCardAndListContext() {
  if (!t) return null;
  try {
    let card = null;
    if (typeof t.card === 'function') {
      try {
        card = await t.card('id', 'name', 'idList');
      } catch (e) {
        // Not in card context
      }
    }

    if (!card || !card.id) return null;

    let list = null;
    if (typeof t.list === 'function') {
      try {
        list = await t.list('id', 'name');
      } catch (e) {
        // List context not directly supplied
      }
    }

    let listIndex = 0;
    let listName = list && list.name ? list.name : '';

    if (!listName && typeof t.lists === 'function') {
      try {
        const boardLists = await t.lists('id', 'name');
        if (Array.isArray(boardLists)) {
          const foundIndex = boardLists.findIndex((l) => l.id === card.idList);
          if (foundIndex >= 0) {
            listIndex = foundIndex;
            listName = boardLists[foundIndex].name;
          }
        }
      } catch (e) {
        console.warn('Could not fetch board lists:', e);
      }
    }

    return {
      cardId: card.id,
      cardName: card.name,
      listId: card.idList,
      listName: listName || 'Planning',
      listIndex: listIndex || 0,
    };
  } catch (err) {
    console.warn('Error determining card context:', err);
    return null;
  }
}

function renderListView(workflowId, cardContext) {
  const container = document.getElementById('view-container');
  if (!container) return;

  updateBrandHeader(workflowId, cardContext);

  const headerSubtext = document.getElementById('header-subtext');
  if (headerSubtext) {
    if (cardContext && cardContext.listName) {
      headerSubtext.innerHTML = `Choose a category below to add the <strong>${cardContext.listName}</strong> checklist to this card.`;
    } else {
      headerSubtext.textContent = 'Choose a category to get a pre-built checklist and start faster.';
    }
    headerSubtext.style.display = 'block';
  }

  const categories = (workflowId && checklistTemplatesByWorkflow[workflowId]) || [];
  const workflowTitle =
    WORKFLOW_TITLES[workflowId] ||
    (workflowId ? workflowId.charAt(0).toUpperCase() + workflowId.slice(1) : 'Workflow');

  if (categories.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        No checklist templates available for this workflow yet.
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

  const headingText = cardContext
    ? `${workflowTitle} Checklists (${categories.length} Categories)`
    : `${workflowTitle} Templates (${categories.length})`;

  container.innerHTML = `
    <div class="section-heading">${headingText}</div>
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
  categories.forEach((category) => {
    const theme = CARD_THEMES[category.id] || {
      bg: '#F8FAFC',
      border: '#E2E8F0',
      iconBg: category.iconBg || '#EDE9FE',
    };

    const targetListName = cardContext ? cardContext.listName : 'Planning';
    const targetListIndex = cardContext ? cardContext.listIndex : 0;
    const resolved = getChecklistForCategoryAndList(
      workflowId,
      category.id,
      targetListName,
      targetListIndex
    );

    const card = document.createElement('div');
    card.className = 'card-item';
    card.style.backgroundColor = theme.bg;
    card.style.borderColor = theme.border;

    const iconBox = document.createElement('div');
    iconBox.className = 'card-icon-box';
    iconBox.style.backgroundColor = category.iconBg || theme.iconBg;
    iconBox.innerHTML = getTemplateIcon(category);

    const info = document.createElement('div');
    info.className = 'card-info';

    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = category.title;

    const desc = document.createElement('div');
    desc.className = 'card-desc';
    if (cardContext && resolved.listKey) {
      desc.textContent = `${resolved.listKey} checklist · ${resolved.checklist.length} items`;
    } else {
      desc.textContent = category.description;
    }

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
      renderPreviewView(category, resolved, workflowId, cardContext);
    });

    grid.appendChild(card);
  });

  const cancelBtn = document.getElementById('cancel-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeView);
  }

  resizeView();
}

function renderPreviewView(category, resolved, workflowId, cardContext) {
  const container = document.getElementById('view-container');
  if (!container) return;

  const headerSubtext = document.getElementById('header-subtext');
  if (headerSubtext) {
    headerSubtext.style.display = 'none';
  }

  const checklistItems = resolved.checklist || [];
  const theme = CARD_THEMES[category.id] || {
    bg: '#F8FAFC',
    border: '#E2E8F0',
    iconBg: category.iconBg || '#EDE9FE',
  };

  const brandConfig = WORKFLOW_BRAND_CONFIG[workflowId] || { btnBg: '#7c3aed' };
  const actionBtnText = cardContext ? 'Add Checklist' : 'Create Card';
  const headingTitle = resolved.listKey
    ? `${resolved.listKey} Checklist (${checklistItems.length})`
    : `Checklist (${checklistItems.length})`;

  container.innerHTML = `
    <div class="preview-container">
      <div class="preview-badge-row">
        <div class="preview-badge-icon" style="background-color: ${category.iconBg || theme.iconBg};">
          ${getTemplateIcon(category)}
        </div>
        <div class="preview-badge-text">${category.title}</div>
      </div>

      <div class="preview-heading-group">
        <div class="section-heading" style="margin-bottom: 2px;">${headingTitle}</div>
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
      <button id="action-btn" class="create-card-button" style="background-color: ${brandConfig.btnBg};">
        ${actionBtnText}
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
      renderListView(workflowId, cardContext);
    });
  }

  const actionBtn = document.getElementById('action-btn');
  if (actionBtn) {
    actionBtn.addEventListener('click', () => {
      handleAction(category, resolved, cardContext);
    });
  }

  resizeView();
}

async function handleAction(category, resolved, cardContext) {
  const actionBtn = document.getElementById('action-btn');
  const backBtn = document.getElementById('back-btn');
  const errorContainer = document.getElementById('inline-error-container');

  if (errorContainer) errorContainer.innerHTML = '';

  const isAddingToCard = !!(cardContext && cardContext.cardId);

  if (actionBtn) {
    actionBtn.disabled = true;
    actionBtn.innerHTML = `
      <div class="btn-spinner"></div>
      <span>${isAddingToCard ? 'Adding Checklist…' : 'Creating Card…'}</span>
    `;
  }
  if (backBtn) backBtn.disabled = true;

  try {
    if (isAddingToCard) {
      const checklistName = resolved.listKey
        ? `${category.title} - ${resolved.listKey}`
        : `${category.title}`;

      await addChecklistToExistingCard(
        t,
        cardContext.cardId,
        checklistName,
        resolved.checklist
      );

      if (t && typeof t.alert === 'function') {
        t.alert({
          message: `"${checklistName}" checklist added to card.`,
          display: 'success',
          duration: 5,
        });
      }
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      let firstListId = urlParams.get('firstListId') || null;
      if (
        firstListId === 'undefined' ||
        firstListId === 'null' ||
        (typeof firstListId === 'string' && firstListId.trim() === '')
      ) {
        firstListId = null;
      }

      if (!firstListId && t && typeof t.get === 'function') {
        try {
          firstListId = await t.get('board', 'shared', 'activeWorkflowFirstListId');
        } catch (e) {
          console.warn('Could not read activeWorkflowFirstListId:', e);
        }
      }

      const templatePayload = {
        title: category.title,
        checklistTitle: resolved.listKey ? `${category.title} - ${resolved.listKey}` : 'Checklist',
        checklist: resolved.checklist,
      };

      await createCardWithChecklist(t, firstListId, templatePayload);

      if (t && typeof t.alert === 'function') {
        t.alert({
          message: `"${category.title}" card created with checklist.`,
          display: 'success',
          duration: 6,
        });
      }
    }

    closeView();
  } catch (err) {
    console.error('Failed to add checklist / create card:', err);

    if (actionBtn) {
      actionBtn.disabled = false;
      actionBtn.innerHTML = isAddingToCard ? 'Add Checklist' : 'Create Card';
    }
    if (backBtn) backBtn.disabled = false;

    if (errorContainer) {
      const displayMsg =
        err && err.message ? err.message : 'Operation failed. Please try again.';
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
          handleAction(category, resolved, cardContext);
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

  const cardContext = await getCardAndListContext();

  renderListView(workflowId, cardContext);

  if (t && typeof t.render === 'function') {
    t.render(() => {
      resizeView();
    });
  }
});
