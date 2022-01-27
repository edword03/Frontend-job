export function divideNumberByPieces(x: string): string {
  return x.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}