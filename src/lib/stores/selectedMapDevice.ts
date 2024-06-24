import { writable } from 'svelte/store';

function selectedDeviceStore() {
	const { subscribe, set, update } = writable<object | undefined>();

	return {
		subscribe,
		// remove: () => update((n) => n),
		set: (e: object) => set(e)
	};
}

export const selectedMapDevice = selectedDeviceStore();