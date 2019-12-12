import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {Link} from "react-router-dom";
import cn from 'classnames';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { FormattedMessage, injectIntl } from 'react-intl';

import FieldFileInput from "../FieldFileInput";

class BirthdayForm extends React.Component {

  state = { imageFile: [] };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  renderInput = ({ input, label, meta }) => {
    const className = cn('field', {'error': meta.error && meta.touched});

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" type="text" />
        {this.renderError(meta)}
      </div>
    );
  };

  renderTextArea = ({ input, label, meta }) => {
    const className = cn('field', {'error': meta.error && meta.touched});

    return (
      <div className={className}>
        <label>{label}</label>
        <textarea {...input} autoComplete="off" type="text" />
        {this.renderError(meta)}
      </div>
    );
  };

  renderDatepicker = ({ input, label, meta }) => {
    const selectedDate = moment(input.value).isValid() ? moment(input.value).toDate() : null;

    return (
      <>
        <label>{label}</label><br/>
        <DatePicker {...input} label={label} dateForm="MM/DD/YYYY" selected={selectedDate} />
      </>
    );
  };

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  render() {
    const { intl } = this.props;

    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error item"
        encType="multipart/form-data" autoComplete="off">
        <div className="ui horizontal segments">
          <div className="ui segment">
            <Field name="photo" component={FieldFileInput} label={intl.formatMessage({id: "app.upload-photo"})}
              photoUrl={this.props.photoUrl} />
          </div>
          <div className="ui segment">
            <Field name="name" component={this.renderInput}
              label={intl.formatMessage({id: "app.name"})} onChange={() => {}} />
            <Field name="date" component={this.renderDatepicker} label={intl.formatMessage({id: "app.date"})} />
            <Field name="description" component={this.renderTextArea}
              label={intl.formatMessage({id: "app.description"})} />
          </div>
        </div>
        <div style={{float: 'right'}}>
          <button className="ui button primary">{intl.formatMessage({id: "app.submit"})}</button>
          <Link to="/" className="ui button">{intl.formatMessage({id: "app.cancel"})}</Link>
        </div>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.name) {
    errors.title = 'Name is required';
  }

  if (!formValues.date) {
    errors.date =  'Date is required';
  }

  return errors;
};

export default reduxForm({
  form: 'birthdayForm',
  validate
})(injectIntl(BirthdayForm));