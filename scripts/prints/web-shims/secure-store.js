export async function getItemAsync(k) { return localStorage.getItem(k); }
export async function setItemAsync(k, v) { localStorage.setItem(k, v); }
export async function deleteItemAsync(k) { localStorage.removeItem(k); }
export function getItem(k) { return localStorage.getItem(k); }
export function setItem(k, v) { localStorage.setItem(k, v); }
export async function isAvailableAsync() { return true; }
export const WHEN_UNLOCKED = 'WHEN_UNLOCKED';
export const AFTER_FIRST_UNLOCK = 'AFTER_FIRST_UNLOCK';
