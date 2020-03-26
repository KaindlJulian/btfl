<script>
  import { slide } from 'svelte/transition';
  import HostCard from './HostCard.svelte';

  export let folder;

  export let group = folder.name;
  $: active = group === name;

  function deleteFolder() {
    console.log('delete'); 
  }
</script>

<style lang="scss">
	.header {
		padding: 5px 10px;   
		display: flex;
    align-items: center;
		width: 100%;
		cursor: pointer;
		background: none;
		border: none;
		outline: none;
		margin: 0;
    height: 30px;
    &:hover {
      .icon__delete {
        opacity: .7;
      }
    }
	}
	.header:active {
		background: none;
	}

	.icon {
		line-height: 0.5;
		transition: 150ms linear;
    &__delete {
      margin-right: 4px;
      opacity: 0;
    }
	}
	.active {
		transform: rotate(-180deg);
	}

	.content {
		margin: 0;
	}
</style>

<div class="btfl-folder">
	<button
		class="header"
		on:click={() => {
			group = group === folder.name ? '' : folder.name;
		}}
	>
		<span class="tw-c-text-alt tw-ellipsis tw-ellipsis tw-font-size-5 tw-line-height-heading tw-semibold">{folder.name}</span>
    <div style="flex: 1 1 auto;"></div>
    <i on:click|stopPropagation={deleteFolder} class="icon icon__delete">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18px" height="18px">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </i>
    <i class="icon" class:active>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
				<path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
			</svg>
		</i>
	</button>

	{#if active}
		<div class="btfl-sub content" transition:slide="{{ duration: 150 }}">
      {#each folder.hosts as h (h.name)}
        <HostCard host={h}/>
      {/each}
		</div>
	{/if}
</div>