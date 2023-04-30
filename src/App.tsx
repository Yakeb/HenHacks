//import React, { useState } from 'react';
import './App.css';
import CSSEditor from './CSSEditor';
import HtmlEditor from './HTMLEditor';
import TypeScriptEditor from './TypeScriptEditor';

function App() {
  return (
    <div>
      <h1>TypeScript Editor</h1>
      <TypeScriptEditor initialValue={''} />
      <h2>HTML Editor</h2>
      <HtmlEditor initialValue={''}></HtmlEditor>
      <h3>CSS Editor</h3>
      <CSSEditor initialValue={''}></CSSEditor>
    </div>
  );
};

export default App;