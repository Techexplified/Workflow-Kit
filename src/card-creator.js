import { TRELLO_APP_KEY } from './config.js';

export async function createCardWithChecklist(t, listId, template) {
  const restApi = await t.getRestApi();
  const token = await restApi.getToken();

  const cardRes = await fetch(
    `https://api.trello.com/1/cards?key=${TRELLO_APP_KEY}&token=${token}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: template.title, idList: listId })
    }
  );
  if (!cardRes.ok) throw new Error(`Failed to create card: ${cardRes.status}`);
  const card = await cardRes.json();

  const checklistRes = await fetch(
    `https://api.trello.com/1/checklists?key=${TRELLO_APP_KEY}&token=${token}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idCard: card.id, name: 'Checklist' })
    }
  );
  if (!checklistRes.ok) throw new Error(`Failed to create checklist: ${checklistRes.status}`);
  const checklist = await checklistRes.json();

  // Sequential, so items land in the same order as the template
  for (const itemText of template.checklist) {
    const itemRes = await fetch(
      `https://api.trello.com/1/checklists/${checklist.id}/checkItems?key=${TRELLO_APP_KEY}&token=${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: itemText })
      }
    );
    if (!itemRes.ok) throw new Error(`Failed to add checklist item "${itemText}": ${itemRes.status}`);
  }

  return card;
}
