<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { selectedMapDevice } from '$lib/stores/selectedMapDevice';
	import { getRandomFloat } from '../../../routes/map/randomCoordinate';
	const modalStore = getModalStore();

	let coordinates = [];
	let now = new Date();
	for (let i = 60; i > 0; i--) {
		coordinates.push({
			id: i,
			time: new Date(now.getTime() - i * 100000),
			location: {
				x: getRandomFloat(42.826768, 42.582546, 6),
				y: getRandomFloat(23.097681, 23.539968, 6)
			}
		});
	}
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
		<div class="table-container rounded-none max-h-64 overflow-y-auto">
			<!-- Native Table Element -->
			<table class="table rounded-none table-compact">
				<thead>
					<tr>
						<th>#</th>
						<th>Date</th>
						<th>Location</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{#each coordinates as coord}
						<tr>
							<td>{coord.id}</td>
							<td><span class="italic">{coord.time.toLocaleString()}</span></td>
							<td>
								<span class="underline text-blue-700">{coord.location.x}, {coord.location.y}</span>
							</td>
							<td>
								<button type="button" class="btn-sm variant-ghost-tertiary">
									<i class="fa-solid fa-location-crosshairs"></i>
									<span>View</span>
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- prettier-ignore -->
		<footer class="modal-footer w-full flex">
			<!-- <button class="btn variant-soft-surface">Cancel</button> -->
			<button class="btn variant-soft-surface mx-auto" disabled title='Coming soon' >View full history</button>
		</footer>
	</div>
{/if}
