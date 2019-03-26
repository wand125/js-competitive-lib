// verified: AtCoder ABC116D
/* ２分木による最大ヒープ */
class BinaryHeap {
  constructor() {
    this._data = [];
    this._length = 0;
  }

  /* データ追加 priority value */
  push(priority, value) {
    const data = this._data;
    data.push({p: priority, v: value});
    let i = this._length;
    let p = (i - 1) >> 1; // parent
    // up heap
    while (p >= 0 && data[p].p < data[i].p) {
      const tmp = data[i]; data[i] = data[p]; data[p] = tmp;
      i = p;
      p = (i - 1) >> 1;
    }
    ++this._length;
  }

  /* データ取出 */
  pop() {
    if (this.length <= 0) {
      return null;
    }
    const length = this._length - 1;
    const data = this._data;
    const _top = this.top;
    data[0] = data[length];
    data.pop();
    let i = 0;
    let c1 = (i<<1) + 1; let c2 = (i<<1) + 2;
    // down heap
    let p0,p1,p2;
    while(c1 < length) {
      if (c2 < length) {
        // both child exists
        p0 = data[i].p; p1 = data[c1].p; p2 = data[c2].p;
        if ((p1 < p2) && (p0 < p2)) {
          // swap 0 & 2
          const tmp = data[i]; data[i] = data[c2]; data[c2] = tmp;
          i = c2;
        }
        else {
          // swap 0 & 1 
          const tmp = data[i]; data[i] = data[c1]; data[c1] = tmp;
          i = c1;
        }
        c1 = (i<<1) + 1; c2 = (i<<1) + 2;
      }
      else {
        // right child not exists
        p0 = data[i].p; p1 = data[c1].p;
        if (p0 < p1) {
          // swap
          const tmp = data[i]; data[i] = data[c1]; data[c1] = tmp;
        }
        break;
      }
    }

    this._length = length;
    return _top;
  }

  /* 最大の要素 */
  get top() {
    return this._data[0].v;
  }

  /* 要素数 */
  get length() {
    return this._length;
  } 
}
