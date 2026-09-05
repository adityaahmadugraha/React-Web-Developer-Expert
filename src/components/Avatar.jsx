import PropTypes from 'prop-types';

function Avatar({ name, image, size = 28 }) {
  const style = { width: size, height: size };

  if (image) {
    return (
      <img
        className="avatar"
        src={image}
        alt={name}
        style={style}
        loading="lazy"
      />
    );
  }

  const initials = (name || '?').trim().charAt(0).toUpperCase();

  return (
    <span
      className="avatar"
      style={{
        ...style,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.45,
        fontWeight: 600,
      }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

Avatar.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  size: PropTypes.number,
};

Avatar.defaultProps = {
  name: '',
  image: '',
  size: 28,
};

export default Avatar;
