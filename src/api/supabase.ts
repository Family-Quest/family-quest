/* eslint-disable new-cap */
 
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { ModeOfOperation, Counter, utils } from 'aes-js';
import { setItemAsync, getItemAsync, deleteItemAsync } from 'expo-secure-store';
import { AppState } from 'react-native';

// As Expo's SecureStore does not support values larger than 2048
// bytes, an AES-256 key is generated and stored in SecureStore, while
// it is used to encrypt/decrypt values stored in AsyncStorage.
class LargeSecureStore {
  private async encrypt(key: string, value: string) {
    const encryptionKey = crypto.getRandomValues(new Uint8Array(256 / 8));

    const cipher = new ModeOfOperation.ctr(
      encryptionKey,
      new Counter(1),
    );
    const encryptedBytes = cipher.encrypt(utils.utf8.toBytes(value));

    await setItemAsync(
      key,
      utils.hex.fromBytes(encryptionKey),
    );

    return utils.hex.fromBytes(encryptedBytes);
  }

  private async decrypt(key: string, value: string) {
    const encryptionKeyHex = await getItemAsync(key);
    if (!encryptionKeyHex) 
      return encryptionKeyHex;
    

    const cipher = new ModeOfOperation.ctr(
      utils.hex.toBytes(encryptionKeyHex),
      new Counter(1),
    );
    const decryptedBytes = cipher.decrypt(utils.hex.toBytes(value));

    return utils.utf8.fromBytes(decryptedBytes);
  }

  async getItem(key: string) {
    const encrypted = await AsyncStorage.getItem(key);
    if (!encrypted) 
      return encrypted;
    

    return await this.decrypt(key, encrypted);
  }

  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
    await deleteItemAsync(key);
  }

  async setItem(key: string, value: string) {
    const encrypted = await this.encrypt(key, value);

    await AsyncStorage.setItem(key, encrypted);
  }
}

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_KEY ?? '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    detectSessionInUrl: false,
    persistSession: true,
    storage: new LargeSecureStore(),
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') 
    supabase.auth.startAutoRefresh();
   else 
    supabase.auth.stopAutoRefresh();
  
});
