import React from 'react';
import { connect } from 'react-redux';
import {store} from "react-notifications-component";
import moment from "moment";

import { setNotificationShowed } from "../actions";
import notificationContent from "./notificationContent";

class Notificator extends React.Component {

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.props.isShowed && this.props.birthdays && this.props.birthdays.length) {
      this.checkNotifications();
      this.props.setNotificationShowed();
    }
  }

  checkNotifications = () => {
    const currentDate = moment().format('MM/DD/YYYY');
    this.props.birthdays.forEach((val) => {
      if (currentDate === val.date) {
        this.showNotification(val.id, val.name);
      }
    });
  };

  showNotification = (birthdayId, name) => {
    const notification = {
      title: "Wonderful!",
      message: "Configurable message about birthday",
      content: notificationContent(birthdayId, name),
      type: "info",
      insert: "bottom",
      container: "bottom-right",
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
    });
  };

  render() {
    return '';
  }
}

const mapStateToProps = (state) => {
  return {
    birthdays: Object.values(state.birthdays),
    isShowed: state.notification.isShowed
  }
};

export default connect(mapStateToProps, { setNotificationShowed })(Notificator);