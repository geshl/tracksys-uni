<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { generateMultipleDevices } from '../../../routes/map/hash';

	const modalStore = getModalStore();
</script>

{#if $modalStore[0]}
	<div
		class="modal-example-form card p-4 w-modal rounded-md shadow-md shadow-surface-400 space-y-4"
	>
		<header class="text-2xl font-bold">
			{$modalStore[0].title ?? '(title missing)'}
		</header>
		<div>
			<button
				type="button"
				class="btn btn-sm rounded-md variant-soft-surface"
				on:click={() => generateMultipleDevices(1)}
			>
				Add test device
			</button>
			<button type="button" class="btn btn-sm rounded-md variant-soft-surface">
				Remove test devices
			</button>
		</div>
		<!-- <article>{$modalStore[0].body ?? '(body missing)'}</article> -->
		<!-- Enable for debugging: -->
		<form class="modal-form border border-surface-200 shadow-md shadow-surface-400 p-4 space-y-4">
			<label class="label">
				<span>Device name</span>
				<input class="input rounded-md" type="text" placeholder="Enter name..." />
			</label>
			<label class="label">
				<span>Device id</span>
				<input class="input rounded-md" type="text" placeholder="Enter name..." />
			</label>
			<label class="label">
				<label class="label">
					<span>Device type</span>
					<select class="select rounded-md">
						<option value="1">Arduino</option>
						<option value="2">Raspberry Pi</option>
						<option value="3">Orange Pi</option>
						<option value="4">other</option>
					</select>
				</label>
			</label>
			<label class="label">
				<label class="label">
					<span>Connection type</span>
					<select class="select rounded-md">
						<option value="1">WebSocket</option>
						<option value="2">Bluetooth</option>
						<option value="3">WebTransport</option>
						<option value="4">other</option>
					</select>
				</label>
			</label>
		</form>
		<!-- prettier-ignore -->
		<footer class="modal-footer ">
			<button class="btn variant-soft-surface">Cancel</button>
			<button class="btn variant-soft-surface float-right" >Add device</button>
		</footer>
	</div>
{/if}
