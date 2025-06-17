import {useState, useMemo} from 'react';
import {TextField, IconButton, InputAdornment, TextFieldProps} from '@mui/material';
import {Controller} from 'react-hook-form';
import {VisibilityOffOutlined, VisibilityOutlined} from '@mui/icons-material';
import {cn} from '@utils/helpers';
import {TESTING_IDS_MAP} from '@constantsDir/index';
import {getTestIdFromNameLabel} from '@utils/helpers';

interface TextInputProps {
  errorMsg?: string;
  textFieldClassname?: string;
  testID?: string;
}

type CustomTextInputProps = TextInputProps & TextFieldProps;

/**
 * Base Text input, drop-in usage
 */
export function TextInput({
  errorMsg,
  helperText = '',
  fullWidth = true,
  className = '',
  textFieldClassname = '',
  type,
  label,
  testID = '',
  ...rest
}: CustomTextInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const testingId = useMemo(() => {
    return testID || getTestIdFromNameLabel(TESTING_IDS_MAP.TEXT_INPUT, label);
  }, [testID, label]);

  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', className)}>
      <TextField
        label={label}
        data-test={testingId}
        type={type === 'password' && !showPassword ? 'password' : 'text'}
        error={!!errorMsg}
        helperText={errorMsg ?? helperText}
        className={textFieldClassname}
        slotProps={{
          input: {
            endAdornment:
              type === 'password' ? (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                  </IconButton>
                </InputAdornment>
              ) : null,
          },
        }}
        {...rest}
      />
    </div>
  );
}

interface FormControlProps {
  name: string;
  validationRules?: Record<string, unknown>;
}

type TextInputWithFormControlProps = CustomTextInputProps & FormControlProps;

/**
 * Text input, tightly integrated with react hook forms, the name prop is required.
 * should be used wherever a FormProvider context is or passed a control
 * It accepts all the props of the Base Text inputs
 */
export function TextInputFC({
  errorMsg,
  name,
  disabled,
  validationRules = {},
  onChange,
  onBlur,
  ...rest
}: TextInputWithFormControlProps) {
  return (
    <Controller
      name={name}
      rules={validationRules}
      render={({field: {onChange: hookOnChange, onBlur: cOnBlur, value, ref}, fieldState: {error}}) => {
        const _error = errorMsg ?? error?.message ?? '';

        const handleChange = (ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
          onChange?.(ev);
          hookOnChange(ev);
        };

        return (
          <TextInput
            disabled={disabled}
            errorMsg={_error}
            name={name}
            onChange={handleChange}
            onBlur={(e) => {
              onBlur?.(e);
              cOnBlur();
            }}
            value={value as unknown}
            inputRef={ref}
            {...rest}
          />
        );
      }}
    />
  );
}
