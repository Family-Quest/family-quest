import { Formik } from 'formik';
import { useState, useMemo, useCallback } from 'react';
import { Button, Text, TextInput } from 'react-native-paper';
import type { Schema } from 'yup';
import type { DeepReadonly } from 'ts-essentials';

import type { UserForm } from '@/types/user';

type FormUserAuthProperties = DeepReadonly<{
  buttonLabel: string;
  isLoading: boolean;
  onSubmitForm: (values: UserForm) => void;
  validationSchema: Schema;
}>;

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export default function FormUserAuth(properties: Readonly<FormUserAuthProperties>) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const changePasswordVisibility = useCallback(() => {
    setIsPasswordHidden(!isPasswordHidden);
  }, [isPasswordHidden]);

  const onSubmit = useCallback((values: UserForm) => {
    properties.onSubmitForm(values);
  }, [properties]);

  const initialValues = useMemo(() => ({ email: '', password: '' }), []);
  const errorStyle = useMemo(() => ({ color: 'red', fontSize: 10 }), []);
  const right = useMemo(() => (
    <TextInput.Icon icon={isPasswordHidden ? 'eye' : 'eye-off'} onPress={changePasswordVisibility} testID='password-change-visibility'/>), 
    [isPasswordHidden, changePasswordVisibility],
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      testId="form-user-auth"
      validateOnMount
      validationSchema={properties.validationSchema}
    >
      {({
        errors, handleBlur, handleChange, handleSubmit, isValid, touched, values,
      }) => (
        <>
          <TextInput
            keyboardType="email-address"
            label="email"
            onBlur={handleBlur('email')}
            onChangeText={handleChange('email')}
            placeholder="Email Address"
            testID="email-input"
            value={values.email} />
          {Boolean(errors.email) && Boolean(touched.email) && <Text style={errorStyle}>{errors.email}</Text>}

          <TextInput
            label="password"
            onBlur={handleBlur('password')}
            onChangeText={handleChange('password')}
            placeholder="Password"
            right={right}
            secureTextEntry={isPasswordHidden}
            testID="password-input"
            value={values.password} />
          {Boolean(errors.password) && Boolean(touched.password) && <Text style={errorStyle}>{errors.password}</Text>}

          <Button
            buttonColor="lightblue"
            disabled={!isValid || values.email === '' || properties.isLoading}
            loading={properties.isLoading}
            mode="elevated"
            // eslint-disable-next-line react/jsx-no-bind, @arthurgeron/react-usememo/require-usememo, react-perf/jsx-no-new-function-as-prop
            onPress={() => handleSubmit()}
            testID="submit-button"
          >
            {properties.buttonLabel}
          </Button>
        </>
      )}
    </Formik>
  );
}