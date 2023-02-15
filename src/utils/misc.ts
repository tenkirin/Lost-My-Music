export const cls = (...classNames: unknown[]) => classNames.filter(Boolean).join(' ');

export const getFileName: (name: string) => string = filename => filename.slice(
  filename.lastIndexOf('/') + 1,
  filename.lastIndexOf('.', filename.lastIndexOf('.') - 1), // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf#parameters
);
