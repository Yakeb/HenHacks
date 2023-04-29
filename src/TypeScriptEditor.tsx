/* eslint-disable no-eval */
import React, { useState, useRef, useEffect } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Editor, { OnChange } from "@monaco-editor/react";


interface CodeEditorProps {
  initialValue: string;
}

const TypeScriptEditor: React.FC<CodeEditorProps> = ({ initialValue }) => {
  const [code, setCode] = useState(initialValue);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      const uri = monaco.Uri.parse(
        "data:text/javascript;charset=utf-8;base64," + btoa("")
      );
      monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        "declare const console: { log: (...args: any[]) => void };",
        uri.toString()
      );
    }
  }, []);

  const handleCompile = () => {
    try {
      // Reset the console-like terminal output
      setTerminalOutput([]);

      // Save the original console.log function
      const originalConsoleLog = console.log;

      // Override the console.log function to log to the terminal output
      console.log = (...args: any[]) => {
        setTerminalOutput((prevOutput) => [
          ...prevOutput,
          args.map((arg) => arg.toString()).join(" "),
        ]);
      };

      // Evaluate the code using the built-in eval function
      const result = eval(code);

      // Log the result to the terminal output
      if (typeof result !== "undefined") {
        console.log(result);
      }

      // Reset the console.log function to its original state
      console.log = originalConsoleLog;
    } catch (error) {
      // Log the error to the terminal output
      console.log(`ERROR: ${(error as Error).message}`);
    }
  };

  const handleClear = () => {
    setTerminalOutput([]);
  };

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monacoRef: typeof monaco
  ) => {
    editorRef.current = editor;
  };

  return (
    <div>
      <Editor
        height="500px"
        width="800px"
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
      <button onClick={handleClear}>Clear</button>
      <div>
        <h2>Terminal:</h2>
        {terminalOutput.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    </div>
  );
};

TypeScriptEditor.defaultProps = {
  initialValue: "",
};

export default TypeScriptEditor;