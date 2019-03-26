class Combinatorics {

  constructor(mod) {
    if (mod == null) {
      mod = Combinatorics.DefaultMod;
    }
    this.mod = mod;
  }

  mult(a,b) {
    let ret = 0;
    a %= this.mod;
    b %= this.mod;

    while (b) {
      if (b&1) {
        ret += a;
        if (ret > this.mod) { ret -= this.mod; }
      }
      a <<= 1;
      if (a > this.mod) { a -= this.mod; }
      b >>= 1;
    }
    return ret;
  }

  pow(a,b) {
    let ret = 1;
    while(b) {
      if (b&1) {
        ret = this.mult(ret,a);
      }
      a = this.mult(a,a);
      b >>= 1;
    }
    return ret;
  }

  c(n,m) {

  }

  p(n,m) {
    let ret = 1;
    for (let i = 0;i < m; ++i) {
      ret *= (n-i);
      if (this.mod) {
        ret %= this.mod;
      }
    }
    return ret;
  }

  fact(n) {
    let ret = 1;
    for (let i = 1;i <= n; ++i) {
      ret = this.mult(ret,i);
    }
    return ret;
  }

  static get DefaultMod() {
    return 1e9+7;
  } 
}
