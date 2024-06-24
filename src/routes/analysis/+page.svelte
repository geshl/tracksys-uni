<script lang="ts">
	import AnalysisAreaChart from '$lib/components/charts/AnalysisAreaChart.svelte';
	import AnalysisDonutChart from '$lib/components/charts/AnalysisDonutChart.svelte';
	import AnalysisLineChart from '$lib/components/charts/AnalysisLineChart.svelte';
</script>

<div class="container p-3 mx-auto space-y-4">
	<h2 class="h2">Analysis</h2>
	<hr />
	<div class="flex">
		<div class="flex-none min-w-[350px]">
			<AnalysisDonutChart />
		</div>
		<div class="flex-1 w-full">
			<AnalysisLineChart />
		</div>
	</div>
	<div class="flex">
		<div class="flex-1">
			<AnalysisAreaChart />
		</div>
	</div>
</div>
