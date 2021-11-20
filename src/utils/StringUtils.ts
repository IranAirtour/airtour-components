export function leftPad(number, targetLength): string {
  let output = number + '';
  while (output.length < targetLength) {
    output = '0' + output;
  }
  return output;
}
