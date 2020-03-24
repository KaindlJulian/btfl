<script lang="ts">
  import { onMount, tick } from 'svelte';
  import HostCard from './HostCard.svelte';
  import ListFolder from './ListFolder.svelte';
  import jq from 'jquery';
  import { Folder } from '../types';
  import {
    transformToHostObject,
    zst,
    SIDEBAR_TOGGLE,
    SIDEBAR_HEADER,
    SIDEBAR_CONTENTS,
  } from '../utils';

  let group = '-';
  let folders = [];
  let hosts = [];

  const hostObserver = new MutationObserver((mutations, hostObserver) => {
    for (let m of mutations) {
      if (m.type === 'childList') {
        if (m.addedNodes.length > 0) {
          handleAddedNodes(m.addedNodes);
        }
      }
    }
  });

  const folderObserver = new MutationObserver((mutations, hostObserver) => {
    for (let m of mutations) {
      if (m.type === 'childList') {
        if (m.addedNodes.length > 0) {          
          const newFolder = new Folder(m.addedNodes[0].textContent);
          newFolder.addHost(hosts[0]);                                           //! remove this after testing
          folders = [...folders, newFolder];          
        }
      }
    }
  }); 

  function handleAddedNodes(nodes: NodeList) {
    if (!(nodes[0] as HTMLElement).innerText) {
      return;
    }    

    const data = (nodes[0] as HTMLElement).innerText.split('\n\n');
    const avatar = (jq(nodes[0])
      .find('img')
      .get(0) as HTMLElement);

    if (!avatar || !avatar.getAttribute('src')) {
      return;
    }

    const avatarUrl = avatar.getAttribute('src')!;
    const isLive =
      jq(nodes[0]).find('.tw-channel-status-indicator--live').length !== 0;
    const host = transformToHostObject(data, avatarUrl, isLive);

    if (host.name !== 'RECOMMENDED CHANNELS') {
      hosts = [...hosts, host];
    }    
  }


  function updateHeader() {
    tick().then(async () => {
      zst(() => {
        jq('.btfl__header').empty();
        const header = jq(SIDEBAR_HEADER)
          .first()
          .clone();
        header.appendTo('.btfl__header');
      });
    });
  }

  hostObserver.observe(jq(SIDEBAR_CONTENTS).get(0), {
    childList: true,
    subtree: true,
  });

  onMount(async () => {
    updateHeader();
    folderObserver.observe(jq('#btfl-new-folder').get(0), {
      childList: true,
      subtree: true,
    });
  });

  jq(SIDEBAR_TOGGLE).on('click', async () => {
    updateHeader();
  });
</script>

<style lang="scss" scoped>
.btfl {
  &__msg {
    position: fixed;
    left: -9999px;
  }
  &__folders {
    border-bottom: var(--border-width-default) solid var(--color-border-base)!important;
  }
}
</style>

<div class="btfl">
  <div id="btfl-new-folder" class="btfl__msg"></div>
  <div class="btfl__header" />
  <div class="btfl__folders">
    {#each folders as f}
      <ListFolder folder={f} bind:group/>
    {/each}
  </div>

	{#each hosts as h (h.name)}
    <HostCard host={h}/>
	{/each}
</div>
