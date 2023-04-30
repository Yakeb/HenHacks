/* eslint-disable import/no-webpack-loader-syntax */
//import React, { useState } from 'react';
import './App.css';
import CSSEditor from './TextEditors/CSSEditor';
import HtmlEditor from './TextEditors/HTMLEditor';
import TypeScriptEditor from './TextEditors/TypeScriptEditor';
import UserDisplay from './UserDisplay';

function App() {
  const initialTSText = require('!!raw-loader!./ExampleFiles/initialTS.txt')
  const initialHTMLText = require('!!raw-loader!./ExampleFiles/initialHTML.txt')
  const initialCSSText = require('!!raw-loader!./ExampleFiles/initialCSS.txt')

  return (
    <div>
      <title>Womp Nantrim Zoop Splink Mike</title>
      <h1>Learning Code</h1>
      <div className="row">
        <div className="column">
          <TypeScriptEditor initialValue={initialTSText} />
          <h3>TypeScript</h3>
        </div>
        <div className="column">
          <HtmlEditor initialValue={initialHTMLText}/>
          <h3>HTML</h3>
        </div>
        <div className="column">
          <CSSEditor initialValue={initialCSSText}/>
          <h3>CSS</h3>
        </div>
      </div>
      <h4>User Display</h4>
      <UserDisplay typescriptCode={''} htmlCode={''} cssCode={''}></UserDisplay>
    </div>
  );
};

export default App;
