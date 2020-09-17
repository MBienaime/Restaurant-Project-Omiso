import React from 'react';
import expect from 'chai';
import { shallow } from 'enzyme';




describe.skip('test simple',()=>{

})


describe('rendering components', () => {
  it('renders App without crashing',() => {
    shallow(<App/>);
  });
  it('renders Header component without crashing', () => {
    const wrapper = shallow(<App/>);
    const header = shallow( <Header/>);
    expect(wrapper.contains(header)).toEqual(true);
  });
})


