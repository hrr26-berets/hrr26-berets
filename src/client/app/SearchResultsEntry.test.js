import React from 'react';
import SearchResultsEntry from './SearchResultsEntry.jsx';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

const testProps = {
  item: {
    name: 'best mouse ever with all these bells and whistles and LASER, special limited edition version three hundred forty three',
    image: 'best.jpeg',
    price: '63.99',
    itemId: 5,
    url: 'http://www.example.com'
  }
}

describe('SearchResultsEntry component', () => {
  const entry = shallow(<SearchResultsEntry {...testProps}/>)

  it('should have the product name that is less than 40 characters', () => {
    expect(entry.find('.item-title').text()).toBe(testProps.item.name.substring(0, 40))
  });

  it('should have the product image', () => {
    expect(entry.find('img').prop('src')).toBe(testProps.item.image)
  });

  it('should have the product price', () => {
    expect(entry.find('.item-price').text()).toBe('$' + testProps.item.price)
  });

  it('should show ProductDetails when product name is clicked', () => {
    entry.find('.item-title > a').simulate('click')
    expect(entry.state('showDetails')).toBe(true);
  });
});
