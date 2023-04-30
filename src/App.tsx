import { useState } from 'react';
import './App.css';
import CSSEditor from './TextEditors/CSSEditor';
import HTMLEditor from './TextEditors/HTMLEditor';
import UserDisplay from './UserDisplay';
import * as fs from 'fs';

function App() {
  const initialHTMLText: string = 'src\ExampleFiles\initialHTML.txt';
  const initialCSSText : string = 'src\ExampleFiles\initialCSS.txt';;

  const [cssCode, setCssCode] = useState(initialCSSText);
  const handleCssCodeChange = (value: string) => {
    setCssCode(value);
  };

  const [htmlCode, setHtmlCode] = useState(initialHTMLText);
  const handleHtmlCodeChange = (code: string) => {
    setHtmlCode(code);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>WebDesign101</h1>
      </header>
      <main className="app-main">
        <div className="editors-container">
          <div className="editor">
            <h2>HTML Editor</h2>
            <HTMLEditor initialValue={initialHTMLText} onHtmlCodeChange={handleHtmlCodeChange} />
          </div>
          <div className="editor">
            <h2>CSS Editor</h2>
            <CSSEditor cssCode={initialCSSText} onCssCodeChange={handleCssCodeChange} />
          </div>
        </div>
        <div className="display-container">
          <h2>Result:</h2>
          <UserDisplay htmlCode={htmlCode} cssCode={cssCode} />
        </div>
      </main>
    </div>
  );
}

export default App;
