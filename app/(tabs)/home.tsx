import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { getSession, removeSession } from '../../src/utils/sesion';
import { useRouter } from 'expo-router';

export default function Home() {
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cargarSesion = async () => {
      const token = await getSession();
      setSessionToken(token);
    };
    cargarSesion();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#f0f4f8', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.logoReact}
        />
      }
    >
      <ThemedView style={styles.contenedorTitulo}>
        <ThemedText type="title">¡Bienvenido de nuevo!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.contenedorContenido}>
        <ThemedText type="subtitle" style={{ marginBottom: 6 }}>
          Tu sesión está activa
        </ThemedText>
        <ThemedText style={styles.tokenText}>Token: {sessionToken}</ThemedText>

        <ThemedView style={styles.contenedorMenu}>
          <TouchableOpacity style={styles.botonMenu}>
            <ThemedText style={styles.textoBotonMenu}>Perfil</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonMenu}>
            <ThemedText style={styles.textoBotonMenu}>Configuración</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonMenu}>
            <ThemedText style={styles.textoBotonMenu}>Ayuda</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      <View style={styles.contenedorCerrarSesion}>
        <TouchableOpacity
          style={styles.botonCerrarSesion}
          activeOpacity={0.8}
          onPress={async () => {
            await removeSession();
            router.replace('./savedUsers');
          }}
        >
          <ThemedText style={styles.textoCerrarSesion}>Cerrar sesión</ThemedText>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  contenedorTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  contenedorContenido: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  logoReact: {
    height: 180,
    width: 280,
    position: 'absolute',
    bottom: 10,
    left: 10,
    opacity: 0.08,
  },
  tokenText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  contenedorMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  botonMenu: {
    backgroundColor: '#3797EF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    minWidth: 100,
    alignItems: 'center',
    shadowColor: '#3797EF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  textoBotonMenu: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  contenedorCerrarSesion: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  botonCerrarSesion: {
    backgroundColor: '#E53935',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#E53935',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  textoCerrarSesion: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.7,
  },
});
