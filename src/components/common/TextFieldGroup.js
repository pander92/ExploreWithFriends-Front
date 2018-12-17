// import React from 'react';
// import classnames from 'classnames';

// const TextFieldGroup = ({
//   name,
//   placeholder,
//   value,
//   label,
//   error,
//   info,
//   type,
//   onChange,
//   disabled
// }) => {
//   console.log(error);
//   return (
//     <div className="form-group">
//       <input
//         type={type}
//         className={classnames('form-control form-control-lg', {
//           'is-invalid': error
//         })}
//         placeholder={placeholder}
//         name={name}
//         value={value}
//         onChange={onChange}
//         disabled={disabled}
//       />
//       {info && <small className="form-text text-muted">{info}</small>}
//       {error && <div className="invalid-feedback">{error}</div>}
//     </div>
//   );
// };

// export default TextFieldGroup;

// _______________________________________________;

import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({
  name,
  id,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  console.log(error);
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <input
        id={id}
        type={type}
        className={classnames('form-control', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default TextFieldGroup;
