import { TRELLO_APP_KEY, TRELLO_APP_NAME, TRELLO_APP_AUTHOR } from './config.js';
import { getOpenLists, applyTemplate } from './list-creator.js';
import { workflowTemplates } from './workflow-templates.js';

/* global TrelloPowerUp */
const t =
  typeof window.TrelloPowerUp !== 'undefined' && window.TrelloPowerUp.iframe
    ? window.TrelloPowerUp.iframe({
        appKey: TRELLO_APP_KEY,
        appName: TRELLO_APP_NAME,
        appAuthor: TRELLO_APP_AUTHOR,
      })
    : null;

function closePopup() {
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

// Curated SVG vector icons matching the reference design exactly
const SVG_ICONS = {
  marketing: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 4.5v12.2a1 1 0 0 1-1.38.93l-5.62-2.34v-8.58l5.62-2.34A1 1 0 0 1 21 4.5zM12 7H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.55.83l3.45-2.3A1 1 0 0 0 12 15.7V7z"/>
    </svg>
  `,
  'real-estate': `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3 2 12h3v8a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-8h3L12 3z"/>
    </svg>
  `,
  events: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V9h14v11z"/>
      <rect x="7" y="11" width="3" height="3" rx="0.5" fill="currentColor"/>
      <rect x="11" y="11" width="3" height="3" rx="0.5" fill="currentColor"/>
      <rect x="15" y="11" width="3" height="3" rx="0.5" fill="currentColor"/>
      <rect x="7" y="15" width="3" height="3" rx="0.5" fill="currentColor"/>
      <rect x="11" y="15" width="3" height="3" rx="0.5" fill="currentColor"/>
      <rect x="15" y="15" width="3" height="3" rx="0.5" fill="currentColor"/>
    </svg>
  `,
};

function showLoadingState(message) {
  const listContainer = document.getElementById('template-list');
  if (!listContainer) return;

  listContainer.innerHTML = `
    <div class="state-container">
      <div class="spinner"></div>
      <div class="state-text">${message}</div>
      <div class="state-subtext">Updating lists on your board via Trello API...</div>
    </div>
  `;

  if (t && typeof t.sizeTo === 'function') {
    t.sizeTo('#container').catch(() => {});
  }
}

function showSuccessState(message = 'Workflow created!') {
  const listContainer = document.getElementById('template-list');
  if (!listContainer) return;

  listContainer.innerHTML = `
    <div class="state-container">
      <div class="success-icon-box">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div class="state-text">${message}</div>
    </div>
  `;

  if (t && typeof t.sizeTo === 'function') {
    t.sizeTo('#container').catch(() => {});
  }
}

function showErrorState(message, template) {
  const listContainer = document.getElementById('template-list');
  if (!listContainer) return;

  listContainer.innerHTML = `
    <div class="state-container">
      <div class="error-icon-box">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <div class="state-text">${message}</div>
      <button id="retry-btn" class="retry-button">Try Again</button>
    </div>
  `;

  const retryBtn = document.getElementById('retry-btn');
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      if (template) {
        handleTemplateSelect(template);
      } else {
        showTemplateListState();
      }
    });
  }

  if (t && typeof t.sizeTo === 'function') {
    t.sizeTo('#container').catch(() => {});
  }
}

function showConfirmState({ message, onConfirm, onCancel }) {
  const listContainer = document.getElementById('template-list');
  if (!listContainer) return;

  listContainer.innerHTML = `
    <div class="state-container">
      <div class="warning-icon-box">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>
      <div class="confirm-message">${message}</div>
      <div class="confirm-actions">
        <button id="confirm-cancel-btn" class="secondary-button">Cancel</button>
        <button id="confirm-continue-btn" class="continue-button">Continue</button>
      </div>
    </div>
  `;

  const cancelBtn = document.getElementById('confirm-cancel-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', onCancel);
  }

  const continueBtn = document.getElementById('confirm-continue-btn');
  if (continueBtn) {
    continueBtn.addEventListener('click', onConfirm);
  }

  if (t && typeof t.sizeTo === 'function') {
    t.sizeTo('#container').catch(() => {});
  }
}

function showTemplateListState() {
  renderTemplates();
  if (t && typeof t.sizeTo === 'function') {
    t.sizeTo('#container').catch(() => {});
  }
}

async function handleTemplateSelect(template) {
  showLoadingState('Checking existing board lists…');
  try {
    const existingLists = await getOpenLists(t);

    if (existingLists.length > 0) {
      showConfirmState({
        message: `This board already has ${existingLists.length} list${existingLists.length === 1 ? '' : 's'}. Applying the ${template.title} workflow will archive ${existingLists.length === 1 ? 'it' : 'them'} (cards inside will be archived too, not deleted) and create ${template.lists.length} new lists. Continue?`,
        onConfirm: () => runApplyTemplate(template),
        onCancel: () => showTemplateListState(),
      });
    } else {
      runApplyTemplate(template);
    }
  } catch (err) {
    console.error('Error fetching existing lists:', err);
    showErrorState('Something went wrong checking your board. Try again.', template);
  }
}

async function runApplyTemplate(template) {
  showLoadingState(`Setting up your ${template.title} workflow…`);
  try {
    const result = await applyTemplate(t, template);

    if (t && typeof t.set === 'function') {
      await t.set('board', 'shared', 'activeWorkflowId', template.id);
      await t.set('board', 'shared', 'activeWorkflowFirstListId', result.firstListId);
    }

    showSuccessState('Workflow created!');
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const targetUrl = `./card-templates.html?workflowId=${encodeURIComponent(template.id)}&firstListId=${encodeURIComponent(result.firstListId || '')}`;
    window.location.href = targetUrl;
  } catch (err) {
    console.error('Template apply failed:', err);
    showErrorState('Something went wrong setting up your workflow. Try again.', template);
  }
}

function renderTemplates() {
  const listContainer = document.getElementById('template-list');
  if (!listContainer) return;

  listContainer.innerHTML = '';

  workflowTemplates.forEach((template) => {
    const row = document.createElement('div');
    row.className = 'template-row';
    row.style.backgroundColor = template.rowBg;

    // Left icon container
    const iconBox = document.createElement('div');
    iconBox.className = 'template-icon-box';
    iconBox.style.backgroundColor = template.iconBg;
    iconBox.style.color = template.accentColor;

    if (SVG_ICONS[template.id]) {
      iconBox.innerHTML = SVG_ICONS[template.id];
    } else if (template.icon && template.icon.startsWith('<svg')) {
      iconBox.innerHTML = template.icon;
    } else {
      iconBox.textContent = template.icon || '📋';
    }

    // Title and description stacked
    const info = document.createElement('div');
    info.className = 'template-info';

    const title = document.createElement('div');
    title.className = 'template-title';
    title.textContent = template.title;

    const desc = document.createElement('div');
    desc.className = 'template-description';
    desc.textContent = template.description;

    info.appendChild(title);
    info.appendChild(desc);

    // Right chevron
    const chevron = document.createElement('div');
    chevron.className = 'template-chevron';
    chevron.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    `;

    row.appendChild(iconBox);
    row.appendChild(info);
    row.appendChild(chevron);

    // Handle template selection
    row.addEventListener('click', () => {
      handleTemplateSelect(template);
    });

    listContainer.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTemplates();

  if (t && typeof t.render === 'function') {
    t.render(function () {
      if (typeof t.sizeTo === 'function') {
        t.sizeTo('#container').catch(function () {});
      }
    });
  }
});
