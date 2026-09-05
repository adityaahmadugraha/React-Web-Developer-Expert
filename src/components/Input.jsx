import PropTypes from 'prop-types';

function Input({
  label, type, value, onChange, placeholder, id, textarea,
}) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
  textarea: PropTypes.bool,
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  textarea: false,
};

export default Input;
