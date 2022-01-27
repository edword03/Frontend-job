import { act, render, screen } from '@testing-library/react';
import { Dropdown } from './Dropdown';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('testing <Dropdown />', () => {
  const options = [
    {
      id: 'full',
      value: 'Полная занятость',
    },
    {
      id: 'part',
      value: 'Частичная занятость',
    },
    {
      id: 'project',
      value: 'Проектная работа',
    },
    {
      id: 'probation',
      value: 'Стажировка',
    },
  ];
  const onChange = jest.fn();

  it('should render Dropdown', () => {
    const { getByText } = render(
      <Dropdown onChangeStateValue={onChange} options={options} />,
    );

    expect(getByText(/Полная занятость/i)).toBeTruthy();
  });

  it('should open dropdown list', () => {
    const { getByRole, getByText } = render(
      <Dropdown onChangeStateValue={onChange} options={options} />,
    );
    act(() => userEvent.click(getByText(/Полная занятость/i)));

    const optionList = screen.getByRole('list')

    expect(optionList).toBeInTheDocument();
    screen.debug(getByRole('list'));
  });
});
