import React from 'react';
import expect from 'chai';
import { shallow } from 'enzyme';
import App from '../src/components/App';
import Header from '../src/components/Header';

describe('rendering components', () => {
  it('renders App without crashing', () => {
    shallow(<App />);
  });
  it('renders Header component without crashing', () => {
    const wrapper = shallow(<App />);
    const header = shallow(<Header />);
    expect(wrapper.contains(header).toEqual(true));
  });
});
