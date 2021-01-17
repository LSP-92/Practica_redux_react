import React from "react";
import useForm from "../../../hooks/useForm";

const Form = (props) => {
  const { initialvalue } = props;

  const [form, handleChange] = useForm({
    initialvalue,
  });
  const { email, password, remember } = form;

  const handleSubmit = (ev) => {
    ev.preventDefault();
    props.onSubmit(form);
  };

  const canSubmit = () => {
    return !!(email && password);
  };

  return (
    <form onSubmit={handleSubmit} initialvalue={props.initialvalue}>
      {props.children({ email, password, remember, handleChange, canSubmit })}
    </form>
  );
};

export default Form;
