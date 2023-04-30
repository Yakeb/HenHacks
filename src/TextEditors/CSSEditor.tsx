/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

interface CSSEditorProps {
  cssCode: string;
  onCssCodeChange: (value: string) => void;
}

const CSSEditor: React.FC<CSSEditorProps> = ({ cssCode, onCssCodeChange }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      onCssCodeChange(value);
    }
  };

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monacoRef: typeof monaco
  ) => {
    // Save the editor instance to a ref for later use
    editorRef.current = editor;

    // Set up the CSS environment
    monacoRef.languages.css.cssDefaults.setDiagnosticsOptions({
      lint: {
        compatibleVendorPrefixes: "ignore",
        vendorPrefix: "warning",
        duplicateProperties: "warning",
        emptyRules: "warning",
        importStatement: "ignore",
        boxModel: "ignore",
        universalSelector: "ignore",
        zeroUnits: "warning",
      },
    });
    monacoRef.languages.css.cssDefaults.setOptions({
      //  tabSize: 2,
      //  insertSpaces: true,
      //  trimTrailingWhitespace: true,
      //  wordWrap: "on",
      //  wrappingIndent: "indent",
      //  folding: true,
    });
  };

  return (
    <div style={{ display: "flex", background: "black" }}>
      <Editor
        height="300px"
        defaultLanguage="css"
        value={cssCode}
        theme="vs-dark"
        onChange={handleCodeChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          scrollbar: { alwaysConsumeMouseWheel: false },
        }}
      />
    </div>
  );
};

export default CSSEditor;