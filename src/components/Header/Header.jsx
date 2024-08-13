import React from 'react';
import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <div className="main-header">
      <div className="main-margin">
        <NavLink to="/" className="header-logo">
          Merge-Halle
        </NavLink>

        <NavLink to="/login" className="header-button">
          <FontAwesomeIcon
            icon={faRightToBracket}
            style={{ marginRight: 10 }}
          />
          로그인
        </NavLink>
      </div>
    </div>
  );
}
