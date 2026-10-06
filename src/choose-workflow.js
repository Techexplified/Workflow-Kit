import { workflowTemplates } from './workflow-templates.js';

/* global TrelloPowerUp */
const t =
  typeof window.TrelloPowerUp !== 'undefined' && window.TrelloPowerUp.iframe
    ? window.TrelloPowerUp.iframe()
    : null;

function closePopup() {
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

function renderTemplates() {
  const listContainer = document.getElementById('template-list');
  if (!listContainer) return;

  listContainer.innerHTML = '';

  workflowTemplates.forEach((template) => {
    const row = document.createElement('div');
    row.className = 'template-row';
    row.style.backgroundColor = template.rowBg;
    row.style.borderColor = template.iconBg;

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
      console.log('workflow selected:', template.id);
      // TODO: generate pre-built checklist for this card based on the selected template, once backend exists
      closePopup();
    });

    listContainer.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTemplates();

  const closeBtn = document.getElementById('close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closePopup);
  }

  const cancelBtn = document.getElementById('cancel-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', closePopup);
  }

  if (t && typeof t.render === 'function') {
    t.render(function () {
      if (typeof t.sizeTo === 'function') {
        t.sizeTo('#container').catch(function () {});
      }
    });
  }
});
