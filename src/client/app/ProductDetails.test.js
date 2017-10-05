import React from 'react';
import ProductDetails from './ProductDetails.jsx';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

const testProps = {
  itemId: 55731619,
  itemUrl: 'http://c.affil.walmart.com/t/api01?l=https%3A%2F%2Fwww.walmart.com%2Fip%2FLenovo-ideapad-320-15-6-Laptop-Windows-10-Intel-Celeron-N3350-Dual-Core-Processor-4GB-RAM-1TB-Hard-Drive-Plum-Purple%2F55731619%3Faffp1%3DV0OkussvRn6ZTCyr4Q2wWe0PvIK_IpXRhtB1gyO6U00%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi'
}

describe('ProductDetails component', () => {
  it('should call getItemDetails once the component mounts', () => {
    ProductDetails.prototype.getItemDetails = jest.fn();
    const spy = jest.spyOn(ProductDetails.prototype, 'getItemDetails');
    const wrapper = shallow(<ProductDetails {...testProps} />);
    wrapper.instance();
    expect(spy).toHaveBeenCalled();
  });

  it('should hide product details template if the get request has not fetched data', () => {
    const wrapper = shallow(<ProductDetails {...testProps} />);
    expect(wrapper.find('div > div').text()).toBe('Loading...');
  });
})
