import { TRELLO_APP_KEY } from './config.js';

export async function getOpenLists(t) {
  const restApi = await t.getRestApi();
  if (!(await restApi.isAuthorized())) {
    await restApi.authorize({ scope: 'read,write' });
  }
  const token = await restApi.getToken();
  const board = await t.board('id');

  const res = await fetch(
    `https://api.trello.com/1/boards/${board.id}/lists?key=${TRELLO_APP_KEY}&token=${token}&filter=open&fields=name`
  );
  if (!res.ok) throw new Error(`Failed to fetch existing lists: ${res.status}`);
  return res.json(); // array of { id, name }
}

export async function applyTemplate(t, template) {
  const restApi = await t.getRestApi();
  const token = await restApi.getToken();
  const board = await t.board('id');

  const existingLists = await getOpenLists(t);

  // Archive (Trello has no true delete for lists) every currently open list
  for (const list of existingLists) {
    const res = await fetch(
      `https://api.trello.com/1/lists/${list.id}?key=${TRELLO_APP_KEY}&token=${token}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ closed: true })
      }
    );
    if (!res.ok) throw new Error(`Failed to archive list "${list.name}": ${res.status}`);
  }

  // Create the new template's lists, in order
  const createdListIds = [];
  for (const name of template.lists) {
    const res = await fetch(
      `https://api.trello.com/1/lists?key=${TRELLO_APP_KEY}&token=${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, idBoard: board.id, pos: 'bottom' })
      }
    );
    if (!res.ok) throw new Error(`Failed to create list "${name}": ${res.status}`);
    const list = await res.json();
    createdListIds.push(list.id);
  }

  return {
    archivedCount: existingLists.length,
    createdCount: template.lists.length,
    firstListId: createdListIds[0]
  };
}
