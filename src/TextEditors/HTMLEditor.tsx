import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

interface CodeEditorProps {
  initialValue: string;
}

const HTMLEditor: React.FC<CodeEditorProps> = ({ initialValue }) => {
  const [htmlCode, sethtmlCode] = useState(initialValue);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      sethtmlCode(value);
    }
  };

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monacoRef: typeof monaco
  ) => {
    // Save the editor instance to a ref for later use
    editorRef.current = editor;

    // Set up the HTML environment
    monacoRef.languages.html.htmlDefaults.setOptions({
     // tabSize: 2,
     // insertSpaces: true,
     // wrapLineLength: 0,
      //unformatted: "",
      // Add any additional HTML format options here
    });
  };

  return (
    <div style={{ display: "flex", background: "black" }}>
      <Editor
        height="500px"
        defaultLanguage="html"
        defaultValue={htmlCode}
        value={htmlCode}
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

HTMLEditor.defaultProps = {
  initialValue: "",
};

export default HTMLEditor;
