<script lang="ts">
	import { dataTransfer } from '$lib/stores/dataTransferData';
	import { deviceList } from '$lib/stores/devices';
	import { AreaChart } from '@carbon/charts-svelte';
	import { onDestroy, onMount } from 'svelte';
	let interval: NodeJS.Timeout;
	onMount(() => {
		dataTransfer.reset();
		let now = new Date().getTime();
		let base = $deviceList.length * 25;
		if ($deviceList.length > 0) {
			for (let i = 50; i > 0; i--) {
				dataTransfer.add({
					group: 'Dataset 1',
					date: now - i * 1000,
					value: Math.random() * (base + 50 - base) + base
				});
			}
		} else {
			dataTransfer.add({
				group: 'Dataset 1',
				date: now - 1 * 1000,
				value: 0
			});
		}
		interval = setInterval(() => {
			dataTransfer.removeFirst();
			dataTransfer.add({
				group: 'Dataset 1',
				date: new Date().getTime(),
				value: Math.random() * (base + 50 - base) + base
			});
			// console.log($dataTransfer);
		}, 1000);
	});
	onDestroy(() => {
		clearInterval(interval);
	});
	const options = {
		title: 'Data transfer',
		height: '200px',
		theme: 'g10',
		grid: {
			x: {
				enabled: false
			},
			y: {
				enabled: false
			}
		},
		axes: {
			bottom: {
				visible: false,
				title: 'kb/s',
				mapsTo: 'date',
				scaleType: 'time'
			},
			left: {
				visible: false,
				mapsTo: 'value',
				scaleType: 'linear'
			}
		},
		color: {
			gradient: {
				enabled: true
			}
			// scale: {
			// 	'Dataset 1': '#D4163C'
			// }
		},
		points: {
			enabled: false
		},
		legend: {
			enabled: false
		}
	};
</script>

<div class="flex">
	<div class="flex-1">
		<AreaChart data={$dataTransfer} {options} />
	</div>
	<div class="flex-0">
		<div class="card flex w-64 rounded-none h-full">
			{#if $deviceList.length}
				<span class="m-auto text-4xl">
					{#if $dataTransfer.length > 0}
						{$dataTransfer[$dataTransfer.length - 1].value.toFixed(2)}kb/s
					{/if}
				</span>
			{:else}
				<span class="m-auto text-4xl"> 0kb/s </span>
			{/if}
		</div>
	</div>
</div>
