import React from "react";
import InputRenderer from "./InputRender";

const FormRenderer = ({ fields, data, onChange, errors }) => {
  return (
    <>
      {fields.map((field) => (
        <InputRenderer
          key={field.name}
          field={field}
          value={data[field.name]}
          onChange={onChange}
          error={errors?.[field.name]}
        />
      ))}
    </>
  );
};

export default FormRenderer;
