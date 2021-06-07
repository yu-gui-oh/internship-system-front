import React, {
    InputHTMLAttributes,
    useEffect,
    useRef,
    useState,
    useCallback,
  } from 'react';
  import { IconBaseProps } from 'react-icons';
  import { FiAlertCircle } from 'react-icons/fi';
  import { useField } from '@unform/core';
  
  import 
  { 
      Container, 
    //   Error, 
      Title 
} from './styles';
  
  interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    containerStyle?: React.CSSProperties;
    icon?: React.ComponentType<IconBaseProps>;
    label: string;
  }
  
  const Input: React.FC<InputProps> = ({
    name,
    containerStyle = {},
    icon: Icon,
    label,
    ...rest
  }) => {
    const inputRef = useRef<HTMLInputElement>(null);
  
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
  
    const { fieldName, defaultValue, error, registerField } = useField(name);
  
    const handleInputFocus = useCallback(() => {
      setIsFocused(true);
    }, []);
  
    const handleInputBlur = useCallback(() => {
      setIsFocused(false);
  
      setIsFilled(!!inputRef.current?.value);
    }, []);
  
    useEffect(() => {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
      });
    }, [fieldName, registerField]);
  
    return (
      <div>
        <Title>
          <label htmlFor={name} className="label">
            {label}:
          </label>
        </Title>
        <Container
        style={containerStyle}
        isErrored={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
        data-testid="input-container"
        >
          {Icon && <Icon size={20} />}
          <input
            id={name}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            defaultValue={defaultValue}
            ref={inputRef}
            type="text"
            {...rest}
          />
  
          {/* {error && (
            <Error title={error}>
              <FiAlertCircle size={20} />
            </Error>
          )} */}
        </Container>
      </div>
    );
  };
  
  export default Input;