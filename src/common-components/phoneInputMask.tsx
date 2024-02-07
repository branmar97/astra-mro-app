import { IMaskInput } from 'react-imask'
import { forwardRef } from 'react';

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

export const PhoneInputMask = forwardRef<HTMLInputElement, CustomProps>(
    function PhoneMask(props, ref) {
      const { onChange, ...other } = props
      return (
        <IMaskInput
          {...other}
          mask="(#00) 000-0000"
          definitions={{
            '#': /[1-9]/,
          }}
          inputRef={ref}
          unmask
          onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
          overwrite
        />
      )
    },
);
