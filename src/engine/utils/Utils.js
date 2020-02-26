// @flow

export function assert(expression: boolean, message: string) {
  if (!expression) {
    throw new Error(message);
  }
}

export function getValue<T>(defaultValue: T, value: ?T): T {
  if (value != null) {
    assert(typeof defaultValue === typeof value, 'Types not matching');
    return value;
  }
  return defaultValue;
}
