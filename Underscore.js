/* Underscore.js の移植および便利メソッド群 */
class Underscore {
  sum(arr) { return arr.reduce((a,b)=>a+b); }
  min(arr, func) { if (func == null) {func = (a,b) => a - b} return arr.reduce((a,b) => func(a,b) < 0 ? a : b); }
  max(arr, func) { if (func == null) {func = (a,b) => a - b} return arr.reduce((a,b) => func(a,b) > 0 ? a : b); }
  sort(arr, func) { if (func == null) {func = (a,b) => a - b} return arr.sort(func) }
  range(start, stop, step) {
	if (stop == null) {
	  stop = start || 0;
	  start = 0;
	}
	if (!step) {
	  step = stop < start ? -1 : 1;
	}
	const length = Math.max(Math.ceil((stop - start) / step), 0);
	const range = Array(length);

	for (var idx = 0; idx < length; idx++, start += step) {
	  range[idx] = start;
	}
	return range;
  }

  first (array, n) {
    if (array == null || array.length < 1) return n == null ? void 0 : [];
    if (n == null) return array[0];
    return this.initial(array, array.length - n);
  };

  initial (array, n) { return array.slice.call(array, 0, Math.max(0, array.length - (n == null ? 1 : n))); }

  tail(array, n) { return array.slice.call(array, n == null ? 1 : n); }

  last (array, n) { 
    if (n == null) return array[array.length - 1];
    return this.tail(array, Math.max(0, array.length - n)); 
  }

  /* 累積和 */
  sumArray (arr) { return this.tail(arr.reduce(((a,b,i) => {a.push(b + a[i]); return a}), [0])); }

  binarySearch (array, key, iteratee) {
	const itr = (obj) => (typeof obj === 'object') ? obj[iteratee] : obj;
	const value = itr(obj);
	let low = 0, high = array.length;
	while (low < high) {
	  let mid = Math.floor((low + high) / 2);
	  if (itr(array[mid]) < value) low = mid + 1; else high = mid;
	}
	return low;
  };
}
const _ = new Underscore();
