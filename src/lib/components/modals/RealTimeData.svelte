<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { selectedMapDevice } from '$lib/stores/selectedMapDevice';
	import { getRandomFloat } from '../../../routes/map/randomCoordinate';
	import { onDestroy, onMount } from 'svelte';
	const modalStore = getModalStore();
	let interval: string | number | NodeJS.Timeout | undefined;
	let data = {
		speed: getRandomFloat(50, 60, 2),
		temperature: getRandomFloat(23, 24, 2),
		time: new Date().toLocaleString(),
		fuel: 71,
		weight: 2.8
	};
	onMount(() => {
		interval = setInterval(() => {
			data.speed = getRandomFloat(50, 60, 2);
			data.temperature = getRandomFloat(23, 24, 2);
			data.time = new Date().toLocaleString();
		}, 1000);
	});
	onDestroy(() => {
		if (interval) {
			clearInterval(interval);
		}
	});
</script>

{#if $modalStore[0]}
	<div
		class="modal-example-form card p-4 w-modal rounded-md shadow-md shadow-surface-400 space-y-4"
	>
		<header class="text-2xl font-bold">
			{$modalStore[0].title ?? '(title missing)'}
		</header>
		<hr />
		<div>
			<h3 class="h3">{$selectedMapDevice?.name}</h3>
		</div>
		<!-- <article>{$modalStore[0].body ?? '(body missing)'}</article> -->
		<!-- Enable for debugging: -->

		<!-- Responsive Container (recommended) -->
		<div class="table-container rounded-none overflow-y-auto">
			<!-- Native Table Element -->
			<table class="table rounded-none table-compact">
				<!-- <thead>
					<tr>
						<th>#</th>
						<th>Date</th>
						<th>Location</th>
						<th></th>
					</tr>
				</thead> -->
				<tbody>
					<tr>
						<td>Speed</td>
						<td
							><div class="px-2 py-1 rounded-md w-full variant-ghost-surface">
								{data.speed} km/h
							</div></td
						>
						<td>
							<button type="button" class="btn-sm variant-ghost-tertiary">
								<i class="fa-solid fa-chart-line"></i>
								<span>View chart</span>
							</button>
						</td>
					</tr>
					<tr>
						<td>Temperature</td>
						<td
							><div class="px-2 py-1 rounded-md w-full variant-ghost-surface">
								{data.temperature} *C
							</div></td
						>
						<td>
							<button type="button" class="btn-sm variant-ghost-tertiary">
								<i class="fa-solid fa-chart-line"></i>
								<span>View chart</span>
							</button>
						</td>
					</tr>
					<tr>
						<td>Time</td>
						<td><div class="px-2 py-1 rounded-md w-full variant-ghost-surface">{data.time}</div></td
						>
						<td>
							<button type="button" class="btn-sm variant-ghost-tertiary">
								<i class="fa-solid fa-chart-line"></i>
								<span>View chart</span>
							</button>
						</td>
					</tr>
					<tr>
						<td>Fuel Level</td>
						<td
							><div class="px-2 py-1 rounded-md w-full variant-ghost-surface">
								{data.fuel} %
							</div></td
						>
						<td>
							<button type="button" class="btn-sm variant-ghost-tertiary">
								<i class="fa-solid fa-chart-line"></i>
								<span>View chart</span>
							</button>
						</td>
					</tr>
					<tr>
						<td>Weight</td>
						<td
							><div class="px-2 py-1 rounded-md w-full variant-ghost-surface">
								{data.weight} T
							</div></td
						>
						<td>
							<button type="button" class="btn-sm variant-ghost-tertiary">
								<i class="fa-solid fa-chart-line"></i>
								<span>View chart</span>
							</button>
						</td>
					</tr>
					<!-- {#each data.data as entry}
						<tr>
							<td>{entry.param}</td>
							<td>
								<span class="badge variant-ghost-secondary">
									{entry.value}
									{entry.metric ?? ''}
								</span>
							</td>
							<td>
								<button type="button" class="btn-sm variant-ghost-tertiary">
									<i class="fa-solid fa-chart-line"></i>
									<span>View chart</span>
								</button>
							</td>
						</tr>
					{/each} -->
				</tbody>
			</table>
		</div>

		<!-- prettier-ignore -->
		<footer class="modal-footer w-full flex">
			<!-- <button class="btn variant-soft-surface">Cancel</button> -->
			<button class="btn variant-soft-surface mx-auto" disabled title='Coming soon' >View more data</button>
		</footer>
	</div>
{/if}
