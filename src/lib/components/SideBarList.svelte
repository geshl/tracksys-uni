<script lang="ts">
	import { page } from '$app/stores';
	import { AppRail, AppRailAnchor, AppRailTile, LightSwitch } from '@skeletonlabs/skeleton';
	let currentTile: number = 0;
</script>

<AppRail width="w-16" regionTrail="pb-5" regionDefault="flex">
	<svelte:fragment slot="lead">
		<AppRailAnchor href="/"><i class="fa-solid fa-microchip text-xl"></i></AppRailAnchor>
	</svelte:fragment>
	<!-- --- -->
	<div class="my-auto w-full">
		<AppRailAnchor href="/map" selected={$page.url.pathname === '/map'}>
			<svelte:fragment slot="lead"><i class="fa-solid fa-map-location-dot"></i></svelte:fragment>
			<span>Map</span>
		</AppRailAnchor>
		<AppRailAnchor href="/devices" selected={$page.url.pathname === '/devices'}>
			<svelte:fragment slot="lead"><i class="fa-solid fa-microchip"></i></svelte:fragment>
			<span>Devices</span>
		</AppRailAnchor>
		<AppRailAnchor href="/analysis" selected={$page.url.pathname === '/analysis'}>
			<svelte:fragment slot="lead"><i class="fa-solid fa-chart-column"></i></svelte:fragment>
			<span>Analysis</span>
		</AppRailAnchor>
	</div>
	<!-- --- -->
	<svelte:fragment slot="trail">
		<AppRailAnchor hover="">
			<LightSwitch class="mx-auto my-4" rounded="rounded-xl" />
		</AppRailAnchor>
		<AppRailAnchor hover="">
			<button type="button" class="btn-icon variant-ringed-tertiary">
				<i class="fa-solid fa-user"></i>
			</button>
		</AppRailAnchor>
	</svelte:fragment>
</AppRail>
