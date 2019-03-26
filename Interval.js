class Interval {
  /* 関数が最後にtrueになる整数値を返します */
  /* reverse = trueの場合,最初にtrueになる整数値を返します */
  static findIntBoundary(lower,upper,func,reverse) {
    if (reverse == null) { reverse = false; }
    if (upper - lower <= 1) { return reverse ? upper : lower; }
    const mid = ((lower + upper) / 2)|0;
    if (func(mid) !== reverse) { return Interval.findIntBoundary(mid,upper,func,reverse); }
    return Interval.findIntBoundary(lower,mid,func,reverse);
  }

  /* 関数が最後にtrueになる浮動小数点値を返します */
  static findFloatBoundary(lower,upper,eps,func, reverse) {
    if (reverse == null) { reverse = false; }
    if (upper - lower < eps) { return (lower + upper) / 2; }
    const mid = ((lower + upper) / 2);
    if (func(mid) !== reverse) { return Interval.floatBinSearch(mid,upper,eps,func); }
    return Interval.floatBinSearch(lower,mid,eps,func);
  }
}
