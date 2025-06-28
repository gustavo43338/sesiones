import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { getSession, saveSession, removeSession } from '../../src/utils/sesion';




export default function Index() {
  const router = useRouter();

  useEffect(() => {
  const verificarSesion = async () => {
    const session = await getSession();
    console.log('SESSION:', session);

    if (session) {
      router.replace('/home'); 
    } else {
      router.replace('/login'); 
    }
  };
  verificarSesion();
}, []);


  return null;
}
