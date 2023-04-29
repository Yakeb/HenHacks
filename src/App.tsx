import React from 'react';
import './App.css';
import TypeScriptEditor from './TypeScriptEditor';

function App() {
  return (
    <div>
      <h1>Code Editor</h1>
      <TypeScriptEditor initialValue={'console.log("hello world")'}></TypeScriptEditor>
    </div>
  );
}

export default App;
