import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Dropdown, Icon } from "semantic-ui-react";
import { FormattedMessage } from 'react-intl';
import PropTypes from "prop-types";

import { signIn, signOut, getBirthdaysList, fetchSettings } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '690462507177-gagn8idd8c4htia07hj3p8a52hg5ntne.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
        this.props.getBirthdaysList();
        this.props.fetchSettings();
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn({
        userId: this.auth.currentUser.get().getId(),
        userName: this.auth.currentUser.get().getBasicProfile().getGivenName()
      });
      this.props.getBirthdaysList();
      this.props.fetchSettings();
    } else {
      this.props.signOut();
    }
  };

  fakeAuth = () => {
    this.props.signIn({
      userId: '106462253192543392587',
      userName: 'Fake user'
    });
    this.props.getBirthdaysList();
    this.props.fetchSettings();
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    const userName = this.props.userName;

    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      const trigger = (
        <span>
          <Icon name='user' />
          <FormattedMessage id="app.hello"
            defaultMessage="Hello"
            description="Hello" />, {userName}
        </span>
      );

      let userOptions = [
        {
          key: 'birthdays',
          text: (
            <Link to="/" className="item">
              <FormattedMessage id="app.birthdays"
                defaultMessage="Birthdays"
                description="Birthdays" />
            </Link>
          )
        },
        {
          key: 'settings',
          text: (
            <Link to="/settings" className="item">
              <FormattedMessage id="app.settings-title"
                defaultMessage="Settings"
                description="Settings" />
            </Link>
          )
        },
        {
          key: 'sign-out',
          text: (
            <span className="item" onClick={this.onSignOutClick}>
              <FormattedMessage id="app.sign-out"
                defaultMessage="Sign Out"
                description="Sign Out" />
            </span>
          )
        },
      ];

      // const adminUserId = '106462253192543392587';
      // if (this.props.userId === adminUserId) {
      //   const adminMenu = {
      //     key: 'admin',
      //     text: (
      //       <Link to="/admin" className="item">Admin panel</Link>
      //     )
      //   };
      //   userOptions = [adminMenu, ...userOptions];
      // }

      return (
        <Dropdown trigger={trigger} options={userOptions} />
      );
    } else {
      return (
        <>
          <button onClick={this.fakeAuth}>Fake auth</button>
          <button className="ui google blue basic button"  onClick={this.onSignInClick}>
            <i className="google icon" />
            <FormattedMessage id="app.sign-in-google"
              defaultMessage="Sign In with Google"
              description="Sign In with Google" />
          </button>
        </>
      );
    }

  }

  render() {
    return (
        <div className="right menu user-menu">
          {this.renderAuthButton()}
        </div>
    );
  }
}

GoogleAuth.propTypes = {
  signIn: PropTypes.func,
  signOut: PropTypes.func,
  getBirthdaysList: PropTypes.func,
  fetchSettings: PropTypes.func,
  userName: PropTypes.string,
  userId: PropTypes.string,
  isSignedIn: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userName: state.auth.userName,
    userId: state.auth.userId
  };
};

export default connect(mapStateToProps, {signIn, signOut, getBirthdaysList, fetchSettings})(GoogleAuth);
