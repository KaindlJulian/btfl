<script lang="ts">
  import ListFolder from './ListFolder.svelte';
  import jq from 'jquery';
  import {
    transformToHostObject,
    zst,
    SIDEBAR_TOGGLE,
    SIDEBAR_HEADER,
    SIDEBAR_CONTENTS,
  } from '../utils';
  import { onMount, tick } from 'svelte';

  let list = [];

  const observer = new MutationObserver((mutations, observer) => {
    for (let m of mutations) {
      if (m.type === 'childList') {
        if (m.addedNodes.length > 0) {
          handleAddedNodes(m.addedNodes);
        }
        if (m.removedNodes.length > 0) {
          handleRemovedNodes(m.removedNodes);
        }
      }
    }
  });

  function handleAddedNodes(nodes: NodeList) {
    const avatarUrl = (jq(nodes[0])
      .find('img')
      .get(0) as HTMLElement).getAttribute('src')!;

    const data = (nodes[0] as HTMLElement).innerText.split('\n\n');
    data.push(avatarUrl);

    const isLive =
      jq(nodes[0]).find('.tw-channel-status-indicator--live').length !== 0;

    const h = transformToHostObject(data, isLive);
  }

  function handleRemovedNodes(nodes: NodeList) {
    // handle removed nodes ?
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
  <ListFolder />
</div>
