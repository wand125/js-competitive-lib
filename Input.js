class Input {
  constructor() {
	this.cursor = 0;
	this.inputAll();
  }

  inputAll() {
	this.data = (require("fs").readFileSync("/dev/stdin", "utf8")).split('\n');
	return this.data;
  }

  /* 1行 or 複数行文字列 */
  nextLine(n) {
	if (n) {
	  const ret = this.data.slice(this.cursor, this.cursor + n);
	  this.cursor += n;
	  return ret;
	}
	return this.data[this.cursor++];
  }
  /* 一行文字配列 */
  nextStrArr() { return this.nextLine().split(' '); } 
  /* 一行整数配列 */
  nextIntArr() { return this.nextStrArr().map((e) => parseInt(e)); }
  /* 一行浮動小数点配列 */
  nextFloatArr() { return this.nextStrArr().map((e) => parseFloat(e)); }
  /* 複数行整数配列 */
  nextIntLine(n) { return this.nextLine(n).map((e) => parseInt(e)) }
  /* 複数行浮動小数点配列 */
  nextFloatLine(n) { return this.nextLine(n).map((e) => parseFloat(e)) }
  /* 複数行文字列二次元配列 */
  nextStrRange(n) { return this.nextLine(n).map((line) => line.split(' ')); }
  /* 複数行整数二次元配列 */
  nextIntRange(n) {
	return this.nextLine(n).map((line) => line.split(' ').map((e) => parseInt(e)));
  }
  /* 複数行浮動小数点数二次元配列 */
  nextFloatRange(n) {
	return this.nextLine(n).map((line) => line.split(' ').map((e) => parseFloat(e)));
  }
} 
