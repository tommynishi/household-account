export const mnyYen = (props: number):string => {
  return String(props).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}