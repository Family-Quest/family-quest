import { ImageBackground, Text, View } from 'react-native';

const Login = () => (
  <ImageBackground
    // eslint-disable-next-line global-require
    source={require('../../assets/back.png')}
    style={{ flex: 1 }}
  >
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Open up App/ to start working on your app!</Text>
    </View>
  </ImageBackground>
);

export { Login };
