export const rm = (key: string) => {
	localStorage.removeItem(key);
};
export const get = (key: string): string | null => {
	return localStorage.getItem(key);
};
export const set = (key: string, val: string) => {
	return localStorage.setItem(key, val);
};
export const clear = () => {
	return localStorage.clear();
};
