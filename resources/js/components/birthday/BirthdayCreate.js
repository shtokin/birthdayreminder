import React from 'react';
import { connect } from 'react-redux';
import { createBirthday} from "../../actions";
import BirthdayForm from "./BirthdayForm";
import { FormattedMessage } from 'react-intl';

class BirthdayCreate extends React.Component {
  onSubmit = (formData) => {
    this.props.createBirthday(formData);
  };

  render() {
    return (
      <div>
        <h3>
          <FormattedMessage id="app.add-birthday"
            defaultMessage="Add a birthday" />
        </h3>
        <BirthdayForm onSubmit={this.onSubmit} locale={this.props.locale} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    locale: state.settings.language
  }
};

export default connect(mapStateToProps, { createBirthday })(BirthdayCreate);