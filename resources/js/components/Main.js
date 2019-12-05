import React, {Fragment} from 'react';
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";

import Header from "./Header";
import Admin from "./Admin";
import Settings from "./Settings";
import BirthdaysList from "./birthday/BirthdaysList";
import BirthdayEdit from "./birthday/BirthdayEdit";
import BirthdayCreate from "./birthday/BirthdayCreate";
import BirthdayDelete from "./birthday/BirthdayDelete";

const App = () => {
  return (
    <Fragment>
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={BirthdaysList} />
          <Route path="/birthday/new" exact component={BirthdayCreate} />
          <Route path="/birthday/:id/edit" exact component={BirthdayEdit} />
          <Route path="/birthday/:id/delete" exact component={BirthdayDelete} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/admin" exact component={Admin} />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;

