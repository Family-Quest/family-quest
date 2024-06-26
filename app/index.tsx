import { Link, Stack } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Card, Snackbar, Text } from 'react-native-paper';
import { object, string } from 'yup';

import { supabase } from '@/api/supabase';
import FormUserAuth from '@/components/FormUserAuth';
import type { UserForm } from '@/types/user';

import SvgLogo from '../assets/logoText.svg';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [ errorMessage, setErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const onDismissSnackBar = useCallback(() => setIsVisible(false), []);

  const loginValidationSchema = object().shape({
    email: string()
      .email('Please enter valid email')
      .required('Email Address is Required'),

    password: string().required('Password is required'),
  });

  const onSubmitForm = useCallback(async (values: Readonly<UserForm>) => {
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      setErrorMessage(error.message === 'Email not confirmed' ? 'Veuillez confirmer votre email avant de vous connectez!' : 'Email ou mot de passe incorrect')
      setIsVisible(true);
      setIsLoading(false);
    }

    if (data.session) 
      // DO REDIRECTION HERE
      setIsLoading(false);
    
  }, []);

  const style = useMemo(() => ({ flex: 1, gap: 50, justifyContent: 'center', padding: 20 } as const),[]);
  const svgStyle = useMemo(() => ({ height: 100 }), []);
  const cardStyle = useMemo(() => ({ backgroundColor: 'white' }), []);
  const cardContentStyle = useMemo(() => ({ gap: 20 }), []);
  const linkStyle = useMemo(() => ({ color: 'blue' }), []);
  const href = useMemo(() => ({ pathname: 'register' }), []);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const screenWithouHeader = useMemo(() => ({ headerShown: false }), []);
  const action = useMemo(() => ({ label: 'Undo', onPress: () => { setIsVisible(false);  } }), []);
  // const snackbarMessage = 

  return (
    <>
      <Stack.Screen options={screenWithouHeader}/>
      <View style={style}>
        <SvgLogo style={svgStyle} />
        <Card>
          <Card.Title title="Connexion" />
          <Card.Content style={cardContentStyle}>
            <FormUserAuth
              buttonLabel="Connexion"
              isLoading={isLoading}
              onSubmitForm={onSubmitForm}
              validationSchema={loginValidationSchema}
            />
          </Card.Content>
        </Card>
        <Card style={cardStyle}>
          <Card.Content style={cardContentStyle}>
            <Text>Pas encore inscrit ?</Text>
            <Link href={href} style={linkStyle}>
              Inscription
            </Link>
          </Card.Content>
        </Card>
        <Snackbar
          action={action}
          duration={5000}
          onDismiss={onDismissSnackBar}
          visible={isVisible}>
          { errorMessage }
        </Snackbar>
      </View>
    </>
  );
}
