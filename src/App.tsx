import React from 'react';
import './App.css';
import CodeEditor from './TextEditor';

function App() {
  return (
    <div>
      <h1>Code Editor</h1>
      <CodeEditor initialValue={'console.log("hello world")'}></CodeEditor>
    </div>
  );
}

export default App;
