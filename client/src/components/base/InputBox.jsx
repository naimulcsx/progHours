export const InputField = ({ id, formik, ...rest }) => {
  return (
    <div className="form-group">
      <input id={id} placeholder=" " {...formik?.getFieldProps(id)} {...rest} />
      <label htmlFor={id}>{rest.label}</label>
      {rest.hasError && <div className="error-message">{rest.msg}</div>}
    </div>
  )
}
