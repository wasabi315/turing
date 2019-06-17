class Graph {

  private adjList: Map<number, number[]>;

  constructor() {
    this.adjList = new Map();
  }

  addVertex(i: number): void {
    if(!this.adjList.has(i)) {
      this.adjList.set(i, []);
    }
  }

  deleteVertex(i: number): void {
    this.adjList.delete(i);
  }

  addEdge(i: number, j: number): void {
    if(this.adjList.has(i) && this.adjList.has(j)) {
      let vs = this.adjList.get(i).slice();
      vs.push(j);
      this.adjList.set(i, vs);
    }
  }

  removeEdge(i: number, j: number): void {
    if(this.adjList.has(i)) {
      const vs = this.adjList.get(i).filter(n => n !== j);
      this.adjList.set(i, vs);
    }
  }

}

export default Graph;
