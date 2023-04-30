import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

interface CodeEditorProps {
  initialValue: string;
}

const TypeScriptEditor: React.FC<CodeEditorProps> = ({ initialValue }) => {
  const [code, setCode] = useState(initialValue);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monacoRef: typeof monaco
  ) => {
    // Save the editor instance to a ref for later use
    editorRef.current = editor;

    // Set up the TypeScript environment
    monacoRef.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });
    monacoRef.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });
    monacoRef.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monacoRef.languages.typescript.ScriptTarget.ES2015,
      allowNonTsExtensions: true,
    });
  };

  return (
    <div style={{ display: "flex", background: "black" }}>
      <Editor
        height="500px"
        defaultLanguage="typescript"
        defaultValue={code}
        value={code}
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

TypeScriptEditor.defaultProps = {
  initialValue: "",
};

export default TypeScriptEditor;