<script lang="ts">
	import Map from 'ol/Map';
	import View from 'ol/View';
	import TileLayer from 'ol/layer/Tile';
	import { fromLonLat } from 'ol/proj';
	import VectorSource from 'ol/source/Vector';
	import XYZ from 'ol/source/XYZ';
	import { Zoom } from 'ol/control.js';
	import OSM from 'ol/source/OSM';
	import { Feature } from 'ol';
	import Icon from 'ol/style/Icon';
	import VectorLayer from 'ol/layer/Vector';
	import { deviceList } from '$lib/stores/devices';
	import Point from 'ol/geom/Point';
	import Style from 'ol/style/Style';
	import Stroke from 'ol/style/Stroke';
	import { map } from '$lib/stores/map';

	let vectorSource: VectorSource = new VectorSource({
		features: []
	});
	const center = [23.321726, 42.697886];
	const zoom = 12;
	let tileLayer: TileLayer<XYZ>;
	let viewDiv = 'openlayersmap';
	let mapReady = false;

	const resetView = () => {
		$map?.setView(
			new View({
				center: fromLonLat(center),
				zoom
			})
		);
	};
	$: if (mapReady) {
		tileLayer.setSource(new OSM());
	}

	$: if ($deviceList) {
		vectorSource.clear();
		$deviceList.forEach((e) => {
			const point = new Point(fromLonLat([e.y, e.x]));
			point.setProperties({ ob: e });
			const iconFeature = new Feature({
				geometry: point
			});
			const iconStyle = new Style({
				image: new Icon({
					anchor: [0.5, 46],
					width: 45,
					anchorXUnits: 'fraction',
					anchorYUnits: 'pixels',
					src: e.connected ? 'data/chip_online.png' : 'data/chip_offline.png'
				}),
				stroke: new Stroke({
					color: '#3399CC',
					width: 1.25
				})
			});
			iconFeature.setStyle(iconStyle);
			vectorSource.addFeature(iconFeature);
		});
	}

	const setupMap = (node: HTMLDivElement, _id: string) => {
		tileLayer = new TileLayer({
			source: new OSM()
		});

		// Custom zoom in/out buttons
		const zoomInIconElement = document.createElement('i');
		zoomInIconElement.className = 'fa-solid fa-plus';
		const zoomOutIconElement = document.createElement('i');
		zoomOutIconElement.className = 'fa-solid fa-minus';

		// let devices: Feature<Point>[] = [];
		// if ($deviceList) {
		// 	$deviceList.forEach((element) => {
		// 		let point = new Feature({ geometry: new Point([element.x, element.y]) });
		// 		devices.push(point);
		// 	});
		// }
		// const iconFeature = new Feature({
		// 	geometry: new Point([0, 0]),
		// 	name: 'Null Island',
		// 	population: 4000,
		// 	rainfall: 500
		// });

		// const iconStyle = new Style({
		// 	image: new Icon({
		// 		anchor: [0.5, 46],
		// 		anchorXUnits: 'fraction',
		// 		anchorYUnits: 'pixels',
		// 		src: 'data/icon.png'
		// 	})
		// });

		// iconFeature.setStyle(iconStyle);

		const vectorLayer = new VectorLayer({
			source: vectorSource
		});

		$map = new Map({
			target: _id,
			layers: [tileLayer, vectorLayer], // rumseyLayer
			view: new View({
				center: fromLonLat(center),
				zoom
			}),
			controls: [
				// new Attribution({
				// 	target: '#attribution'
				// }),
				new Zoom({
					className:
						'absolute right-0 bottom-0 btn-group-vertical rounded-md text-sm space-y-2 m-3 p-1',
					zoomInClassName: 'btn-icon variant-glass-surface !rounded-none',
					zoomOutClassName: 'btn-icon variant-glass-surface !rounded-none',
					zoomInLabel: zoomInIconElement,
					zoomOutLabel: zoomOutIconElement,
					zoomOutTipLabel: '',
					zoomInTipLabel: ''
				})
			]
		});

		$map.on('loadend', () => {
			mapReady = true;
		});

		return {
			destroy() {
				if (map) {
					$map?.setTarget(undefined);
					$map = null;
					mapReady = false;
				}
			}
		};
	};
</script>

<div class="absolute z-10 p-2">
	<button
		type="button"
		class="btn btn-sm variant-filled-primary rounded-md flex-0"
		on:click={resetView}
	>
		Reset view
	</button>
</div>
<div id={viewDiv} class="map w-full h-full" use:setupMap={viewDiv}>
	<div class="absolute z-10 p-8 w-full">
		<label class="label m-auto w-96 opacity-50 hover:opacity-90">
			<input class="input" type="text" placeholder="Find device..." />
		</label>
	</div>
	<slot />
</div>

<style>
	.map {
		position: relative;
	}
</style>
