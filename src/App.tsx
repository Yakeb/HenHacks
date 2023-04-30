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
      <h1>TypeScript Editor</h1>
      <TypeScriptEditor initialValue={initialTSText} />
      <h2>HTML Editor</h2>
      <HtmlEditor initialValue={initialHTMLText}></HtmlEditor>
      <h3>CSS Editor</h3>
      <CSSEditor initialValue={initialCSSText}></CSSEditor>
      <h4>User Display</h4>
      <UserDisplay typescriptCode={''} htmlCode={''} cssCode={''}></UserDisplay>
    </div>
  );
};

export default App;