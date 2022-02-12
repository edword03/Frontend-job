import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import { App } from './App';

describe('testing <App />', () => {
  it('should render App', () => {
    const app = render(
      <BrowserRouter>
        <MockedProvider>
          <App />
        </MockedProvider>
      </BrowserRouter>,
    );

    expect(app).toMatchSnapshot();
  });
});
