import React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { languageList } from './languageList';
import { fetchSettings, saveLanguage, saveTheme } from '../actions'
import { FormattedMessage } from 'react-intl';
import PropTypes from "prop-types";

class Settings extends React.Component {

  componentDidMount() {
    this.props.fetchSettings();
  }

  handleThemeChange = (event, data) => {
    this.props.saveTheme(data.value);
  };

  handleLanguageChange = (event, data) => {
    this.props.saveLanguage(data.value);
  };

  renderLanguage = () => {
    const countryOptions = languageList;
    return (
      <div>
        <label>
          <FormattedMessage id="app.language"
            defaultMessage="Language"
            description="Language" />
        </label>
        <Dropdown
          fluid
          selection
          options={countryOptions}
          value={this.props.language}
          onChange={this.handleLanguageChange}
        />
      </div>
    );
  };

  renderTheme = () => {
    const themes = [
      { key: 'default', value: 'default', text: 'Default' },
      { key: 'dark', value: 'dark', text: 'Dark' },
    ];

    return (
      <div>
        <label>
          <FormattedMessage id="app.theme"
            defaultMessage="Theme"
            description="Theme" />
        </label>
        <Dropdown
          fluid
          selection
          options={themes}
          value={this.props.theme}
          onChange={this.handleThemeChange}
        />
      </div>
    );
  };

  render() {
    return (
      <div className="ui segment">
        <h3>
          <FormattedMessage id="app.settings-title"
            defaultMessage="Settings"
            description="Settings" />
        </h3>
        {this.renderLanguage()}
        {this.renderTheme()}
      </div>
    );
  }
}

Settings.propTypes = {
  fetchSettings: PropTypes.func,
  saveLanguage: PropTypes.func,
  saveTheme: PropTypes.func,
  language: PropTypes.string,
  theme: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    language: state.settings.language,
    theme: state.settings.theme
  }
};

export default connect(mapStateToProps, { fetchSettings, saveLanguage, saveTheme })(Settings);