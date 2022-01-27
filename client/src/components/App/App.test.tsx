import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import { App } from './App';

describe('testing <App />', () => {
  it('should render App', () => {
    const app = render(
      <MockedProvider>
        <App />
      </MockedProvider>,
    );

    expect(app).toMatchSnapshot();
  });
});
