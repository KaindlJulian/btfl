<div class="btfl">
  <div class="btfl-header"></div>
  <ListFolder/>
</div>

<script lang="ts">
import ListFolder from './ListFolder.svelte';
import jq from 'jquery';
import { zst, SIDEBAR_TOGGLE, SIDEBAR_HEADER } from '../utils';
import { onMount, tick } from 'svelte';
  
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
