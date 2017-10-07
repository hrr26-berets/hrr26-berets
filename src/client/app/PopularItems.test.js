import React from 'react';
import PopularItems from './PopularItems.jsx';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });


const testProps = {
  currentList: [],
  products: [{
    name: 'marshmallow',
    image: 'm.jpeg',
    price: '$3.00',
    itemId: 1
  }, {
    name: 'chocolate',
    image: 'choc.jpeg',
    price: '$4.00',
    itemId: 2
  }, {
    name: 'graham crackers',
    image: 'gc.jpeg',
    price: '$3.50',
    itemId: 3
  }],
  onClick: jest.fn()
};

const emptyProps = {
  currentList: [],
  products: [],
  onClick: jest.fn()
};

describe('PopularItems component', () => {
  const popular = shallow(<PopularItems {...testProps}/>);
  const boring = shallow(<PopularItems {...emptyProps}/>);
  // console.log(node)
  it('should render an Item to the page for each item in props', () => {
    expect((popular).find('ListItem').length).toBe(testProps.products.length);
    expect((boring).find('ListItem').length).toBe(0);
    // expect((node).find('.item-title').text()).toBe(testProps.products[2].name)

  });
  it('should not explode if no props are passed to it', () => {
    const unpopular = shallow(<PopularItems />);
    expect((unpopular)).toBeDefined();
    expect((unpopular).text()).toBe('No products here!');
  });
});
