<script lang="ts">
  let showDialog = false;

  function toggleDialog() {
    showDialog = !showDialog;    
  }

  function createFolder() {
    const name = document.getElementById('btfl-new-folder-input')!.value;
    if (!name) {
      showDialog = false;
    } else {
      const container = document.getElementById('btfl-new-folder')!;
      container.appendChild(document.createTextNode(name));
    }
  }
</script>

<style lang="scss" scoped>
  .btfl-new-folder {
    margin-left: 8px;
  }
  .btfl-new-folder-popup {
    display: flex;
    position: fixed;
    bottom: 64px;
    z-index: 999;
    width: 240px;
    left: 8px;
    input {
      max-width: 185px;
    }
  }
</style>

<button
 on:click={toggleDialog} class="btfl-new-folder tw-align-items-center tw-align-middle
  tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium
  tw-border-top-left-radius-medium tw-border-top-right-radius-medium
  tw-button-icon tw-core-button tw-inline-flex tw-interactive
  tw-justify-content-center tw-overflow-hidden tw-relative">
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12 12H14V10H16V12H18V14H16V16H14V14H12V12M22 8V18C22 19.11 21.11 20 20
      20H4C2.89 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.11 6 22 6.89
      22 8M20 8H4V18H20V8Z" />
  </svg>
  {#if showDialog}
		<div class="btfl-new-folder-popup">
      <input on:click|preventDefault|stopPropagation={() => {}} placeholder="Folder Name" id="btfl-new-folder-input" name="folder-name" type="text" class="tw-block tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-font-size-6 tw-full-width tw-input tw-pd-l-1 tw-pd-r-1 tw-pd-y-05">
      <button on:click={createFolder} class="btfl-new-folder tw-align-items-center tw-align-middle
  tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium
  tw-border-top-left-radius-medium tw-border-top-right-radius-medium
  tw-button-icon tw-core-button tw-inline-flex tw-interactive
  tw-justify-content-center tw-overflow-hidden tw-relative">OK</button>
    </div>
	{/if}
</button>
