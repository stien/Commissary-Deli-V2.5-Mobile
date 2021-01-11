import * as Actions from './constants';

/**
 * Fetch Categories
 * @returns {{type: string}}
 */
export function fetchCategories() {
  console.log('Fetch Category')
  return {
    type: Actions.GET_CATEGORIES,
  };
}
