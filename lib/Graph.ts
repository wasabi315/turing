import { observable } from 'mobx';

class Graph {

  @observable
  private adjList: Map<number, number[]>;

  @observable
  private ix: number;

  constructor() {
    this.adjList = new Map();
    this.ix = 0;
  }

  nextIx(): number {
    return this.ix;
  }

  addNode(i: number): Graph {
    if(!this.adjList.has(i)) {
      this.adjList.set(i, []);
      this.ix++;
    }
    return this;
  }

  deleteNode(i: number): Graph {
    this.adjList.delete(i);
    return this;
  }

  addEdge(i: number, j: number): Graph {
    if(this.adjList.has(i) && this.adjList.has(j)) {
      const vs = this.adjList.get(i);
      if(vs) {
        vs.push(j);
        this.adjList.set(i, vs);
      }
    }
    return this;
  }

  removeEdge(i: number, j: number): Graph {
    if(this.adjList.has(i)) {
      const vs = this.adjList.get(i);
      if(vs) {
        this.adjList.set(i, vs.filter(n => n !== j));
      }
    }
    return this;
  }

  *edges(): IterableIterator<[number, number]> {
    for(const [i, is] of this.adjList.entries()) {
      for(const j of is.values()) {
        yield [i, j];
      }
    }
  }

}

export default Graph;
