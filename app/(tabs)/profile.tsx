import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { removeSession } from '../../src/utils/sesion';

export default function Profile() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={async () => {
          await removeSession();
          router.replace('/savedUsers');
        }}
        style={{ backgroundColor: '#E53935', padding: 16, borderRadius: 8 }}
      >
        <Text style={{ color: '#fff' }}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
