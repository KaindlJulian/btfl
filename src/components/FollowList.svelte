<script lang="ts">
  import { onMount, tick } from 'svelte';
  import HostCard from './HostCard.svelte';
  import jq from 'jquery';
  import {
    transformToHostObject,
    zst,
    SIDEBAR_TOGGLE,
    SIDEBAR_HEADER,
    SIDEBAR_CONTENTS,
  } from '../utils';

  let hosts = [];

  const observer = new MutationObserver((mutations, observer) => {
    for (let m of mutations) {
      if (m.type === 'childList') {
        if (m.addedNodes.length > 0) {
          handleAddedNodes(m.addedNodes);
        }
      }
    }
  });

  function handleAddedNodes(nodes: NodeList) {
    const data = (nodes[0] as HTMLElement).innerText.split('\n\n');

    const avatar = (jq(nodes[0])
      .find('img')
      .get(0) as HTMLElement);

    if (!avatar || !avatar.getAttribute('src')) {
      return;
    }
    data.push(avatar.getAttribute('src')!);

    const isLive =
      jq(nodes[0]).find('.tw-channel-status-indicator--live').length !== 0;

    const host = transformToHostObject(data, isLive);

    if (host.name !== 'RECOMMENDED CHANNELS') {
      hosts = [...hosts, host];
    }    
  }


  function updateHeader() {
    tick().then(async () => {
      zst(() => {
        jq('.btfl-header').empty();
        const header = jq(SIDEBAR_HEADER)
          .first()
          .clone();
        header.appendTo('.btfl-header');
      });
    });
  }

  observer.observe(jq(SIDEBAR_CONTENTS).get(0), {
    childList: true,
    subtree: true,
  });

  onMount(async () => {
    updateHeader();
  });

  jq(SIDEBAR_TOGGLE).on('click', async () => {
    updateHeader();
  });
</script>

<style lang="scss" scoped>

</style>

<div class="btfl">
  <div class="btfl-header" />
	{#each hosts as h (h.name)}
    <HostCard host={h}/>
	{/each}
</div>
