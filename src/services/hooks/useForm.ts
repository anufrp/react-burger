import { string } from "prop-types";
import React, { SyntheticEvent } from "react";


export function useForm(inputValues: {}) {
    const [values, setValues] = React.useState<any>(inputValues);
  
    const handleChange = (event: SyntheticEvent) => {
      const {value, name} = event.target  as HTMLInputElement;
      setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
  }
