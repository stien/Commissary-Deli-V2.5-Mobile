import {createSelector} from 'reselect';

export const Location = (state) => state.Locator;
export const LocationSelector = createSelector(Location, (data) => data.toJS());


export const settLocationstate = (state) => state.Locator;
export const setLocationSelector = createSelector(settLocationstate, (data) => data.toJS());