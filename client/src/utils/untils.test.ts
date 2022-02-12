import { divideNumberByPieces, deserializeQuery, serializeQuery } from './index';

describe('test validate numbers', () => {
  it('should return string of numbers with spaces', () => {
    const mockNumber = '120000';

    expect(divideNumberByPieces(mockNumber)).toEqual('120 000');
  });
});

describe('test deserialize queries', () => {
  it('should return object of queries', () => {
    const mockQuery = '?page=0&area=1';
    const objectQuery = {...deserializeQuery(mockQuery)};

    expect(objectQuery).toEqual({page: '0', area: '1'});
  });

  it('should return string of queries', () => {
    const mockQuery = '?page=0&area=1';
    const objectQuery = serializeQuery({...deserializeQuery(mockQuery)});

    expect(objectQuery).toEqual('?page=0&area=1');
  });
});
