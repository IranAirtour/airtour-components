export function leftPad(number, targetLength): string {
  let output = number + '';
  while (output.length < targetLength) {
    output = '0' + output;
  }
  return output;
}

export function stringToBoolean(str: string): boolean {
  if (!str) {
    return false;
  }
  switch (str.toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true;
    case 'false':
    case 'no':
    case '0':
    case null:
      return false;
    default:
      return Boolean(str);
  }
}

export function stringify(value: any): string {
  return typeof value === 'string' ? value : JSON.stringify(value);
}
export function jsonParse(value: string): any {
  let data = null;
  try {
    if (value) {
      data = JSON.parse(value);
    }
  } catch (_) {}
  return data;
}
