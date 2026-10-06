/* global TrelloPowerUp */

// TODO: Replace placeholder values with real credentials once registered in Trello's Power-Up admin portal
const appKey = 'YOUR_TRELLO_APP_KEY';
const appName = 'Workflow Kit';
const appAuthor = 'Workflow Kit Team';

const ICON_URL = 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/megaphone.svg';

window.TrelloPowerUp.initialize(
  {
    'card-buttons': function (t, options) {
      return [
        {
          icon: ICON_URL,
          text: 'Workflow Kit',
          callback: function (t) {
            return t.modal({
              title: 'Workflow Kit',
              url: t.signUrl('./choose-workflow.html'),
              accentColor: '#7C3AED',
              height: 520,
              fullscreen: false,
            });
          },
        },
      ];
    },
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
              height: 520,
              fullscreen: false,
            });
          },
        },
      ];
    },
  },
  {
    appKey: appKey,
    appName: appName,
    appAuthor: appAuthor,
  }
);
