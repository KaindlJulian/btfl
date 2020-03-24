import $ from 'jquery';
import SettingsButton from '../components/SettingsButton.svelte';
import AddFolderButton from '../components/AddFolderButton.svelte';
import FollowList from '../components/FollowList.svelte';
import {
  SIDEBAR_SEARCH_FIELD,
  SIDEBAR_CONTENTS,
  SIDEBAR_TOGGLE,
  bindComponent,
} from '../utils';

const twitchSidebarContent = $(SIDEBAR_CONTENTS).first();
const btflContainer = document.createElement('div');
$(btflContainer).insertAfter(twitchSidebarContent);
bindComponent(FollowList, btflContainer);

function initMenu() {
  const twitchSidebarSearch = document.querySelector(SIDEBAR_SEARCH_FIELD)!;

  const settingsContainer = document.createElement('div');
  $(settingsContainer).insertAfter(twitchSidebarSearch);
  bindComponent(SettingsButton, settingsContainer);

  const addFolderContainer = document.createElement('div');
  $(addFolderContainer).insertAfter(twitchSidebarSearch);
  bindComponent(AddFolderButton, addFolderContainer);
}

initMenu();

$(SIDEBAR_TOGGLE).on('click', async () => {
  setTimeout(() => {
    initMenu();
  }, 0);
});
