<script lang="ts">
	import { deviceList } from '$lib/stores/devices';
	import { DonutChart } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';
	// import options from './options.js';
	function countObjectsWithSpecificValue(array: object[], value: number) {
		let count = 0;
		array.forEach(function (obj) {
			if (obj.connected === value) {
				// Change "someProperty" to the property you want to check
				count++;
			}
		});
		return count;
	}
	let data = [
		{
			group: 'Online',
			value: countObjectsWithSpecificValue($deviceList, 1)
		},
		{
			group: 'Offline',
			value: countObjectsWithSpecificValue($deviceList, 0)
		}
	];
	const options = {
		title: 'Devices',
		resizable: true,
		donut: {
			center: {
				label: 'Total',
				numberFontSize: () => 30
			}
		},
		height: '400px',
		theme: 'g10',
		color: {
			scale: {
				Online: '#558B2F',
				Offline: '#C02260'
			}
		}
	};
</script>

<DonutChart {data} {options} />
