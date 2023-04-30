/* eslint-disable import/no-webpack-loader-syntax */
//import React, { useState } from 'react';
import { useState } from 'react';
import './App.css';
import CSSEditor from './TextEditors/CSSEditor';
import HTMLEditor from './TextEditors/HTMLEditor';
//import TypeScriptEditor from './TextEditors/TypeScriptEditor';
import UserDisplay from './UserDisplay';

function App() {
  //const initialTSText = require('!!raw-loader!./ExampleFiles/initialTS.tsx')
  const initialHTMLText = require('!!raw-loader!./ExampleFiles/initialHTML.html')
  const initialCSSText = require('!!raw-loader!./ExampleFiles/initialCSS.css')

  const [cssCode, setCssCode] = useState(initialCSSText);

  const handleCssCodeChange = (value: string) => {
    setCssCode(value);
  };
  const [htmlCode, setHtmlCode] = useState(initialHTMLText);

  const handleHtmlCodeChange = (code: string) => {
    setHtmlCode(code);
  };
  return (
      <div className="grid-container">
        <title>Womp Nantrim Zoop Splink Mike</title>
        <div className="grid-item">
          <h2>HTML Editor</h2>
          <HTMLEditor initialValue={initialHTMLText} onHtmlCodeChange={handleHtmlCodeChange} />
        </div>
        <div className="grid-item">
          <h2>CSS Editor</h2>
          <CSSEditor cssCode={initialCSSText} onCssCodeChange={handleCssCodeChange} />
        </div>
        <div className="grid-item">
          <h1>User Display</h1>
          <UserDisplay
            htmlCode={htmlCode}
            cssCode={cssCode}
          ></UserDisplay>
        </div>
      </div>
  );
};
export default App;