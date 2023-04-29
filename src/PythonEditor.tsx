import React, { useState, useRef } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import Editor, { OnChange } from "@monaco-editor/react";

interface PythonEditorProps {
  initialValue: string;
}

const PythonEditor: React.FC<PythonEditorProps> = ({ initialValue }) => {
  const [code, setCode] = useState(initialValue);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  function handleCodeChange(value: string | undefined) {
        if (value !== undefined) {
            setCode(value);
        }
    }

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
  monaco.languages.register({ id: "python" });

  monaco.languages.setLanguageConfiguration("python", {
    comments: {
      lineComment: "#",
      blockComment: ["'''", "'''"],
    },
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"],
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: "'", close: "'", notIn: ["string", "comment"] },
      { open: '"', close: '"', notIn: ["string"] },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: "'", close: "'" },
      { open: '"', close: '"' },
    ],
  });
  
  monaco.languages.setMonarchTokensProvider("python", {
    tokenizer: {
      root: [
        [/^\s*#.*/, "comment"],
        [/"([^"\\]|\\.)*$/, "string.invalid"],
        [/'([^'\\]|\\.)*$/, "string.invalid"],
        [/"/, "string", "@string_double"],
        [/'/, "string", "@string_single"],
        [/^\s*\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
        [/^\s*\d+\.\d*/, "number.float"],
        [/^\s*\d+/, "number"],
        [/[{}()\[\]]/, "@brackets"],
        [
          /[a-zA-Z_]\w*/,
          {
            cases: {
              "@keywords": "keyword",
              "@default": "identifier",
            },
          },
        ],
      ],
      string_double: [
        [/[^\\"]+/, "string"],
        [/\\./, "string.escape"],
        [/"/, "string", "@pop"],
      ],
      string_single: [
        [/[^\\']+/, "string"],
        [/\\./, "string.escape"],
        [/'/, "string", "@pop"],
      ],
    },
    keywords: [
      "False",
      "None",
      "True",
      "and",
      "as",
      "assert",
      "async",
      "await",
      "break",
      "class",
      "continue",
      "def",
      "del",
      "elif",
      "else",
      "except",
      "finally",
      "for",
      "from",
      "global",
      "if",
      "import",
      "in",
      "is",
      "lambda",
      "nonlocal",
      "not",
      "or",
      "pass",
      "raise",
      "return",
      "try",
      "while",
      "with",
      "yield",
    ],
  });
  return (
    <div>
      <Editor
        height="500px"
        width="800px"
        defaultLanguage="python"
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
}

PythonEditor.defaultProps = {
    initialValue: "",
  };

export default PythonEditor;