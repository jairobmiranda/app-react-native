import * as SecureStore from 'expo-secure-store';

export async function saveSecureItem(key: string, value: string) {
  try {
    await SecureStore.setItemAsync(key, value, {
      keychainService: key, // iOS
      keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY, // mais seguro
    });
  } catch (error) {
    console.error('Erro ao salvar no SecureStore', error);
  }
}

export async function getSecureItem(key: string) {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error('Erro ao recuperar do SecureStore', error);
    return null;
  }
}

export async function deleteSecureItem(key: string) {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error('Erro ao deletar do SecureStore', error);
  }
}
