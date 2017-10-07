import React from 'react';
import SearchResults from './SearchResults.jsx';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

const testProps = {
  currentList: [],
  results: [
    {
      name: 'tiny mouse',
      thumbnailImage: 'tiny.jpeg',
      salePrice: '30.00',
      itemId: 1
    },
    {
      name: 'medium mouse',
      thumbnailImage: 'medium.jpeg',
      salePrice: '45.00',
      itemId: 2
    },
    {
      name: 'laser mouse',
      thumbnailImage: 'laser.jpeg',
      salePrice: '51.50',
      itemId: 3
    },
    {
      name: 'awesome mouse',
      thumbnailImage: 'awesome.jpeg',
      salePrice: '54.00',
      itemId: 4
    },
    {
      name: 'best mouse',
      thumbnailImage: 'best.jpeg',
      salePrice: '63.99',
      itemId: 5
    }
  ],
  addToList: jest.fn()
};

const emptyProps = {
  currentList: [],
  results: [],
  addToList: jest.fn()
};

describe('SearchResults component', () => {
  const results = shallow(<SearchResults {...testProps}/>);
  const noResults = shallow(<SearchResults {...emptyProps}/>);

  it('should render each result using the ListItem component', () => {
    expect((results).find('ListItem').length).toBe(testProps.results.length);
  });

  // We'll modify this test with whatever we decide to render if no results are fetched.
  it('should not render ListItem component if no results are fetched', () => {
    expect((noResults).find('ListItem').length).toBe(0);
  });
});
