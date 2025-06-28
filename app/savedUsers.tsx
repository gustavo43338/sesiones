import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { saveSession } from '../src/utils/sesion';

export default function SavedUsers() {
  const router = useRouter();
  const usuariosGuardados = ['GUSTAVO_SESSION'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios guardados</Text>

      {usuariosGuardados.map((usuario, i) => (
        <TouchableOpacity
          key={i}
          style={styles.userButton}
          activeOpacity={0.7}
          onPress={async () => {
            await saveSession(usuario);
            router.replace('/(tabs)/home');
          }}
        >
          <Text style={styles.userText}>{usuario}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.userButton, styles.otherAccountButton]}
        activeOpacity={0.7}
        onPress={() => router.replace('/login')}
      >
        <Text style={[styles.userText, styles.otherAccountText]}>Usar otra cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    paddingHorizontal: 30,
  },
  title: { 
    fontSize: 32, 
    fontWeight: '700', 
    color: '#3797EF', 
    marginBottom: 40, 
    textAlign: 'center',
  },
  userButton: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 16,
    borderRadius: 30,
    marginBottom: 16,
    width: 260,
    alignItems: 'center',
    shadowColor: '#3797EF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  userText: { 
    fontSize: 18, 
    color: '#333',
    fontWeight: '600',
  },
  otherAccountButton: {
    backgroundColor: '#3797EF',
    borderColor: '#3797EF',
  },
  otherAccountText: {
    color: '#fff',
    fontWeight: '700',
  },
});
