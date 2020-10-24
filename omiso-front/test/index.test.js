import React from 'react';
import { expect } from 'chai';

import { shallow } from 'enzyme';

import ItemMenu from '../src/components/SectionMenu/ItemMenu/ItemMenu';

describe('Test ItemMenu', () => {
  const wrapper = shallow(<ItemMenu data={{}} />);

  it('Should have table ', () => {
    expect(wrapper.contains([])).to.equal(true);
  });

  it('Should have a "ItemMenu" class', () => {
    expect(wrapper.hasClass('ItemMenu')).to.equal(true);
  });
});
