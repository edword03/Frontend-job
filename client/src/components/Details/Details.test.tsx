import { render, screen, RenderResult } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';
import { DETAILS_INFO } from '../../schemas';
import { Details } from './Details';

describe('testing <Details />', () => {
  const mock = {
    request: {
      query: DETAILS_INFO,
      variables: { id: '51703416' },
    },
    result: {
      data: {
        vacancyItem: {
          id: '51703416',
          name: 'Junior Frontend разработчик',
          experience: { name: 'Нет опыта' },
        },
      },
    },
  };
  let wrapper: RenderResult;

  beforeEach(
    async() =>
      (wrapper = await render(
        <MockedProvider mocks={[mock]} addTypename={false}>
          <Details />
        </MockedProvider>,
      )),
  );

  it('should render Details component', () => {
    screen.debug();
    expect(wrapper).toMatchSnapshot();
  });

  it('should have error', async () => {
    await act(async() => await new Promise(resolve => setTimeout(resolve, 0)))

    screen.debug();
    expect(await wrapper.findByText(/Ошибка запроса/i)).toBeTruthy();
  });
});
