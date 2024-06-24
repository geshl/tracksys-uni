import { writable } from 'svelte/store';

function createDataTransferObject() {
	const { subscribe, set, update } = writable<object[]>([]);

	return {
		subscribe,
		add: (x: object) => update(items => {
            items.push(x)
            return items
        }),
		// remove: () => update((n) => n - 1),
		reset: () => set([]),
		removeFirst: () => update(items => {
			items.splice(0, 1)
			return items
		})
	};
}

export const dataTransfer = createDataTransferObject();
