import React from 'react';
import { connect } from 'react-redux';
import { getBirthdaysList, deleteBirthday } from "../../actions";
import { Link } from 'react-router-dom';
import {Image} from "semantic-ui-react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FormattedMessage, FormattedDate, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';


class BirthdaysList extends React.Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    this.props.getBirthdaysList();
  }

  onDelete = (birthdayId) => {
    const { intl } = this.props;

    confirmAlert({
      title: intl.formatMessage({id: 'app.deletion'}),
      message: intl.formatMessage({id: 'app.delete-confirm'}),
      buttons: [
        {
          label: intl.formatMessage({id: 'app.yes'}),
          onClick: () => this.props.deleteBirthday(birthdayId)
        },
        {
          label: intl.formatMessage({id: 'app.no'}),
        }
      ]
    });
  };

  renderManageButtons(birthdayId) {
    return (
      <div className="right floated content">
        <Link to={`/birthday/${birthdayId}/edit`} className="ui button primary">
          <FormattedMessage id="app.edit"
            defaultMessage="Edit" />
        </Link>
        <div className="ui button negative" onClick={() => this.onDelete(birthdayId)}>
          <FormattedMessage id="app.delete" defaultMessage="Delete" />
        </div>
      </div>
    );
  }

  renderList() {
    if (this.props.currentUserId && this.props.birthdays.length) {
      return this.props.birthdays.map((item) => {
        return (
          <div key={item.id} className="item">
              <Image src={item.photo} size='small' className="rounded" />
              <div className="content">
                <span className="header">
                  <FormattedDate value={item.date} day="numeric" month="numeric" year="numeric" /> {item.name}
                </span>
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
            <div className="ui text loader">
              <FormattedMessage id="app.loading" defaultMessage="Loading" />
            </div>
          </div>
        </div>
      );

    }
  }

  render() {
    return (
      <div>
        <div style={{ textAlign: 'right' }}>
          <Link to="/birthday/new" className="ui button primary">
            <FormattedMessage id="app.add" defaultMessage="Add" />
          </Link>
        </div>
        <div className="ui celled list">{this.renderList()}</div>
      </div>
    );
  }
}

BirthdaysList.propTypes = {
  getBirthdaysList: PropTypes.func,
  deleteBirthday: PropTypes.func,
  currentUserId: PropTypes.string,
  birthdays: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    birthdays: Object.values(state.birthdays),
    currentUserId: state.auth.userId
  }
};

export default connect(mapStateToProps, { getBirthdaysList, deleteBirthday })(injectIntl(BirthdaysList));