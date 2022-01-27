import React from 'react';
import { Header } from './Header';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

describe('test Header component', () => {
  const setSearchPage = jest.fn();
  const setFeaturedPage = jest.fn();

  const props = { currentPage: 'searchPage', setSearchPage, setFeaturedPage };

  it('should', () => {
    const { getByText } = render(<Header {...props} />);

    userEvent.click(getByText(/поиск вакансий/i))
    expect(setSearchPage).toHaveBeenCalledTimes(1)

    userEvent.click(getByText(/Избранные вакансии/i))
    expect(setFeaturedPage).toHaveBeenCalledTimes(1)
  });
}); 
