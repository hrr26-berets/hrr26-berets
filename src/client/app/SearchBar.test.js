import React from 'react';
import SearchBar from './SearchBar.jsx';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

const testProps = {
  handleSearch: jest.fn()
};

describe('SearchBar component', () => {
  it('should run search on button click', () => {
    SearchBar.prototype.searchProducts = jest.fn();
    const spy = jest.spyOn(SearchBar.prototype, 'searchProducts');
    const wrapper = shallow(<SearchBar {...testProps}/>);
    wrapper.instance();
    wrapper.find('button .searchBtn').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should run search on form submit', () => {
    SearchBar.prototype.searchProducts = jest.fn();
    const spy = jest.spyOn(SearchBar.prototype, 'searchProducts');
    const wrapper = shallow(<SearchBar {...testProps}/>);
    wrapper.instance();
    wrapper.find('form').simulate('submit');
    expect(spy).toHaveBeenCalled();
  });

  it('should update the query stored in state on user input', () => {
    SearchBar.prototype.onSearch = jest.fn();
    const spy = jest.spyOn(SearchBar.prototype, 'onSearch');
    const wrapper = shallow(<SearchBar {...testProps}/>);
    wrapper.instance();
    wrapper.find('input').simulate('change');
    wrapper.find('input').simulate('change');
    wrapper.find('input').simulate('change');
    expect(spy).toHaveBeenCalledTimes(3);
  });
});
