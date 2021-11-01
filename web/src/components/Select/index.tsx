import React from 'react';
import { useField } from '@unform/core';
// import { FiAlertCircle } from 'react-icons/fi';

import { 
    SelectContainer, 
    Title, 
    // Error 
} from './styles';

interface OptionProps {
  value: string;
  label: string;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  defaultOption?: string;
  disabled?: boolean;
  options: OptionProps[];
}

const Select: React.FC<InputProps> = ({
  name,
  label,
  defaultOption,
  disabled,
  options,
  ...rest
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [selected, setSelected] = React.useState<string>(defaultOption || '');

  const { 
      fieldName, 
    //   error, 
      registerField 
} = useField(name);

  const handleDetailsDropDown = React.useCallback(() => {
    const details = document.getElementById(name.trim()) as HTMLElement;

    if (details.hasAttribute('open')) details.removeAttribute('open');
    else details.setAttribute('open', '');
  }, [name]);

  const handleSelect = React.useCallback(
    (choice: string) => {
      setSelected(choice);
      handleDetailsDropDown();
    },
    [handleDetailsDropDown],
  );

  React.useEffect(() => {
    if (defaultOption?.toString()) {
      const inputElement = document.getElementById(
        defaultOption,
      ) as HTMLElement;

      inputElement.setAttribute('checked', '');
      setSelected(defaultOption);
    }
  }, [defaultOption]);

  React.useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <SelectContainer isChecked={!!(defaultOption?.toString() || selected)}>
      <Title>
        <label className="label" htmlFor={name.trim()}>
          {label}:
        </label>

        {/* {error && (
            <Error title={error}>
              <FiAlertCircle color="#cd351d" size={20} />
            </Error>
          )} */}
      </Title>
      <details className="custom-select" id={name.trim()}>
        <summary className="radios">
          {!defaultOption?.toString() && !selected
            ? 'Clique para selecionar'
            : ''}

          {options.map(option => (
            <input
              key={option.value}
              type="radio"
              name={name.trim()}
              id={option.value.trim()}
              title={option.label}
              onClick={() => handleSelect(option.value)}
              {...rest}
            />
          ))}
        </summary>
        {!disabled && (
          <div className="scroll">
            <ul className="list">
              {options.map(option => (
                <li key={option.value}>
                  <label htmlFor={option.value.trim()}>{option.label}</label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </details>
      <input ref={inputRef} type="hidden" value={selected} />
    </SelectContainer>
  );
};

export default Select;