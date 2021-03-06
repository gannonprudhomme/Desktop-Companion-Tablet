import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { Provider } from 'react-redux';

import { createStore } from 'redux';
import dctReducer from '../../../redux/reducer';
import TopRow from '../../../components/TopRow/TopRow';

describe('TopRow', () => {
  test('renders without errors', () => {
    // arrange/act
    const store = createStore(dctReducer);

    // Need to mock socket.emit b/c of WeatherDisplay

    const container = render(
      <Provider store={store}>
        <TopRow />
      </Provider>,
    );

    // assert
    expect(container).toBeTruthy();
  });
});
