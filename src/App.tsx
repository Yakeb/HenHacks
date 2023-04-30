//import React, { useState } from 'react';
import './App.css';
import HtmlEditor from './HTMLEditor';
import TypeScriptEditor from './TypeScriptEditor';

function App() {
  return (
    <div>
      <h1>TypeScript Editor</h1>
      <TypeScriptEditor initialValue={''} />
      <h2>HTML Editor</h2>
      <HtmlEditor initialValue={''}></HtmlEditor>
    </div>
  );
};

export default App;