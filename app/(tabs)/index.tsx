import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { getSession, removeSession, saveSession } from '../../src/utils/sesion';

export default function PantallaPrincipal() {
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  useEffect(() => {
    const cargarSesion = async () => {
      const tokenGuardado = await getSession();
      setSessionToken(tokenGuardado);
    };

    cargarSesion();
  }, []);

  if (!sessionToken) {
    return (
      <ThemedView style={styles.contenedorLogin}>
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.imagenLogin}
        />
        <ThemedText type="title" style={styles.tituloLogin}>
          Bienvenido Gustavo BJ
        </ThemedText>
        <ThemedText style={styles.subtituloLogin}>
          Inicia sesión para comenzar.
        </ThemedText>

        <TouchableOpacity
          style={styles.botonLogin}
          onPress={async () => {
            await saveSession('GBJ5562');
            const nuevoToken = await getSession();
            setSessionToken(nuevoToken);
          }}
        >
          <ThemedText style={styles.textoBotonLogin}>Iniciar sesión</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.logoReact}
        />
      }>
      <ThemedView style={styles.contenedorTitulo}>
        <ThemedText type="title">¡Bienvenido de nuevo!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.contenedorContenido}>
        <ThemedText type="subtitle">Tu sesión está activa</ThemedText>
        <ThemedText>Token: {sessionToken}</ThemedText>

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
          onPress={async () => {
            await removeSession();
            setSessionToken(null);
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
    marginBottom: 12,
  },
  contenedorContenido: {
    gap: 12,
    marginBottom: 12,
  },
  logoReact: {
    height: 180,
    width: 280,
    position: 'absolute',
    bottom: 10,
    left: 10,
    opacity: 0.1,
  },
  contenedorLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    gap: 20,
    backgroundColor: '#f9f9f9',
  },
  imagenLogin: {
    width: 140,
    height: 140,
    marginBottom: 20,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  tituloLogin: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
  },
  subtituloLogin: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
    marginBottom: 24,
  },
  botonLogin: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  textoBotonLogin: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  contenedorCerrarSesion: {
    alignItems: 'center',
    marginTop: 30,
  },
  botonCerrarSesion: {
    backgroundColor: '#E53935',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    elevation: 2,
  },
  textoCerrarSesion: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  contenedorMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
    paddingHorizontal: 10,
  },
  botonMenu: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  textoBotonMenu: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
