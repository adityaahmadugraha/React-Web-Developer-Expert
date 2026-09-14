import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const FormField = forwardRef((
  {
    label, type, placeholder, id, textarea, error, ...rest
  },
  ref,
) => (
  <div className="form-field">
    <label htmlFor={id}>{label}</label>
    {textarea ? (
      <textarea id={id} ref={ref} placeholder={placeholder} {...rest} />
    ) : (
      <input id={id} type={type} ref={ref} placeholder={placeholder} {...rest} />
    )}
    {error && <p className="field-error">{error}</p>}
  </div>
));

FormField.displayName = 'FormField';

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
  textarea: PropTypes.bool,
  error: PropTypes.string,
};

FormField.defaultProps = {
  type: 'text',
  placeholder: '',
  textarea: false,
  error: '',
};

export default FormField;
