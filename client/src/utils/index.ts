export function divideNumberByPieces(x: string): string {
  return x.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

export const deserializeQuery = (query: string, noQuestionMark = false) => {
  const pairs = (noQuestionMark ? query : query.substring(1)).split('&');
  const array = pairs.map(elem => elem.split('='));
  return Object.fromEntries(array);
};

export const serializeQuery = (queryParams: string | URLSearchParams ) =>
  Object.entries(queryParams).reduce((acc, [key, value], index, array) => {
    if (typeof value === 'undefined') {
      return acc;
    }
    const postfix = index === array.length - 1 ? '' : '&';
    return `${acc}${encodeURIComponent(key)}=${value}${postfix}`;
  }, '?');

export const breakSpaces = (queryParam: string) => {
  return encodeURIComponent(queryParam.replace(/ |,|\(|\)|-/g, '-'))
}