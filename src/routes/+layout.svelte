<script lang="ts">
	import SideBarList from '$lib/components/SideBarList.svelte';
	import '../app.postcss';
	import { initializeStores, Modal } from '@skeletonlabs/skeleton';

	initializeStores();
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { AppShell, storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<AppShell>
	<!-- (header) -->
	<!-- <svelte:fragment slot="header">Tracksys</svelte:fragment> -->
	<svelte:fragment slot="sidebarLeft"><SideBarList /></svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- <svelte:fragment slot="pageHeader">Buttons for manage map</svelte:fragment> -->
	<!-- Router Slot -->
	<!-- <slot /> -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>
