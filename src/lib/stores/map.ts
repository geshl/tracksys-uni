import { writable } from 'svelte/store';
import Map from 'ol/Map';

function createMap() {
	const { subscribe, set, update } = writable<Map | null>([]);

	return {
		subscribe,
		// remove: () => update((n) => n - 1),
		set: (e: Map) => set(e)
	};
}

export const map = createMap();