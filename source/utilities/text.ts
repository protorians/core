export function safeString(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&apos;')
    .replace(/"/g, '&quot;')
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')
}

export function unSafeString(text: string) {
  return text
    .replace(/&amp/g, '&')
    .replace(/&apos/g, "'")
    .replace(/&quot/g, '"')
    .replace(/&gt/g, '>')
    .replace(/&lt/g, '<')
}

export function addSlashes(text: string) {
  return text.replace(new RegExp("'", 'g'), "\\'")
}

export function stripSlashes(text: string) {
  return text.replace(new RegExp("\\'", 'g'), "'")
}

export function unCamelCase(value: string, separator = '-'): string {
  return (`${value[0].toLowerCase()}${value.substring(1)}`)
    .replace(/([A-Z])/g, `${separator}$&`)
    .toLowerCase();
}

export function camelCase(value: string) {
  return value.replace(/(?:^\w|[A-Z]|\b\w)/g, (text, index) =>
    index === 0 ? text.toLowerCase() : text.toUpperCase(),
  ).replace(/\s+/g, '');
}

export function fixExponent(x: number) {
  let value = `${x}`
  if (Math.abs(x) < 1.0) {
    let e = parseInt(x.toString().split('e-')[1])
    if (e) {
      x *= Math.pow(10, e - 1);
      value = `0.${new Array(e).join('0')}${x.toString().substring(2)}`
    }
  } else {
    let e = parseInt(x.toString().split('+')[1])
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e)
      value = `${x}${(new Array(e + 1)).join('0')}`
    }
  }
  return value;
}

export function slugify(str: string): string {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  const from = "ãàáäâáº½èéëêìíïîõòóöôùúüûñç·/_,:;";
  const to = "aaaaaeeeeeiiiiooooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return str;
}
