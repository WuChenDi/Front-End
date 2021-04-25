export const setItem = (key: string, value: any) =>
	window.localStorage.setItem(key, JSON.stringify(value));

export const getItem = (key: string) =>
	JSON.parse(window.localStorage.getItem(key) || "{}");

export const removeItem = (key: string) => window.localStorage.removeItem(key);
