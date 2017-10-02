import React from 'react';
import Item from './Item.jsx';
import { shallow } from 'enzyme';

test('Jest works', () => {
  expect(true).toBe(true);
})
//assert text in .item-title matches props.product.name
//assert image matches props.product.thumbnailImage
//assert text in .item-price matches props.product.salePrice
//assert onClick is called