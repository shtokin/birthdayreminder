import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { updateBirthday, getBirthday } from "../../actions";
import BirthdayForm from "./BirthdayForm";
import { FormattedMessage } from 'react-intl';
import PropTypes from "prop-types";

class BirthdayEdit extends React.Component {
  componentDidMount() {
    this.props.getBirthday(this.props.match.params.id);
  }

  onSubmit = (formData) => {
    this.props.updateBirthday(formData, this.props.match.params.id);
  };

  render() {
    return (
      <div>
        <h3>
          <FormattedMessage id="app.edit-birthday" defaultMessage="Edit birthday" />
        </h3>
        <BirthdayForm
          onSubmit={this.onSubmit}
          initialValues={_.pick(this.props.birthdays, 'name', 'date', 'description' )}
          photoUrl={this.props.birthdays ? this.props.birthdays.photo : null }
          locale={this.props.locale}
        />
      </div>
    );
  }
}

BirthdayEdit.propTypes = {
  getBirthday: PropTypes.func,
  updateBirthday: PropTypes.func,
  locale: PropTypes.string,
  birthdays: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
    birthdays: state.birthdays[ownProps.match.params.id],
    locale: state.settings.language
  };
};

export default connect(mapStateToProps, { getBirthday, updateBirthday })(BirthdayEdit);