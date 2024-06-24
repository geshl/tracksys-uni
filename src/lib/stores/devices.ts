import { writable } from 'svelte/store';

function createDeviceList() {
	const { subscribe, set, update } = writable<object[]>([]);

	return {
		subscribe,
		add: (x: object) => update(items => {
            items.push(x)
            return items
        }),
		// remove: () => update((n) => n - 1),
		reset: () => set([])
	};
}

export const deviceList = createDeviceList();
