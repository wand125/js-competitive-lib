class Bfs {
  constructor() {
    this.memo = [];
    this.toKey = (e) => JSON.stringify(e);
  }

  initialElem(e) {
    if (e == null) { return this.initialElem; }
    this.initialElem = e;
    return this;
  }

  finalElem(e) {
    if (e == null) { return this.finalElem; }
    this.finalElem = e;
    this.finalElemKey = this.toKey(e);
    return this;
  }

  check(func) {
    if (func == null) { return this.checkFunc; }
    this.checkFunc = func;
    return this;
  }

  next(func) {
    if (func == null) { return this.nextFunc; }
    this.nextFunc = func;
    return this;
  }

  search() {
    const queue = new Queue();
    queue.push([0,this.initialElem])
    while(queue.exist) {
      const p = queue.shift();
      if (this.isFinal(p[1])) { break; }
      const nexts = this.nextFunc(p[1]);
      for (const next of nexts) {
        if (!this.checkFunc(next)) continue;
        if (this.getMemo(next) !== undefined) continue;
        queue.push([p[0] + 1, next]);
        this.setMemo(next,p[0] + 1);
      }
    }
    if (this.finalElem) { return this.getMemo(this.finalElem); }
    return this;
  }

  isFinal(e) { return this.toKey(e) === this.finalElemKey; }
  getMemo(e) { return this.memo[this.toKey(e)]; }
  setMemo(e,depth) { this.memo[this.toKey(e)] = depth; }
}
