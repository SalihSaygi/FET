import React from 'react';
import '../../sources/css/specialButton.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];

const SIZES = ['btn--medium', 'btn--large'];

interface Props {
  children?: React.ReactNode;
  buttonType?: "button" | "submit" | "reset"
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  buttonStyle?: string;
  buttonSize?: string;
}

export const Button: React.FC<Props>= ({
  children,
  buttonType,
  onClick,
  buttonStyle,
  buttonSize
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle!)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize!) ? buttonSize : SIZES[0];

  return (
    <Link to='/sign-up' className='btn-mobile'>
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={buttonType}
      >
        {children}
      </button>
    </Link>
  );
};