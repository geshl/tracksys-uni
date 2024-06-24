import { deviceList } from "$lib/stores/devices";
import { get } from "svelte/store";
import { getRandomFloat } from "./randomCoordinate";

export const generateId = () => {
	const ans = "x".repeat(7)
             .replace(/./g, () => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 62) ] );
	return ans;
}
// 42.826768, 23.097681
// 42.582546, 23.539968
export const generateDevice = () => {
	const id = generateId()
	return { name: 'Device #'+ get(deviceList).length, connected: Math.floor(Math.random() * 2), id: id, added: new Date(), x: getRandomFloat(42.826768, 42.582546, 6), y: getRandomFloat(23.097681, 23.539968, 6)}
}

export const generateMultipleDevices = (n: number) => {
	for(let x = 0; x  < n; x++){
		deviceList.add(generateDevice())
	}
}