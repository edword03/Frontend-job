import { divideNumberByPieces } from './index';

describe('test validate numbers', () => {
  it('should return string of numbers with spaces', () => {
    const mockNumber = '120000'

    expect(divideNumberByPieces(mockNumber)).toEqual('120 000')
  });
});
