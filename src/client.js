import { TRELLO_APP_KEY, TRELLO_APP_NAME, TRELLO_APP_AUTHOR } from './config.js';

/* global TrelloPowerUp */

const ICON_URL = 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/megaphone.svg';

window.TrelloPowerUp.initialize(
  {
    'board-buttons': function (t, options) {
      return [
        {
          icon: ICON_URL,
          text: 'Workflow Kit',
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
  },
  {
    appKey: TRELLO_APP_KEY,
    appName: TRELLO_APP_NAME,
    appAuthor: TRELLO_APP_AUTHOR,
  }
);
