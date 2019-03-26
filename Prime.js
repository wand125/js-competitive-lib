class Prime {
  /* 初期化と素数テーブル生成 */
  constructor(n = 100000) {
    const primeTable = [...((new Array(n)).keys())];
    primeTable[0] = false;
    primeTable[1] = false;
    let max = Math.sqrt(n);
    for(let i = 2;i <= max;++i) {
      if (primeTable[i] !== i) continue;
      for (let j = i * i; j < n; j += i) {
        if (primeTable[j] !== j) continue;
        primeTable[j] = i;
      }
    }
    this.size = n;
    this.primeTable = primeTable;
    this.primeList = primeTable.filter((e,i) => e === i);
  }

  /* テーブルに生成した素数の2乗までの素数判定 */
  isPrime(n) {
    if (n < this.size) return this.primeTable[n] === n;
    let max = Math.sqrt(n);
    for (let i = 0; this.primeList[i] <= max; ++i) {
      if (n % this.primeList[i] === 0) return false;
    }
    return true;
  }

  /* 最小の素因数 */
  getMinimumFactor(n) {
    if (n < this.size) return this.primeTable[n];
    let max = Math.sqrt(n);
    for (let i = 0; this.primeList[i] <= max; ++i) {
      if (n % this.primeList[i] === 0) return this.primeList[i];
    }
    return n;
  }

  /* 素因数の取得
   * 上限: テーブルサイズの二乗*/
  getFactor(n) {
    const ret = [];
    let k = n;
    while(!this.isPrime(k)) {
      const p = this.getMinimumFactor(k)
      ret.push(p);
      k /= p;
    }
    ret.push(k);
    return ret;
  }

  /* 素因数テーブル
   * 上限: テーブルサイズ*/
  getFactorTable(n) {
    const factor = this.getFactor(n);
    const maxFactor = factor[factor.length - 1];
    const ret = [];
    for (let i = 0;this.primeList[i] <= maxFactor; ++i) {
      ret[this.primeList[i]] = 0;
    }
    for (const e of factor) { ++ret[e]; }
    return ret;
  }
  
  /* 約数の個数 */
  getDivisorCount(n) {
    const factor = this.getFactor(n);
    let count = 1;
    let prev = factor[0];
    let factorCount = [];
    for (let i = 1; i < factor.length; ++i) {
      if (factor[i] != prev) {
        factorCount.push(count);
        count = 1;
      }
      else {
        ++count;
      }
      prev = factor[i];
    }
    factorCount.push(count);
    return factorCount.reduce((a,b)=>a * (b+1),1);
  }

  /* 約数の一覧の取得(未ソート) O(√n)*/
  static getDivisors(n) {
    let max = Math.sqrt(n);
    let ret = [];
    if (n % max === 0) {ret.push(max);}
    for(let i = 0; i < max; ++i) {
      if (n % i == 0) {
        ret.push(i);
        ret.push(n / i);
      }
    }
    return ret;
  }
}

const prime = new Prime(1000);
