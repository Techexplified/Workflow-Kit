import { TRELLO_APP_KEY } from './config.js';

export async function createListsForTemplate(t, template) {
  const restApi = await t.getRestApi();

  if (!(await restApi.isAuthorized())) {
    await restApi.authorize({ scope: 'read,write' });
  }
  const token = await restApi.getToken();
  const board = await t.board('id');

  // Avoid creating duplicates if this template (or lists with the same
  // names) already exist on the board.
  const existingListsRes = await fetch(
    `https://api.trello.com/1/boards/${board.id}/lists?key=${TRELLO_APP_KEY}&token=${token}&fields=name`
  );
  const existingLists = await existingListsRes.json();
  const existingNames = new Set(existingLists.map(l => l.name.toLowerCase()));

  const toCreate = template.lists.filter(name => !existingNames.has(name.toLowerCase()));
  const skipped = template.lists.filter(name => existingNames.has(name.toLowerCase()));

  for (const name of toCreate) {
    const res = await fetch(
      `https://api.trello.com/1/lists?key=${TRELLO_APP_KEY}&token=${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, idBoard: board.id, pos: 'bottom' })
      }
    );
    if (!res.ok) {
      throw new Error(`Failed to create list "${name}": ${res.status}`);
    }
    // Sequential, not Promise.all — so lists land on the board in the
    // same left-to-right order as the template, since Trello appends
    // each new list to the current end of the board.
  }

  return { created: toCreate, skipped };
}
