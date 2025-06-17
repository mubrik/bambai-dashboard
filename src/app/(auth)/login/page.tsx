'use client';

import {useState, useCallback} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {Typography} from '@mui/material';
/* comps */
import {MuiButton} from '@components/button/button';
import {RadioGroupInput} from '@components/input/radioInput';
/* const */
import AtIcon from '@assetSvgs/auth-icons/at.svg';
import PhoneIcon from '@assetSvgs/auth-icons/phone-call.svg';
import {TESTING_IDS_MAP} from '@constantsDir/index';

export default function LoginPage() {
  const [mode, setMode] = useState('email');

  const LabelWrapper = useCallback(({text}: {text: string}) => {
    return (
      <div className="flex flex-row gap-1">
        <Image src={text.includes('Email') ? AtIcon : PhoneIcon} alt="phone" />
        <Typography variant="body1" color="textPrimary">
          {text}
        </Typography>
      </div>
    );
  }, []);

  return (
    <div className="h-full flex flex-col gap-6 px-3 justify-center items-center">
      <title>Login</title>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 text-center">
          <Typography variant="h4" fontWeight={'700'} color="textPrimary">
            Sign in to your Account
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Using your email address / phone number
          </Typography>
        </div>
        <RadioGroupInput
          row
          radios={[
            {label: <LabelWrapper text={'Email Address'} />, value: 'email'},
            {label: <LabelWrapper text={'Phone Number'} />, value: 'phone'},
          ]}
          classes={{
            root: 'gap-4',
          }}
          value={mode}
          onChange={(ev) => setMode(ev.target.value || 'email')}
        />
        <Link href={'/login/email'} data-test={`${TESTING_IDS_MAP.BUTTON}_next`}>
          <MuiButton fullWidth>Next</MuiButton>
        </Link>
        <Typography component={'span'} variant="body2" className="text-center" color="textSecondary">
          Don’t have an account?
          <Typography
            component={'a'}
            href="/auth-register"
            data-test={`${TESTING_IDS_MAP.LINK}_register`}
            target="_top"
            variant="body2"
            color="primary"
          >
            {' '}
            Sign Up
          </Typography>
        </Typography>
      </div>
    </div>
  );
}
