import * as React from "react"
import Header from "./components/Header"
import Editor from "./components/Editor"
import "./App.css"

const App: React.FC = () => (
  <div>
    <Header />
    <Editor width={window.innerWidth} height={window.innerHeight} />
  </div>
)

export default App
