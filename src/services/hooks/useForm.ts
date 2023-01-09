import React, { ChangeEvent } from "react";


export function useForm(inputValues: {}) {
    const [values, setValues] = React.useState<any>(inputValues);
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
  }
