import { render, screen, userEvent } from '@testing-library/react-native';
import { object, string } from 'yup';

import FormUserAuth from './FormUserAuth';

jest.useFakeTimers();

const loginValidationSchema = object().shape({
  email: string().required('Email Address is Required'),
  password: string().required('Password is required'),
});

describe('FormUserAuth component', () => {
  describe('Render method', () => {

    it('should render', async () => {
      expect.hasAssertions();
      const submitFormMock = jest.fn();
      const user = userEvent.setup();

      render(
        <FormUserAuth
          buttonLabel='Submit'
          isLoading={false}
          onSubmitForm={submitFormMock}
          validationSchema={loginValidationSchema}
        />,
      );

      const submitButton = screen.getByTestId('submit-button');
      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');

      expect(submitButton).toBeOnTheScreen();
      expect(submitButton).toBeDisabled();
      expect(emailInput).toBeOnTheScreen();
      expect(passwordInput).toBeOnTheScreen();

      await user.press(submitButton);

      expect(submitFormMock).not.toHaveBeenCalled();
    });

    it('should submit form when filled', async () => {
      expect.hasAssertions();
      const submitFormMock = jest.fn();
      const user = userEvent.setup();

      render(
        <FormUserAuth
          buttonLabel='Submit'
          isLoading={false}
          onSubmitForm={submitFormMock}
          validationSchema={loginValidationSchema}
        />,
      );

      const submitButton = screen.getByTestId('submit-button');
      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');

      await user.type(emailInput, 'test@gmail.com');
      await user.type(passwordInput, 'password');

      expect(submitButton).toBeEnabled();

      await user.press(submitButton);

      expect(submitFormMock).toHaveBeenCalledTimes(1);
    });

    it('should show error messages when form is invalid', async () => {
      expect.hasAssertions();
      const submitFormMock = jest.fn();
      const user = userEvent.setup();

      render(
        <FormUserAuth
          buttonLabel='Submit'
          isLoading={false}
          onSubmitForm={submitFormMock}
          validationSchema={loginValidationSchema}
        />,
      );

      const submitButton = screen.getByTestId('submit-button');
      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');

      await user.type(emailInput, '');
      await user.type(passwordInput, '');
      await user.press(submitButton);

      const emailError = screen.getByText('Email Address is Required');
      const passwordError = screen.getByText('Password is required');

      expect(emailError).toBeOnTheScreen();
      expect(passwordError).toBeOnTheScreen();
    });
  });
});
