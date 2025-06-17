'use client';

import React, {useMemo, useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {ToastContext, initialToastState, ToastProps} from './useToast';

function ToastProvider({children}: {children: React.ReactNode}) {
  const [toastState, setToastState] = useState(initialToastState);

  const value = useMemo(
    () => ({
      toastState,
      toast: (_toastState: ToastProps) => {
        const {show, ...rest} = _toastState;
        setToastState((prev) => ({...prev, ...rest, show: show ?? true}));
      },
    }),
    [toastState],
  );

  const handleToastClose = () => {
    if (toastState.onClose) {
      toastState.onClose();
    }
    setToastState(initialToastState);
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Snackbar
        key={toastState.message}
        anchorOrigin={toastState.anchor}
        autoHideDuration={toastState.timeout}
        onClose={handleToastClose}
        open={toastState.show}
      >
        <Alert
          color={toastState.type}
          onClose={toastState.showClose ? handleToastClose : undefined}
          action={toastState.onAction}
          severity={toastState.type}
          variant={toastState.variant}
          sx={{width: '100%'}}
        >
          {toastState.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
