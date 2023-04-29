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
    const [output, setOutput] = useState<string[]>([]);
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  
    const handleCodeChange = (value: string | undefined) => {
      if (value !== undefined) {
        setCode(value);
      }
    };
  
    useEffect(() => {
      if (editorRef.current) {
        // Set up the Monaco environment
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
        // Compile the code using the built-in `eval` function
        const result = eval(code);
  
        // Log the output to the console-like terminal
        if (typeof result !== "undefined") {
          setOutput((prevOutput) => [...prevOutput, result.toString()]);
        }
      } catch (error) {
        // Log the error to the console-like terminal
        setOutput((prevOutput) => [
          ...prevOutput,
          `ERROR: ${(error as Error).message}`,
        ]);
      }
  
      // Log the console output to the console-like terminal
      console.log = (...args: any[]) => {
        setOutput((prevOutput) => [
          ...prevOutput,
          args.map((arg) => arg.toString()).join(" "),
        ]);
      };
  
      // Compile the code using the modified `eval` function
      try {
        eval(code);
      } catch (error) {
        // Log the error to the console-like terminal
        setOutput((prevOutput) => [
          ...prevOutput,
          `ERROR: ${(error as Error).message}`,
        ]);
      }
  
      // Reset the `console.log` function
      console.log = originalConsoleLog;
    };
  
    const handleEditorDidMount = (
      editor: monaco.editor.IStandaloneCodeEditor,
      monacoRef: typeof monaco
    ) => {
      // Save the editor instance to a ref for later use
      editorRef.current = editor;
    };
  
    const originalConsoleLog = console.log;
  
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
  
  TypeScriptEditor.defaultProps = {
    initialValue: "",
  };
  
  export default TypeScriptEditor;