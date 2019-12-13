import React from 'react';
import GoogleAuth from "./GoogleAuth";
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="title-link">
        <FormattedMessage id="app.main-title"
                          defaultMessage="Birthdays Reminder"
                          description="Main title"/>
      </Link>
      <GoogleAuth />
    </div>
  );
};

export default Header;
