import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import ''
import { Header } from './Header';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('test Header component', () => {

  it('should render links in the document', () => {
    const { getByText } = render(<BrowserRouter><Header /></BrowserRouter>);
    expect(getByText(/поиск вакансий/i)).toBeInTheDocument()
    expect(getByText(/избранные вакансии/i)).toBeInTheDocument()
  });
}); 
