import React from 'react';
import ListItem from './ListItem.jsx';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

const testProps = {
  product: {
    name: 'this really cool thing',
    image: 'coolthing.jpg',
    price: 5.99,
    url: 'http://www.getithere.com'
  },
  removeItem: jest.fn()
};

describe('ListItem component', () => {
  const wrapper = shallow(<ListItem {...testProps} />);

  it('should remove item when Remove From List is clicked', () => {
    wrapper.instance();
    wrapper.find('.btn .btn-default').simulate('click');
    expect(testProps.removeItem).toHaveBeenCalled();
  });

  it('should have the product image', () => {
    expect(wrapper.find('img').prop('src')).toBe(testProps.product.image);
  });
});
