import renderer from "react-test-renderer";
import FieldFileInput from "../components/FieldFileInput";
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from "react";

//configure({ adapter: new Adapter() });

describe('FieldFileInput', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<FieldFileInput />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // const checkbox = shallow(<FieldFileInput label="LAB" />);
    //
    // expect(checkbox.text()).toEqual('LAB');

    //checkbox.find('input').simulate('change');

    //expect(checkbox.text()).toEqual('On');

  });
});