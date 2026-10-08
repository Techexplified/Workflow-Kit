import { TRELLO_APP_KEY, TRELLO_APP_NAME, TRELLO_APP_AUTHOR } from './config.js';

/* global TrelloPowerUp */

const ICON_URL = 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/megaphone.svg';
const CHECKLIST_ICON_URL = 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/check-square.svg';

window.TrelloPowerUp.initialize(
  {
    'board-buttons': function (t, options) {
      return [
        {
          icon: ICON_URL,
          text: 'Workflow Kit',
          condition: 'always',
          callback: function (t) {
            return t.modal({
              title: 'Workflow Kit',
              url: t.signUrl('./choose-workflow.html'),
              accentColor: '#7C3AED',
              height: 540,
              fullscreen: false,
            });
          },
        },
      ];
    },
    'card-buttons': function (t, options) {
      return [
        {
          icon: CHECKLIST_ICON_URL,
          text: 'Add Checklist',
          condition: 'always',
          callback: function (t) {
            return t.popup({
              title: 'Add Checklist',
              url: t.signUrl('./card-templates.html'),
              height: 480,
            });
          },
        },
      ];
    },
  },
  {
    appKey: TRELLO_APP_KEY,
    appName: TRELLO_APP_NAME,
    appAuthor: TRELLO_APP_AUTHOR,
  }
);
