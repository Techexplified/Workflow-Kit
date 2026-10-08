import { TRELLO_APP_KEY } from './config.js';
import { getOpenLists } from './list-creator.js';

async function getAuthorizedToken(t) {
  if (!t) throw new Error('Trello Power-Up context is not available.');

  const restApi = await t.getRestApi();
  if (!(await restApi.isAuthorized())) {
    await restApi.authorize({ scope: 'read,write' });
  }
  const token = await restApi.getToken();
  if (!token) {
    throw new Error('Could not obtain authorization token from Trello.');
  }
  return token;
}

export async function addChecklistToExistingCard(t, cardId, checklistName, checklistItems) {
  if (!cardId) throw new Error('No target card ID provided.');

  const token = await getAuthorizedToken(t);
  const nameToUse = checklistName || 'Checklist';

  console.log(`Adding checklist "${nameToUse}" to existing card ID ${cardId}...`);

  // 1. Create Checklist on the Card
  const checklistUrl = `https://api.trello.com/1/checklists?key=${TRELLO_APP_KEY}&token=${token}&idCard=${cardId}&name=${encodeURIComponent(nameToUse)}`;
  const checklistRes = await fetch(checklistUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idCard: cardId, name: nameToUse }),
  });

  if (!checklistRes.ok) {
    const errorText = await checklistRes.text().catch(() => '');
    console.error('Trello API checklist creation error:', checklistRes.status, errorText);
    throw new Error(`Failed to create checklist: ${checklistRes.status} ${errorText}`);
  }

  const checklist = await checklistRes.json();
  console.log('Checklist created successfully:', checklist.id);

  // 2. Add Checklist Items sequentially to preserve order
  const items = Array.isArray(checklistItems) ? checklistItems : [];
  for (const itemText of items) {
    const itemUrl = `https://api.trello.com/1/checklists/${checklist.id}/checkItems?key=${TRELLO_APP_KEY}&token=${token}&name=${encodeURIComponent(itemText)}`;
    const itemRes = await fetch(itemUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: itemText, pos: 'bottom' }),
    });

    if (!itemRes.ok) {
      const errorText = await itemRes.text().catch(() => '');
      console.error(`Failed to add checklist item "${itemText}":`, itemRes.status, errorText);
      throw new Error(`Failed to add checklist item "${itemText}": ${itemRes.status} ${errorText}`);
    }
  }

  console.log(`Successfully added ${items.length} checklist items to checklist "${nameToUse}"`);
  return checklist;
}

export async function createCardWithChecklist(t, listId, template) {
  const token = await getAuthorizedToken(t);

  // Validate or resolve target list ID
  let targetListId = listId;
  if (
    !targetListId ||
    targetListId === 'undefined' ||
    targetListId === 'null' ||
    typeof targetListId !== 'string' ||
    targetListId.trim() === ''
  ) {
    console.log('listId not provided or invalid, fetching open lists from board...');
    const openLists = await getOpenLists(t);
    if (!openLists || openLists.length === 0) {
      throw new Error('No open lists found on this board to place the card in.');
    }
    targetListId = openLists[0].id;
  }

  console.log(`Creating card "${template.title}" in list ID ${targetListId}...`);

  // 1. Create Card
  const cardUrl = `https://api.trello.com/1/cards?key=${TRELLO_APP_KEY}&token=${token}&idList=${targetListId}&name=${encodeURIComponent(template.title)}`;
  const cardRes = await fetch(cardUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: template.title, idList: targetListId, pos: 'bottom' }),
  });

  if (!cardRes.ok) {
    const errorText = await cardRes.text().catch(() => '');
    console.error('Trello API card creation error:', cardRes.status, errorText);
    throw new Error(`Failed to create card: ${cardRes.status} ${errorText}`);
  }

  const card = await cardRes.json();
  console.log('Card created successfully:', card.id, card.name);

  // 2. Create Checklist on the Card
  const checklistTitle = template.checklistTitle || 'Checklist';
  const checklistUrl = `https://api.trello.com/1/checklists?key=${TRELLO_APP_KEY}&token=${token}&idCard=${card.id}&name=${encodeURIComponent(checklistTitle)}`;
  const checklistRes = await fetch(checklistUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idCard: card.id, name: checklistTitle }),
  });

  if (!checklistRes.ok) {
    const errorText = await checklistRes.text().catch(() => '');
    console.error('Trello API checklist creation error:', checklistRes.status, errorText);
    throw new Error(`Failed to create checklist: ${checklistRes.status} ${errorText}`);
  }

  const checklist = await checklistRes.json();
  console.log('Checklist created successfully:', checklist.id);

  // 3. Add Checklist Items sequentially to preserve order
  const checklistItems = Array.isArray(template.checklist) ? template.checklist : [];
  for (const itemText of checklistItems) {
    const itemUrl = `https://api.trello.com/1/checklists/${checklist.id}/checkItems?key=${TRELLO_APP_KEY}&token=${token}&name=${encodeURIComponent(itemText)}`;
    const itemRes = await fetch(itemUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: itemText, pos: 'bottom' }),
    });

    if (!itemRes.ok) {
      const errorText = await itemRes.text().catch(() => '');
      console.error(`Failed to add checklist item "${itemText}":`, itemRes.status, errorText);
      throw new Error(`Failed to add checklist item "${itemText}": ${itemRes.status} ${errorText}`);
    }
  }

  console.log(`Successfully added ${checklistItems.length} checklist items to card "${card.name}"`);
  return card;
}
