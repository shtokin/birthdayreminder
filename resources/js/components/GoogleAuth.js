import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Dropdown, Icon } from "semantic-ui-react";

import { signIn, signOut, getBirthdaysList } from "../actions";

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
    } else {
      this.props.signOut();
    }
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
          <Icon name='upload' /> Hello, {userName}
        </span>
      );

      const userOptions = [
        // {
        //   key: 'user',
        //   text: (
        //     <span>
        //       Signed in as <strong>{userName}</strong>
        //     </span>
        //   ),
        //   disabled: true,
        // },
        {
          key: 'admin',
          text: (
            <Link to="/admin" className="item">Admin panel</Link>
          )
        },
        {
          key: 'settings',
          text: (
            <Link to="/settings" className="item">Settings</Link>
          )
        },
        {
          key: 'sign-out',
          text: (
            <span className="item" onClick={this.onSignOutClick}>Sign Out</span>
          )
        },
      ];

      return (
        <Dropdown trigger={trigger} options={userOptions} />
      );
    } else {
      return (
        <button className="ui google blue basic button"  onClick={this.onSignInClick}>
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }

  }

  render() {
    return (
        <div className="right menu">
          {this.renderAuthButton()}
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userName: state.auth.userName
  };
};

export default connect(mapStateToProps, {signIn, signOut, getBirthdaysList})(GoogleAuth);
