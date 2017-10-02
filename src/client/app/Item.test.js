import React from 'react';
import Item from './Item.jsx';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

const testProps = {
  product: {
    name: 'cookies',
    thumbnailImage: 'cookies.jpeg',
    salePrice: '$5.00'
  },
  onClick: jest.fn()
}

describe('Item component', () => {
  const item = shallow(<Item {...testProps}/>)
  it('should not explode', () => {
    expect(item).toBeDefined();
  });

  it('should have the product name', () => {
    expect(item.find('.item-title').text()).toBe(testProps.product.name)
  });

  it('should have the product image', () => {
    expect(item.find('img').prop('src')).toBe(testProps.product.thumbnailImage)
  });

  it('should have the product price', () => {
    expect(item.find('.item-price').text()).toBe(testProps.product.salePrice)
  });

  it('should call onClick when product image is clicked', () => {
    item.find('.item-image').simulate('click')
    expect(testProps.onClick.mock.calls.length).toBe(1)
  });
});