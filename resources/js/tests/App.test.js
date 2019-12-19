import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from "../components/Main";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

it('renders main', () => {
  const store = mockStore({});
  const wrapper = shallow(
    <Provider store={store}>
      <App />
    </Provider>
  );
});