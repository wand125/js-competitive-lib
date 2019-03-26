class Queue {
  constructor() {
    this._in = []
    this._out = [];
  }

  get length() {
    return this._in.length + this._out.length;
  }

  _fix() {
    this._out = this._in.reverse().concat(this._out);
    this._in = [];
  }

  toArray() {
    this._fix();
    return this._out.slice().reverse();
  }

  push(value) { this._in.push(value); }

  shift() {
    if (this._out.length === 0) this._fix();
    return this._out.pop();
  }

  get exist() { return this.length > 0; }
  get empty() { return this.length == 0; }
}
