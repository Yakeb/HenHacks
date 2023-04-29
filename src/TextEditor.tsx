/* eslint-disable no-eval */
import React, { useState, useRef } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import Editor, { OnChange } from "@monaco-editor/react";

interface CodeEditorProps {
  initialValue: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue }) => {
  const [code, setCode] = useState(initialValue);
  const [output, setOutput] = useState<string[]>([]);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleCodeChange: OnChange = (value, event) => {
    setCode(value || "");
  };

  const handleCompile = () => {
    try {
      // Compile the code using the built-in `eval` function
      const result = eval(code);
  
      // Log the output to the console-like terminal
      if (typeof result !== "undefined") {
        setOutput((prevOutput) => [...prevOutput, result.toString()]);
      } else {
        setOutput((prevOutput) => [...prevOutput, "Compilation succeeded"]);
      }
    } catch (error) {
      // Log the error to the console-like terminal
      setOutput((prevOutput) => [
        ...prevOutput,
        `ERROR: ${(error as Error).message}`,
      ]);
    }
  };

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monacoRef: typeof monaco
  ) => {
    editorRef.current = editor;
    monacoRef.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monacoRef.languages.typescript.ScriptTarget.ES2015,
      allowNonTsExtensions: true,
    });
  };

  return (
    <div>
      <Editor
        height="500px"
        defaultLanguage="typescript"
        defaultValue={code}
        theme="vs-dark"
        onChange={handleCodeChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          scrollbar: { alwaysConsumeMouseWheel: false },
        }}
      />
      <button onClick={handleCompile}>Compile</button>
      <div>
        <h2>Terminal:</h2>
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    </div>
  );
};

CodeEditor.defaultProps = {
  initialValue: "",
};

export default CodeEditor;