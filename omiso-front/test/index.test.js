import React from 'react';
import expect from 'chai';
import { shallow } from 'enzyme';
import App from '../src/components/App';
import Navigation from '../src/components/Navigation';

describe('rendering components', () => {
  it('renders App without crashing', () => {
    shallow(<App />);
  });
  it('renders Navigation component without crashing', () => {
    shallow(<Navigation />);
  });
});
