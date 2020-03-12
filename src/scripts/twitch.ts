import $ from 'jquery';
import { SIDEBAR_SEARCH_FIELD, SIDEBAR_CONTENTS } from '../utils/selectors';
import SettingsButton from '../components/SettingsButton.svelte';
import { bindComponent } from '../utils/bindComponent';

const twitchSidebarContent = $(SIDEBAR_CONTENTS).first();

const twitchSidebarSearch = document.querySelector(SIDEBAR_SEARCH_FIELD)!;
const settingsContainer = document.createElement('div');
$(settingsContainer).insertAfter(twitchSidebarSearch);

const settingsButton = bindComponent(SettingsButton, settingsContainer);
