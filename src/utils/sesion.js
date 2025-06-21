import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveSession = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token);
    console.log('Sesión guardada');
  } catch (error) {
    console.error('Error al guardar la sesión:', error);
  }
};

export const getSession = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  } catch (error) {
    console.error('Error al obtener la sesión:', error);
    return null;
  }
};

export const removeSession = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    console.log('Sesión eliminada');
  } catch (error) {
    console.error('Error al eliminar la sesión:', error);
  }
};
