import { Stack } from 'expo-router';

import { Login } from '@/templates/Login';

const Home = () => (
  <>
    <Stack.Screen
      options={{
        headerShown: false,
      }}
    />
    <Login />
  </>
);

export default Home;
