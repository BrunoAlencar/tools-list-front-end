import { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Input as InputBootstrap } from 'reactstrap';

 const Input = ({ name, ...rest })  => {

  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  
  useEffect(() => {

    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });

  }, [fieldName, registerField]);
  
  return (
    <InputBootstrap 
        innerRef={inputRef} 
        defaultValue={defaultValue}
        {...rest} 
        />
  );
}

export default Input;