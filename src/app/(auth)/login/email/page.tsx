'use client';
/* import { useActionState, startTransition } from "react"; */
import {useRouter} from 'next/navigation';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {Typography} from '@mui/material';
/* queries */
/* import { loginUser } from "@src/api/actions/authActions"; */
import {useAuthLogin} from '@api/auth';
import {getMessageFromAPIError} from '@api/shared/apiClient';
/* compos */
import {MuiButton} from '@components/button/button';
import {TextInputFC} from '@components/input/textInput';
import GoBack from '../../_components/goBack';
/* const */
import {TESTING_IDS_MAP} from '@constantsDir/index';

interface FormProps {
  email: string;
  password: string;
}

export default function EmailLogin() {
  /* const [userData, _loginUser, isPending] = useActionState(loginUser, null); */
  const router = useRouter();
  const {mutate: login, isPending, error: loginErr, reset} = useAuthLogin();
  const form = useForm({defaultValues: {email: '', password: ''}});

  const onFormSubmit: SubmitHandler<FormProps> = (formData) => {
    login({email: formData.email.trim(), password: formData.password, type: 'email'});
    /* startTransition(async () => {
      _loginUser({email: formData.email.trim(), password: formData.password, url: API_ENDPOINTS.AUTH.SIGNIN})
    }) */
  };

  const _errMsg = getMessageFromAPIError(loginErr, '');

  return (
    <FormProvider {...form}>
      <form
        className="h-full flex flex-col gap-2 px-3 justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit(onFormSubmit)(e);
        }}
      >
        <title>Email Login</title>
        <GoBack title={'Go Back'} onPress={() => void router.push('/login')} />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-center">
            <Typography variant="h4" fontWeight={'700'} color="textPrimary">
              Enter your email and password
            </Typography>
          </div>
          <TextInputFC
            name="email"
            type="email"
            label="Enter Email Address"
            validationRules={{required: 'This field is required'}}
            errorMsg={_errMsg ? ' ' : ''}
          />
          <div>
            <TextInputFC
              type="password"
              name="password"
              label="Enter password here"
              validationRules={{required: 'This field is required'}}
              errorMsg={_errMsg}
            />
          </div>
          <div className="flex flex-col gap-2">
            <MuiButton fullWidth type="submit" isLoading={isPending}>
              Sign In
            </MuiButton>
            <div className="flex flex-row justify-end">
              <Typography
                component={'a'}
                href="/forgot-password"
                data-test={'link_forgotpassword'}
                target="_top"
                variant="body2"
                color="primary"
                className="cursor-pointer"
              >
                Forgot password?
              </Typography>
            </div>
          </div>
          <Typography component={'span'} variant="body2" className="text-center" color="textSecondary">
            Don’t have an account?
            <Typography
              component={'a'}
              href="/auth-register"
              data-test={TESTING_IDS_MAP.REGISTER_LINK}
              target="_top"
              variant="body2"
              color="primary"
            >
              {' '}
              Sign Up
            </Typography>
          </Typography>
        </div>
      </form>
    </FormProvider>
  );
}
