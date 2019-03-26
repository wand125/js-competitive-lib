class LongLong {
  constructor(n) {
    this.number = [];
    this.number[0] = n & 0xffff;
    this.number[1] = (n & 0xffff0000) >>> 4;
  }

  sign(n) {
    return n >= 0;
  }

  plus(n) {
    if (n instanceof LongLong) {
      for (let i = 0; i < this.number.length; ++i) {
        this.number[i] += n.number[i];
      }
    }
    else {
      this.number[0] += n & 0xffff;
      this.number[1] += (n & 0xffff0000) >>> 4;
    }
    return this.normalize();
  }

  minus(n) {
    return this.plus(-n);
  }

  mult(n) {
    console.log(this.number);
    this.number[0] *= n;
    this.number[1] *= n;
    return this.normalize();
  }

  normalize() {
    for (let i = 0; i < n; ++i) {
      const overflow = this.number[i]>>>4;
      if (overflow > 0) {
        this.number[i + 1] = (this.number[i+1] === undefined ? 0 : this.number[i+1]) + overflow
      }
      this.number[i] = this.number[i] & 0xffff;
    }
    return this;
  }

  toString() {
    const ret = [];
    let retSize = 100000;
    let numSize = 0xffff;



  }
}

const ll = (n) => new LongLong(n);
console.log(ll(4).plus(5).toString());
console.log(ll(4).plus(ll(5)).toString());
console.log(ll(100000000).mult(1000).toString());
