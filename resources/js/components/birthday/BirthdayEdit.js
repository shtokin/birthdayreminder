import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { updateBirthday, getBirthday } from "../../actions";
import BirthdayForm from "./BirthdayForm";
import { FormattedMessage } from 'react-intl';

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
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { birthdays: state.birthdays[ownProps.match.params.id]}
};

export default connect(mapStateToProps, { getBirthday, updateBirthday })(BirthdayEdit);