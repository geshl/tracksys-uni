<script lang="ts">
	import Map from '$lib/components/Map.svelte';
	import {
		AppShell,
		ListBox,
		ListBoxItem,
		Modal,
		popup,
		type ModalComponent,
		type ModalSettings,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { deviceList } from '$lib/stores/devices';
	import AddDevices from '$lib/components/modals/AddDevices.svelte';
	import { map } from '$lib/stores/map';
	import { fromLonLat } from 'ol/proj';
	import { onMount } from 'svelte';
	import Overlay from 'ol/Overlay';
	import DeviceLocationHistory from '$lib/components/modals/DeviceLocationHistory.svelte';
	import { selectedMapDevice } from '$lib/stores/selectedMapDevice';
	import RealTimeData from '$lib/components/modals/RealTimeData.svelte';

	const modalStore = getModalStore();
	let valueSingle: object;
	let isOpen = true;
	const modalComponent: ModalComponent = { ref: AddDevices };
	const modal: ModalSettings = {
		type: 'component',
		title: 'New device',
		component: modalComponent
	};
	const modalLocationHistory: ModalComponent = { ref: DeviceLocationHistory };
	const modalLoc: ModalSettings = {
		type: 'component',
		title: 'Location History',
		component: modalLocationHistory,
		meta: { device: $selectedMapDevice?.id }
	};
	const modalRealTimeData: ModalComponent = { ref: RealTimeData };
	const modalData: ModalSettings = {
		type: 'component',
		title: 'Real Time Data',
		component: modalRealTimeData,
		meta: { device: $selectedMapDevice?.id }
	};
	$: if (valueSingle) {
		$map?.getView().animate({
			center: fromLonLat([valueSingle.y, valueSingle.x]),
			zoom: 16,
			duration: 1000
		});
	}
	onMount(() => {
		const element = document.getElementById('popup');

		const popupElement = new Overlay({
			element: element,
			positioning: 'bottom-center',
			stopEvent: false
		});
		$map?.addOverlay(popupElement);

		let popover: Overlay | undefined;
		function disposePopover() {
			if (popover) {
				if (popover.getElement()) {
					popover.getElement().style.display = 'none';
				}
				// popover.setPosition([0, 0]);
				popover = undefined;
			}
		}

		// display popup on click
		$map?.on('click', function (evt) {
			const feature = $map?.forEachFeatureAtPixel(evt.pixel, function (feature) {
				return feature;
			});
			disposePopover();
			if (!feature) {
				return;
			}
			$selectedMapDevice = feature.getGeometry()?.get('ob');
			popupElement.setPosition(feature.getGeometry().getCoordinates());
			popupElement.getElement().style.display = 'block';
			popover = popupElement;
		});

		// change mouse cursor when over marker
		$map?.on('pointermove', function (e) {
			const pixel = $map?.getEventPixel(e.originalEvent);
			const hit = $map?.hasFeatureAtPixel(pixel);
			if ($map?.getTargetElement() != undefined) {
				$map.getTargetElement().style.cursor = hit ? 'pointer' : '';
			}
		});
		// Close the popup when the map is moved
		$map?.on('movestart', disposePopover);
	});
</script>

<Modal />
<AppShell slotSidebarLeft="h-screen" slotPageContent="h-screen">
	<svelte:fragment slot="sidebarLeft">
		<div
			class="border-r-2 border-surface-300 pt-4 pb-3 px-2 h-full grid grid-rows-2 space-y-1 w-80"
		>
			<div class="flex">
				<div class="flex flex-col w-full">
					<div class="flex shrink">
						<h2 class="h3 flex-1">
							<span>Devices</span>
							<span class="badge variant-filled-primary">{$deviceList.length}</span>
						</h2>
						<button
							type="button"
							class="btn-icon btn-icon-sm variant-soft-surface rounded-md"
							title="Add new device"
							on:click={() => modalStore.trigger(modal)}
						>
							<i class="fa-solid fa-plus"></i>
						</button>
					</div>
					<hr class="my-2" />
					<div class="bg-surface-200-700-token overflow-y-auto h-full flex flex-col">
						{#each $deviceList as device}
							<ListBox
								class=""
								rounded="rounded-md"
								regionLead="pl-2"
								active="variant-ghost-secondary"
								regionTrail="p-0 m-0 space-x-0 gap-x-0"
								padding="px-0 pb-1"
							>
								<ListBoxItem bind:group={valueSingle} name="medium" value={device}>
									<svelte:fragment slot="lead">
										<button type="button" class="btn-icon btn-icon-sm variant-soft-secondary">
											<i class="fa-solid fa-microchip"></i>
										</button>
									</svelte:fragment>
									<div class="grid">
										<div>
											<span class="">{device.name}</span>
										</div>
										<div>
											<span class="badge variant-soft-secondary !text-xs" title="Added"
												>{device.added.toLocaleTimeString()}</span
											>
										</div>
									</div>
									<svelte:fragment slot="trail">
										<span>
											{#if device.connected}
												<span class="badge shadow-md border border-surface-400 rounded-md">
													<i class="fa-solid fa-circle text-green-700"></i>
													<span class="s text-green-900">Online</span>
												</span>
											{:else}
												<span class="badge shadow-md border border-surface-400 rounded-md">
													<i class="fa-solid fa-circle text-red-700"></i>
													<span class="s text-red-900">Offline</span>
												</span>
											{/if}
										</span>
										<button type="button" class="btn-icon btn-icon-sm text-gray-700 m-0">
											<span>
												<i class="fa-solid fa-ellipsis-vertical text-lg"></i>
											</span>
										</button>
									</svelte:fragment>
								</ListBoxItem>
							</ListBox>
						{/each}
						{#if $deviceList.length == 0}
							<div class="text-center text-sm italic m-auto">No devices</div>
						{/if}
						<!-- {#if $deviceList.length > 0}
							<div class="py-2 text-center space-y-2">
								<button
									type="button"
									class="btn variant-filled-primary rounded-none"
									on:click={() => generateMultipleDevices(5)}
								>
									Add More devices</button
								>
							</div>
						{:else}
							<div class="py-2 text-center space-y-2">
								<div class=" text-center text-sm italic">No devices</div>
								<button
									type="button"
									class="btn variant-filled-primary rounded-none"
									on:click={() => generateMultipleDevices(5)}
								>
									Load example devices</button
								>

								<button
									type="button"
									class="btn-icon btn-icon-sm variant-ringed-primary"
									on:click={() => generateMultipleDevices(5)}
								>
									<i class="fa-solid fa-plus"></i>
								</button>
							</div>
						{/if} -->
					</div>
				</div>
			</div>
			<div class="flex flex-col h-full">
				<div class="flex shrink">
					<h2 class="h3 flex-1">Alerts</h2>
					<button
						type="button"
						class="btn-icon btn-icon-sm rounded-md variant-soft-surface"
						title="Add new device"
						on:click={() => (isOpen = !isOpen)}
					>
						{#if isOpen}
							<i class="fa-solid fa-play text-green-700"></i>
						{:else}
							<i class="fa-solid fa-pause text-red-700"></i>
						{/if}
					</button>
				</div>
				<hr class="my-2" />
				<div class="bg-surface-200-700-token overflow-y-auto h-full flex flex-col">
					<div class="text-center text-sm italic m-auto">No alerts</div>
				</div>
			</div>
		</div>
	</svelte:fragment>
	<!-- Router Slot -->
	<Map>
		<div id="popup" class="card p-2 rounded-md shadow-md shadow-surface-400 space-y-1">
			<div class="flex">
				<div class="flex-1">
					<span><i class="fa-solid fa-microchip"></i> {$selectedMapDevice?.name}</span>
					<span class="badge variant-filled-primary text-xs underline">
						{$selectedMapDevice?.id}
					</span>
					<!-- <span class="underline text-blue-600 italic text-xs">{$selectedMapDevice?.id}</span> -->
				</div>
				<span>
					<i class="fa-solid fa-info-circle"></i>
				</span>
			</div>
			<hr />
			<div>
				<table class="table-compact">
					<tr>
						<td>Status:</td>
						<td>
							{#if $selectedMapDevice?.connected}
								<span class="badge variant-filled-success">
									<i class="fa-solid fa-circle text-green-700"></i>
									<span class="s text-green-900">Online</span>
								</span>
							{:else}
								<span class="badge variant-filled-error">
									<i class="fa-solid fa-circle text-red-700"></i>
									<span class="s text-red-900">Offline</span>
								</span>
							{/if}
						</td>
					</tr>
					{#if $selectedMapDevice?.connected}
						<tr>
							<td>Current speed:</td>
							<td>57<span class="text-xs">km/h</span></td>
						</tr>
						<tr>
							<td>Current temperature:</td>
							<td>23<span class="text-xs">°C</span></td>
						</tr>
						<tr>
							<td>Current time:</td>
							<td>{new Date().toLocaleString()}</td>
						</tr>
						<tr>
							<td>Fuel level:</td>
							<td>47<span class="text-xs">%</span></td>
						</tr>
						<tr>
							<td>Current weight:</td>
							<td>2.8<span class="text-xs">T</span></td>
						</tr>
					{/if}
				</table>
			</div>
			<hr />
			<div class="flex">
				<button
					class="btn btn-sm variant-filled-primary rounded-none flex-1"
					on:click={() => modalStore.trigger(modalLoc)}
				>
					<span><i class="fa-solid fa-location-crosshairs"></i></span>
					<span>Location History</span>
				</button>
				<button
					class="btn-icon btn-icon-sm rounded-none variant-soft-surface flex-none"
					on:click={() => modalStore.trigger(modalData)}
					disabled={!$selectedMapDevice?.connected}
				>
					<i class="fa-solid fa-chart-pie text-lg"></i>
				</button>
			</div>
		</div>
	</Map>
</AppShell>
