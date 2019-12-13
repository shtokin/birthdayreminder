import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {Link} from "react-router-dom";
import cn from 'classnames';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { injectIntl } from 'react-intl';
import ru from "date-fns/locale/ru";

import FieldFileInput from "../FieldFileInput";

registerLocale("ru", ru);

class BirthdayForm extends React.Component {

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  required = value => {
    return value ? undefined : "app.required-field";
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
    const className = cn('field', {'error': meta.error && meta.touched});
    const dateFormat = this.props.locale === 'ru' ? 'dd.MM.yyyy' : 'MM/dd/yyyy';
    if (input.value && this.props.locale === 'ru') {
      input.value = moment(input.value).format('DD.MM.YYYY');
    }

    return (
      <div className={className}>
        <label>{label}</label><br/>
        <DatePicker {...input} label={label} selected={selectedDate} dateFormat={dateFormat} locale={this.props.locale} />
        {this.renderError(meta)}
      </div>
    );
  };

  renderError({ error, touched }) {
    const { intl } = this.props;

    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{intl.formatMessage({id: error})}</div>
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
              label={intl.formatMessage({id: "app.name"})} onChange={() => {}} validate={[ this.required ]} />
            <Field name="date" component={this.renderDatepicker} label={intl.formatMessage({id: "app.date"})}
              validate={[ this.required ]} />
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

export default reduxForm({
  form: 'birthdayForm'
})(injectIntl(BirthdayForm));