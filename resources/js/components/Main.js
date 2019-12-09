import React, {Fragment} from 'react';
import { Router, Route, Switch } from "react-router-dom";
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

const App = () => {

  return (
    <Fragment>
      <Router history={history}>
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
      </Router>
    </Fragment>
  );
};

export default App;

