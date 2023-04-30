/* eslint-disable import/no-webpack-loader-syntax */
//import React, { useState } from 'react';
import './App.css';
import CSSEditor from './TextEditors/CSSEditor';
import HTMLEditor from './TextEditors/HTMLEditor';
import TypeScriptEditor from './TextEditors/TypeScriptEditor';
import UserDisplay from './UserDisplay';

function App() {
  const initialTSText = require('!!raw-loader!./ExampleFiles/initialTS.tsx')
  const initialHTMLText = require('!!raw-loader!./ExampleFiles/initialHTML.html')
  const initialCSSText = require('!!raw-loader!./ExampleFiles/initialCSS.css')
  return (
      <div className="grid-container">
        <title>Womp Nantrim Zoop Splink Mike</title>
        <div className="grid-item">
          <h1>TypeScript Component Editor</h1>
          <TypeScriptEditor initialValue={initialTSText} />
        </div>
        <div className="grid-item">
          <h2>TypesScript Base Editor</h2>
          <HTMLEditor initialValue={initialHTMLText}></HTMLEditor>
        </div>
        <div className="grid-item">
          <h3>CSS Editor</h3>
          <CSSEditor initialValue={initialCSSText}></CSSEditor>
        </div>
        <div className="grid-item">
          <h4>User Display</h4>
          <UserDisplay
            htmlCode={initialHTMLText}
            cssCode={initialCSSText}
          ></UserDisplay>
        </div>
      </div>
  );
};

export default App;