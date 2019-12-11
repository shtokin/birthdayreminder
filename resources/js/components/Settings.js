import React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { languageList } from './languageList';
import { fetchSettings, saveLanguage, saveTheme } from '../actions'

class Settings extends React.Component {

  componentDidMount() {
    console.log('did', this.props);
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
        <label>Language</label>
        <Dropdown
          placeholder='Select Language'
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
        <label>Theme</label>
        <Dropdown
          placeholder='Select Theme'
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
        <h3>Settings</h3>
        {this.renderLanguage()}
        {this.renderTheme()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.settings.language,
    theme: state.settings.theme
  }
};

export default connect(mapStateToProps, { fetchSettings, saveLanguage, saveTheme })(Settings);