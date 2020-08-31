import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from '../../src/components/App';



describe('rendering components', () => {
  it('renders App without crashing',() => {
    shallow(<App/>);
  });
  it('renders Header component without crashing', () => {
    const wrapper = shallow(<App/>);
    const header = shallow( <Header/>);
    expect(wrapper.contains(header)).toEqual(true);
  });
  it('renders Home component without crashing', () => {
    const wrapper = shallow(<App/>);
    const home = shallow(<Home />);
    expect(wrapper.contains(home)).toEqual(true);
  });

})

/*
import TestComponent from '../src/components/TestComponent/index';

describe('Test Component', () => {
  const wrapper = shallow(<TestComponent title="truc" />);
  // Pour tester un composant, on va se créer un "wrapper"
  // Un wrapper représente mon composant React rendu
  it('Should return the proper html if given a prop title', () => {
    expect(wrapper.contains('truc')).to.equal(true);
  });

  // Vérifier que le composant contient une div avec la classe container
  it('Should have a "container" class', () => {
    expect(wrapper.hasClass('container')).to.equal(true);
  });

  it('Should be a div', () => {
    expect(wrapper.is('div')).to.equal(true);
  });
});*/
