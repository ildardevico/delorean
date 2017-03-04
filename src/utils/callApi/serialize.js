// @flow
export default function serialize(data: {[key: string]: any}, prefix?: string): string {
  const body = [];
  if (data) {
    Object.keys(data).forEach(key => {
      const value = data[key];
      const name = prefix ? `${prefix}[${key}]` : key;
      if (typeof value === 'object') {
        body.push(serialize(value, name));
      } else {
        body.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
      }
    });
  }

  return body.join('&');
}
