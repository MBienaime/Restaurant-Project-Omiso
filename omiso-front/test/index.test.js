import React from 'react';
import { expect } from 'chai';

import { shallow } from 'enzyme';

import ItemMenu from '../src/components/SectionMenu/ItemMenu/ItemMenu';
import App from '../src/components/App';

describe('Test component <ItemMenu />', () => {
  const wrapper = shallow(<ItemMenu data={{
    name: 'Suhsi Test', category: 'category test', description: 'description test', price: '12', urlImage:"http://#"
  }}
  />);

  describe('Test component <ItemMenu />', () => {
    it('Should have Contains category', () => {
      expect(wrapper.contains('category test')).to.equal(true);
    });
    it('Should have Contains description', () => {
      expect(wrapper.contains('description test')).to.equal(true);
    });
    it('Should have Contains price', () => {
      expect(wrapper.contains('12')).to.equal(true);
    });
    it('Should have Contains name', () => {
      expect(wrapper.contains('Suhsi Test')).to.equal(true);
    });
    it('Should have Contains div img ', () => {
      expect(wrapper.find('img').exists()).to.equal(true);
    });
  });
  describe('CSS <ItemMenu />', () => {
    it('Should have a "ItemMenu" class', () => {
      expect(wrapper.hasClass('ItemMenu')).to.equal(true);
    });
    it('Should have a div img and "ItemMenuPhoto" class', () => {
      expect(wrapper.find('img').hasClass('ItemMenuPhoto')).to.equal(true);
    });
  });
});

describe('Test compoment <APP/>', () => {
  const wrapperAPP = shallow(<App />);

  it('Should have a component <Navigation />', () => {
    expect(wrapperAPP.find('Navigation').exists()).to.equal(true);
  });
  it('Should have a component <Home />', () => {
    expect(wrapperAPP.find('Home').exists()).to.equal(true);
  });
  it('Should have a component <Connection />', () => {
    expect(wrapperAPP.find('Connection').exists()).to.equal(true);
  });
  it('Should have a component <Cart />', () => {
    expect(wrapperAPP.find('Cart').exists()).to.equal(true);
  });
  it('Should have a component <ProtectedRoute />', () => {
    expect(wrapperAPP.find('ProtectedRoute').exists()).to.equal(true);
  });
});
