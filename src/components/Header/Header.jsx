import React from 'react';
import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <div className="main-header">
      <p className="header-logo">Header</p>
      <button className="header-button">
        <FontAwesomeIcon
          icon={faRightToBracket}
          style={{ marginRight: 5 }}
        />
        로그인
      </button>
    </div>
  );
}
