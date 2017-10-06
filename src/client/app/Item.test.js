import React from 'react';
import Item from './Item.jsx';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

const testProps = {
  item: {
    name: 'cookies',
    thumbnailImage: 'cookies.jpeg',
    salePrice: '5.00',
    itemId: 1
  },
  onClick: jest.fn()
};

describe('Item component', () => {
  const item = shallow(<Item {...testProps}/>);
  it('should not explode', () => {
    expect(item).toBeDefined();
  });

  it('should have the product name', () => {
    expect(item.find('.item-title').text()).toBe(testProps.item.name);
  });

  it('should have the product image', () => {
    expect(item.find('img').prop('src')).toBe(testProps.item.thumbnailImage);
  });

  it('should have the product price', () => {
    expect(item.find('.item-price').text()).toBe('$' + testProps.item.salePrice);
  });

  it('should show ProductDetails when product image is clicked', () => {
    item.find('img').simulate('click');
    expect(item.state('showDetails')).toBe(true);
  });
});
