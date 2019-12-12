import React, {Fragment} from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import history from "../history";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import Header from "./Header";
import Admin from "./Admin";
import Settings from "./Settings";
import BirthdaysList from "./birthday/BirthdaysList";
import BirthdayEdit from "./birthday/BirthdayEdit";
import BirthdayCreate from "./birthday/BirthdayCreate";
import Notificator from "./Notificator";
import { IntlProvider } from "react-intl";
import messages_en from "../translations/en.json";
import messages_ru from "../translations/ru.json";

const messages = {
  'en': messages_en,
  'ru': messages_ru
};

const App = (props) => {

  return (
    <Fragment>
      <Router history={history}>
        <IntlProvider locale={props.locale} messages={messages[props.locale]}>
          <ReactNotification />
          <Header />
          <Notificator />
          <Switch>
            <Route path="/" exact component={BirthdaysList} />
            <Route path="/birthday/new" exact component={BirthdayCreate} />
            <Route path="/birthday/:id/edit" exact component={BirthdayEdit} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/admin" exact component={Admin} />
          </Switch>
        </IntlProvider>
      </Router>
    </Fragment>
  );
};

const mapStateToProps = state => ({ locale: state.settings.language });

export default connect(mapStateToProps)(App);

