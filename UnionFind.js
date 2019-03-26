class UnionFind {
  constructor(n) {
    this.ref = [];
    this.count = [];
    for (let i = 0;i < n; ++i) {
      this.ref[i] = i;
      this.count[i] = 1;
    }
  }

  root(x) {
    if (this.ref[x] == x) return x;
    return this.ref[x] = this.root(this.ref[x]);
  }

  size(x) {
    return this.count[this.root(x)];
  }

  unite(x, y) { // xとyの木を併合
    const rx = this.root(x);
    const ry = this.root(y);
    if (rx == ry) return; //xとyの根が同じ(=同じ木にある)時はそのまま
    this.ref[Math.max(rx,ry)] = Math.min(rx,ry); //xとyの根が同じでない(=同じ木にない)時, rx,ryの小さい方を根とする
    this.count[Math.min(rx,ry)] = this.count[rx] + this.count[ry]; 
  }

  same(x, y) { // 2つのデータx, yが属する木が同じならtrueを返す
    const rx = this.root(x);
    const ry = this.root(y);
    return rx == ry;
  } 
}
