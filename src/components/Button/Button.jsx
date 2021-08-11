import P from 'prop-types';
import './Button.css';

export const Button = ({ onClick, text, disabled = false }) => (
  <button className="button" onClick={onClick} disabled={disabled}>
    {text}
  </button>
);

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
  disabled: P.bool,
};
