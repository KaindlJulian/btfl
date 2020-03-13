<div class="btfl">
  <div class="btfl-header"></div>
  <ListFolder/>
</div>

<script lang="ts">
import ListFolder from './ListFolder.svelte';
import jq from 'jquery';
import { zst, SIDEBAR_TOGGLE, SIDEBAR_HEADER, SIDEBAR_CONTENTS } from '../utils';
import { onMount, tick } from 'svelte';

const observer = new MutationObserver((mutations, observer) => {  
  for(let m of mutations) {
    if (m.type === 'childList') {
      if (m.addedNodes) {
        
      } 
      if (m.removedNodes) {

      }
    }
  }
});

observer.observe(jq(SIDEBAR_CONTENTS).get(0), { childList: true, subtree: true });

const updateHeader = () => tick().then(async() => {
  zst(() => {
    jq('.btfl-header').empty();
    const header = jq(SIDEBAR_HEADER).first().clone();
    header.appendTo('.btfl-header');
  })
})

onMount(async () => {
  updateHeader();
});

jq(SIDEBAR_TOGGLE).on('click', async() => {
  updateHeader();
})
</script>



<style lang="scss" scoped>
</style>
