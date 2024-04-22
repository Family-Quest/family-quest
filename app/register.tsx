import { Link, Stack, router } from 'expo-router';
import { useState, useMemo, useCallback } from 'react';
import { View } from 'react-native';
import { Card, Snackbar, Text } from 'react-native-paper';
import { object, string } from 'yup';

import { supabase } from '@/api/supabase';
import FormUserAuth from '@/components/FormUserAuth';
import type { UserForm } from '@/types/user';

import SvgLogo from '../assets/logoText.svg';

export default function Register() {
  const passwordLength = 8;

  const [isLoading, setIsLoading] = useState(false);
  const [ errorMessage, setErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const onDismissSnackBar = useCallback(() => setIsVisible(false), []);

  const registerValidationSchema = object().shape({
    email: string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: string()
      .min(passwordLength, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  const onSubmitForm = useCallback(async (values: Readonly<UserForm>) => {    
    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (error) {
      setErrorMessage('Une erreur est survenue lors de votre inscription. Veuillez réessayer !')
      setIsVisible(true);
      setIsLoading(false);
    }

    if (data.user) {
      router.replace('');
      setIsLoading(false);
    }
  }, []);

  const style = useMemo(() => ({ flex: 1, gap: 50, justifyContent: 'center', padding: 20 } as const),[]);
  const svgStyle = useMemo(() => ({ height: 100 }), []);
  const cardStyle = useMemo(() => ({ backgroundColor: 'white' }), []);
  const cardContentStyle = useMemo(() => ({ gap: 20 }), []);
  const linkStyle = useMemo(() => ({ color: 'blue' }), []);
  const href = useMemo(() => ({ pathname: '' }), []);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const screenWithouHeader = useMemo(() => ({ headerShown: false }), []);
  const action = useMemo(() => ({ label: 'Undo', onPress: () => { setIsVisible(false);  } }), []);

  return (
    <>
      <Stack.Screen options={screenWithouHeader}/>
      <View style={style}>
        <SvgLogo style={svgStyle} />
        <Card style={cardStyle}>
          <Card.Title title="Inscription" />
          <Card.Content style={cardContentStyle}>
            <FormUserAuth
              buttonLabel="Inscription"
              isLoading={isLoading}
              onSubmitForm={onSubmitForm}
              validationSchema={registerValidationSchema}
            />
          </Card.Content>
        </Card>
        <Card style={cardStyle}>
          <Card.Content style={cardContentStyle}>
            <Text>Deja inscrit ?</Text>
            <Link href={href} style={linkStyle}>
              Connexion
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