import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {Link} from "react-router-dom";
import cn from 'classnames';
import { Image } from 'semantic-ui-react'

//import ImageInput from "../ImageInput";
import FieldFileInput from "../FieldFileInput";

class BirthdayForm extends React.Component {

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

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

// <ImageInput
// name="add_photo"
// label="Others:"
// classNameLabel="file-input-label"
// className="file-input"
// dropzone_options={{
//   multiple: false,
//   accept: 'image/*'
// }}
// >
// <span>Add more</span>
// </ImageInput>

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error item" encType="multipart/form-data">
        <div className="ui horizontal segments">
          <div className="ui segment">
            <Image src={this.props.photoUrl} size='large' className="rounded" />
            <Field name="photo" component={FieldFileInput} label="Photo" />
          </div>
          <div className="ui segment">
            <Field name="name" component={this.renderInput} label="Name" onChange={() => {}} />
            <Field name="date" component={this.renderInput} label="Date" />
            <Field name="description" component={this.renderInput} label="Description" />
          </div>
        </div>
        <div style={{float: 'right'}}>
          <button className="ui button primary">Submit</button>
          <Link to="/" className="ui button">Cancel</Link>
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
})(BirthdayForm);