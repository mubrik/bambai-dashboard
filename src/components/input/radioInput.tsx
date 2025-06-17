import {useMemo} from 'react';
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  RadioProps,
  RadioGroupProps,
} from '@mui/material';
import {getTestIdFromNameLabel} from '@utils/helpers';
import {TESTING_IDS_MAP} from '@constantsDir/index';

interface RadioInputProps {
  radioProps?: RadioProps & {testID?: string};
  formProps: Omit<FormControlLabelProps, 'control'>;
}

export function RadioInput({radioProps, formProps}: RadioInputProps) {
  const testingId = useMemo(() => {
    return radioProps?.testID ?? getTestIdFromNameLabel(TESTING_IDS_MAP.RADIO_INPUT, formProps?.label);
  }, [radioProps?.testID, formProps?.label]);

  return (
    <FormControlLabel
      classes={{root: 'm-0'}}
      data-test={testingId}
      {...formProps}
      control={<Radio {...radioProps} />}
    />
  );
}

/**
 * Custom Radio Props to extend the Radio Group input
 * @typedef {object} RadioItem
 * @property {React.ReactNode} label
 * @property {string} value
 */
/*** @param {RadioGroupProps & {radios: RadioItem[]}} props */

interface RadioGroupInputProps extends RadioGroupProps {
  radios: {label: React.ReactNode; value: string}[];
  row?: boolean;
  classes?: Record<string, string>;
  name?: string;
}

export function RadioGroupInput({radios, ...groupProps}: RadioGroupInputProps) {
  return (
    <FormControl>
      <RadioGroup {...groupProps}>
        {radios.map((radio) => (
          <RadioInput key={radio.value} formProps={{...radio}} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
