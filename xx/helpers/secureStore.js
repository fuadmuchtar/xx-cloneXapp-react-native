import { setItemAsync, getItemAsync, deleteItemAsync } from 'expo-secure-store';

export async function save(key, value) {
    return await setItemAsync(key, value);
}

export async function getValueFor(key) {
    return await getItemAsync(key);
}
export async function deleteValueFor(key) {
    return await deleteItemAsync(key);
}