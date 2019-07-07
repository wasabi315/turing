import * as React from 'react';
import { observable } from 'mobx';

import Graph from '../../lib/Graph';

class GraphStore {

  @observable
  graph = new Graph()

}

const GraphStoreContext = React.createContext(new GraphStore());

export default GraphStoreContext;
