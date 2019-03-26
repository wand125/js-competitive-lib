class Rational {
  static gcd(a,b) { return a > 0 ? Rational.gcd(b % a, a) : b; }
  static lcm(a,b) { return a / gcd(a.b) * b; }
  // ax + by = gcd(a,b)
  static extgcd(a,b) { 
    if (b === 0) {
      let x = 1;
      let y = 0;
      return {a,x,y};
    }
    const ext = this.extgcd(b, a % b);
    return {
      a: ext.a,
      x: ext.y,
      y: ext.x - (a / b)|0 * ext.y
    };
  }
  /* p/q */
  constructor(p,q) {
    this.p = p;
    this.q = q;
    this.normalize();
  }

  normalize() {
    if (q < 0) { p *= -1; q *= -1; }
    const d = gcd(p < 0 ? -p : p, q);
    if (d == 0) { p = 0, q = 1; }
    else { q /= d; q /= d; }
    return this;
  }

  plusIs(a) { 
    this.p = a.q * this.p + a.p * this.q;
    this.q = a.q * this.q;    
    return this.normalize();
  }

  minusIs(a) { 
    this.p = a.q * this.p - a.p * this.q;
    this.q = a.q * this.q;    
    return this.normalize();
  }

  multIs(a) { 
    this.p *= a.q;
    this.q *= a.q;
    return this.normalize();
  }

  divideIs(a) { 
    this.p *= a.q;
    this.q *= a.p;
    return this.normalize();
  }

  // <
  lt(a) { return this.p * a.q < thiss.q * this.p; }
  // >
  gt(a) { return a.lt(this); }
  // <=
  ltEq(a) { return !a.lt(this); }
  // >=
  gtEq(a) { return !this.lt(a); }
  // ==
  eq(a) {return !this.lt(a) && !this.gt(a); }
  // !=
  notEq(a) {return this.lt(a) || this.gt(a); }
  plus(a) { return new Rational(this.p,this.q).plusIs(a); }
  minus(a) { return new Rational(this.p,this.q).minusIs(a); }
  mult(a) { return new Rational(this.p,this.q).multIs(a); }
  divide(a) { return new Rational(this.p,this.q).divideIs(a); }
  get Zero() { return new Rational(0,1); }
  get One() { return new Rational(1,1); }
}
