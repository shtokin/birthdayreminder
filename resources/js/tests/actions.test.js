import { signIn } from "../actions";
import { SIGN_IN } from "../actions/types";

describe('sign in action', () => {
  it('should create an action to add a todo', () => {
    const user = 'test user';
    const expectedAction = {
      type: SIGN_IN,
      payload: user
    };
    expect(signIn(user)).toEqual(expectedAction)
  })
});