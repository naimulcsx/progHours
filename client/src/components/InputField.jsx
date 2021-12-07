const InputField = ({ id, formik, ...rest }) => {
  return (
    <div className="form-group">
      <input id={id} placeholder=" " {...formik?.getFieldProps(id)} {...rest} />
      <label htmlFor={id}>{rest.label}</label>
      {rest.haserror && <div className="error-message">{rest.msg}</div>}
    </div>
  )
}

export default InputField
