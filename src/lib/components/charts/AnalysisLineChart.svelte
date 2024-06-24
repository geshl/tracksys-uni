<script lang="ts">
	import { deviceList } from '$lib/stores/devices';
	import {
		BarChartSimple,
		type ChartTabularData,
		type LineChartOptions
	} from '@carbon/charts-svelte';
	const data: ChartTabularData = [];
	$deviceList.forEach((e) => {
		data.push({ group: e.name, value: Math.floor(Math.random() * (200 - 50 + 1)) + 50 });
	});
	const options: LineChartOptions = {
		title: 'Uptime (hours)',
		axes: {
			left: {
				mapsTo: 'value'
			},
			bottom: {
				mapsTo: 'group',
				scaleType: 'labels'
			}
		},
		theme: 'g10'
	};
</script>

<BarChartSimple {data} {options} />
