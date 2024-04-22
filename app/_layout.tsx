/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Stack } from 'expo-router';
import { NativeWindStyleSheet } from 'nativewind';
import { useMemo } from 'react';
import { ImageBackground } from 'react-native';
import { PaperProvider } from 'react-native-paper';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function Layout() {
   
  const screenOptions = useMemo(() => ({ contentStyle: { backgroundColor: 'transparent' } }), [])

  const style = useMemo(() => ({ flex: 1 }), []);
  return (
    <PaperProvider>
      <ImageBackground source={require('../assets/back.png')} style={style}>
        <Stack screenOptions={screenOptions} />
      </ImageBackground>
    </PaperProvider>
  );
}