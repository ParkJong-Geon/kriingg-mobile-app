import AsyncStorage from '@react-native-async-storage/async-storage';
import { encode } from 'base-64';

export const saveCredentials = async (email, password) => {
  const token = encode(`${email}:${password}`);
  await AsyncStorage.setItem('authToken', token);
};

export const getAuthHeader = async () => {
  const token = await AsyncStorage.getItem('authToken');
  return {
    Authorization: `Basic ${token}`,
  };
};
