import React, { useState } from 'react';
import './App.css';
import CodeEditor from './TypeScriptEditor';

function App() {
  return (
    <div>
      <h1>Code Editor</h1>
      <CodeEditor initialValue={''} />
    </div>
  );
};

export default App;