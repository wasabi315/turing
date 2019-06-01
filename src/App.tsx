import * as React from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import './App.css';

class App extends React.Component<{}, {}> {

  render() {
    return (
      <div>
        <Header />
        <Editor
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div>
    )
  }
}

export default App;
