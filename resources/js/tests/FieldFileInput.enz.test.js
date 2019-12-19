import React from "react";
import renderer from "react-test-renderer";
import FieldFileInput from "../components/FieldFileInput";
import { mount } from 'enzyme';

const list = ['a', 'b', 'c'];
describe('FieldF', () => {
  describe('Reducer', () => {
  //...
  });
  test('snapshot renders', () => {
    const component = renderer.create(<FieldFileInput label="LAB" />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    //expect(tree.text()).toEqual('LAB');
  });
  it('renders the inner Counter', () => {
    const wrapper = mount(<FieldFileInput label="LAB" />);
    //expect(wrapper.find(Counter).length).toEqual(1);
  });
});
describe('Counter', () => {
//...
});