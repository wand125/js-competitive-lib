class Graph {
  constructor() { }
  from(edgeList, offset) {
    if (offset === 0) {
      this.edgeList = edgeList;
    }
    else {
      if (offset == null) {offset = 1;}
      this.edgeList = edgeList.map((e) => 
        [e[0] - offset, e[1] - offset]
      );
    }

    this.list = [];
    for (const n of this.edgeList) {
      this.list[n[0]]
      this.list[n[0]] = this.list[n[0]] ? this.list[n[0]] : [];
      this.list[n[1]] = this.list[n[1]] ? this.list[n[1]] : [];
      this.list[n[0]].push(n[1]);
      this.list[n[1]].push(n[0]);
    }
    return this;
  }

  calcBackward() {
    const used_v = [];
    const used_e = [];
    const ord = new Array(this.length).fill(0);
    const lowlink = new Array(this.length).fill(0);
    let k = 0;
    const dfs = (v) => {
      used_v[v] = true;
      ord[v] = lowlink[v] = k;
      ++k;
      for (const _v of this.list[v]) {
        if (!used_v[_v]) {
          used_e[v+','+_v] = true;
          dfs(_v);
          lowlink[v] = Math.min(lowlink[v],lowlink[_v]);
        }
        else if (!used_e[_v+','+v]) {
          // backward
          lowlink[v] = Math.min(lowlink[v], ord[_v]);
        }
      } 
    }
    dfs(0);
    this._lowlink = lowlink;
    this._ord = ord;
    this._bridges = this.edgeList.filter(e => ord[e[0]] < lowlink[e[1]]
    || ord[e[1]] < lowlink[e[0]]);
    // 関節点
    this._articulations = this.list.map((list,u) => list.some((v) => ord[v] < ord[u] && ord[u] <= lowlink[v]) || (u == 0 || list.length != 2) ? u : -1).filter(v => v >= 0);
  }

  get bridges() {
    if (this._bridges) {return this._bridges;}
    this.calcBackward();
    return this._bridges;
  }

  get lowlink() {
    if (this._lowlink) {return this._lowlink;}
    this.calcBackward();
    return this._lowlink;
  }

  get articulations() {
    if (this._articulations) {return this._articulations;}
    this.calcBackward();
    return this._articulations;
  }

  get ord() {
    if (this._ord) {return this._ord;}
    this.calcBackward();
    return this._ord;
  }

  get eSize() { return this.edgeList.length; } 
  get length() { return this.list.length; }

  get matrix() {
    if (this.matrix) {return this.matrix;}
    this.matrix = [];
    for (let i = 0; i < this.length; ++i) {
      for (let j = 0; j < this.length; ++j) {
        this.matrix[i][j] = 0;
      } 
    }

    for(const e1 in this.list) {
      const l = this.list[e1];
      for(const e2 of l) {
        this.matrix[e1][e2] = 1;
      }
    } 
    return this.matrix;
  }
}
