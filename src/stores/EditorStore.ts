import * as React from 'react';
import { observable } from 'mobx';
import { Point } from '../../lib/Point';

class EditorStore {

  @observable.shallow
  nodePos = new Map<number, Point>();

  @observable
  arrowStart: number | null = null;

}

const EditorStoreContext = React.createContext(new EditorStore());

export default EditorStoreContext;
