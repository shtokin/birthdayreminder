import React from 'react';
import { connect } from 'react-redux';
import { getBirthdaysList, deleteBirthday } from "../../actions";
import { Link } from 'react-router-dom';
import {Image} from "semantic-ui-react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { store } from 'react-notifications-component';

class BirthdaysList extends React.Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    console.log('didMount');
    this.props.getBirthdaysList();
  }

  onDelete = (birthdayId) => {
    confirmAlert({
      title: 'Delete',
      message: 'Are you sure to delete the birthday?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.props.deleteBirthday(birthdayId)
        },
        {
          label: 'No',
        }
      ]
    });
  };

  renderManageButtons(birthdayId) {
    return (
      <div className="right floated content">
        <Link to={`/birthday/${birthdayId}/edit`} className="ui button primary">
          Edit
        </Link>
        <div className="ui button negative" onClick={() => this.onDelete(birthdayId)}>
          Delete
        </div>
      </div>
    );
  }

  renderList() {
    // if (!this.props.birthdays.isLoaded) {
    //   this.props.getBirthdaysList();
    // }
    if (this.props.currentUserId && this.props.birthdays.length) {
      //this.props.getBirthdaysList();
      return this.props.birthdays.map((item) => {
        return (
          <div key={item.id} className="item">
              <Image src={item.photo} size='small' className="rounded" />
              <div className="content">
                <span className="header">{item.date} {item.name}</span>
                <div className="description">
                  <p>{item.description}</p>
                </div>
              </div>
              {this.renderManageButtons(item.id)}
          </div>
        );
      });
    } else {
      return (
        <div className="ui segment">
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
          <p></p>
        </div>
      );

    }
  }

  showNoti() {
    const notification = {
      title: "Wonderful!",
      message: "Configurable",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"]
    };

    store.addNotification({
      ...notification,
      touchSlidingExit: {
        swipe: {
          duration: 400,
          timingFunction: 'ease-out',
          delay: 0,
        },
        fade: {
          duration: 400,
          timingFunction: 'ease-out',
          delay: 0
        }
      }
    })
  }

  render() {
    return (
      <div>
        <div style={{ textAlign: 'right' }}>
          <Link to="/birthday/new" className="ui button primary">
            Add
          </Link>
          <button onClick={this.showNoti}>ffff</button>
        </div>
        <div className="ui celled list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    birthdays: Object.values(state.birthdays),
    currentUserId: state.auth.userId
  }
};

export default connect(mapStateToProps, { getBirthdaysList, deleteBirthday })(BirthdaysList);