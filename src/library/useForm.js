import { useState } from "react";

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  function handleInputChange(e) {
    let { value, name, type } = e.target;

    if (type === "number") {
      value = parseInt(value);
    }

    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  return { inputs, handleInputChange };
}
