<script lang="ts">
  export let host;

  function navigateStream() {
    window.location.href = host.directLink;
  }
</script>

<style lang="scss" scoped>
.btfl-card {
  padding: 5px 10px;
  width: 100%;
  min-height: 32px;
  display: grid;
  grid-template-columns: 32px 1fr minmax(48px, auto);
  cursor: pointer;

  &__avatar {
    flex-shrink: 0;
    height: 100%;
    width: 32px;
    img {
      border-radius: 50%;
    }
    .greyscale {
      filter: grayscale(100%);
    }
  }

  &__content {
    width: 100%;
    max-width: calc(240px - 4rem - 52px - 16px);
    margin-left: 8px;
  }

  &__status {
    min-width: 4rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      margin-left: 4px;
      opacity: 0.8;
    }
  }
}
</style>

<div class="btfl-card side-nav-card__link" on:click={navigateStream}> 
  <div class="btfl-card__avatar">
    <img src="{host.imgUrl}" alt="" class="{host.state === 2 ? 'greyscale' :''}">
  </div>
  <div class="btfl-card__content">
    <div class="title">
      <p class="tw-c-text-alt tw-ellipsis tw-ellipsis tw-flex-grow-1 tw-font-size-5 tw-line-height-heading tw-semibold">
        {host.name}
      </p>
    </div>
    <div class="subtitle">
      <p class="tw-c-text-alt-2 tw-ellipsis tw-font-size-6 tw-line-height-heading">
        {host.stream ? host.stream.game : host.videos}
      </p>
    </div>
  </div>
  <div class="btfl-card__status">
    {#if host.state === 0}
      <div class="tw-border-radius-rounded tw-channel-status-indicator tw-channel-status-indicator--live tw-channel-status-indicator--small tw-inline-block tw-relative"></div>
      <span class="tw-c-text-alt tw-font-size-6">{host.stream.viewers}</span> 
    {:else if host.state === 1}
      <svg class="tw-svg__asset tw-svg__asset--alt-2 tw-svg__asset--videorerun" width="12px" height="12px" version="1.1" viewBox="0 0 20 20" x="0px" y="0px"><g><path d="M10 16a5.98 5.98 0 004.243-1.757l1.414 1.414A8 8 0 1116 4.708V2h2v6h-6V6h2.472A6 6 0 1010 16z"></path></g></svg>
      <span class="tw-c-text-alt tw-font-size-6">{host.stream.viewers}</span> 
    {:else}
      Offline
    {/if}
  </div>
</div>
