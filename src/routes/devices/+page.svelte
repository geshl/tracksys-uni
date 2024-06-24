<script>
	import { deviceList } from '$lib/stores/devices';
</script>

<div class="container p-3 mx-auto space-y-4">
	<div class="flex">
		<h2 class="h2 flex-1">Devices</h2>
		<button type="button" class="btn variant-filled-secondary rounded-md" title="Add new device">
			<span>
				<i class="fa-solid fa-plus"></i>
			</span>
			<span>Add device</span>
		</button>
	</div>
	<!-- Responsive Container (recommended) -->
	<div class="table-container rounded-none">
		<!-- Native Table Element -->
		<table class="table table-hover rounded-none">
			<thead>
				<tr>
					<th class="w-12">#</th>
					<th>Id</th>
					<th>Name</th>
					<th class="text-center">Added</th>
					<th class="text-center">Location</th>
					<th class="text-center">Status</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each $deviceList as row, i}
					<tr>
						<td>{i}</td>
						<td><span class="italic underline text-blue-700">{row.id}</span></td>
						<td>{row.name}</td>
						<td class="text-center">{row.added}</td>
						<td class="text-center">
							<span class="underline text-blue-700">{row.x},{row.y}</span>

							<i class="fa-solid fa-info-circle text-gray-700"></i>
						</td>
						<td class="text-center">
							<span>
								{#if row.connected}
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
							</span>
						</td>
						<td class="text-right w-[280px]">
							<button
								type="button"
								class="btn-icon btn-icon-sm variant-soft-surface rounded-md"
								title="Edit"
							>
								<i class="fa-solid fa-edit"></i>
							</button>
							{#if row.connected}
								<button
									type="button"
									class="btn-icon btn-icon-sm variant-soft-surface rounded-md"
									title="Disconnect"
								>
									<i class="fa-solid fa-plug-circle-xmark"></i>
								</button>
							{:else}
								<button
									type="button"
									class="btn-icon btn-icon-sm variant-filled-success rounded-md"
									title="Connect"
								>
									<i class="fa-solid fa-plug"></i>
								</button>
							{/if}
							<button
								type="button"
								class="btn-icon btn-icon-sm variant-soft-surface rounded-md"
								title="Warnings"
							>
								<i class="fa-solid fa-triangle-exclamation"></i>
							</button>
							<button
								type="button"
								class="btn-icon btn-icon-sm variant-soft-surface rounded-md"
								title="Data"
							>
								<i class="fa-solid fa-chart-line"></i>
							</button>
							<button
								type="button"
								class="btn-icon btn-icon-sm variant-soft-surface rounded-md"
								title="Tracking"
							>
								<i class="fa-solid fa-location-dot"></i>
							</button>
							<button
								type="button"
								class="btn-icon btn-icon-sm variant-soft-surface rounded-md"
								title="Alerts"
							>
								<i class="fa-solid fa-bell"></i>
							</button>
							<button
								type="button"
								class="btn-icon btn-icon-sm variant-soft-surface rounded-md"
								title="Information"
							>
								<i class="fa-solid fa-info-circle"></i>
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<th colspan="2">Total devices</th>
					<td colspan="3" class="text-left">{$deviceList.length}</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
