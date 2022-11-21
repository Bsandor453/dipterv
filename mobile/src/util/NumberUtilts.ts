export const setFloat = (v, fun): void => {
  if (v.length === 0) {
    fun(v);
    return;
  }
  if (v.length > 1 && v[0] === '0' && v[1] !== '.') v = v.slice(1);
  if (v.match(/\./g)?.length > 1) return;
  if (/\d|\./.test(v[v.length - 1])) {
    fun(v);
  }
};
