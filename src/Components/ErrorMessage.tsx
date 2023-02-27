import React from 'react';
import { Alert, AlertTitle, Button } from '@mui/material';
import { ErrorType } from '../types/ErrorType';

type Props = {
  error: ErrorType,
  closeError: () => void,
};

export const ErrorMessage: React.FC<Props> = ({ error, closeError }) => {
  let errorMessage = '';

  switch (error) {
    case ErrorType.LOAD:
      errorMessage = 'Unable to load articles';
      break;

    case ErrorType.FIND:
      errorMessage = 'No articles found';
      break;

    case ErrorType.DELETE:
      errorMessage = 'Unable to delete an article';
      break;

    case ErrorType.LOGIN:
      errorMessage = 'Invalid username or password';
      break;

    default:
      break;
  }

  return (
    <div style={{
      position: 'absolute',
      top: 660,
      left: 0,
      right: 0,
      zIndex: 999,
      width: 500,
    }}
    >
      <Alert
        severity="error"
        className="alert-message"
        action={(
          <Button
            color="inherit"
            size="small"
            onClick={closeError}
          >
            CLOSE
          </Button>
        )}
      >
        <AlertTitle>Error</AlertTitle>
        {errorMessage}
      </Alert>
    </div>
  );
};
