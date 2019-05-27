import * as React from 'react';
import Canvas from './components/Canvas';
import Editor from './components/Editor';
import './App.css';

class App extends React.Component<{}, {}> {

  render() {
    return (
      <Editor
        width={window.innerWidth}
        height={window.innerHeight}
      />
    )
  }
}

export default App;
