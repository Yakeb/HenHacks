import * as React from 'react';
import * as monaco from 'monaco-editor';

interface EditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
}

class CodeEditor extends React.Component<EditorProps> {
  private containerRef: React.RefObject<HTMLDivElement>;
  private editor!: monaco.editor.IStandaloneCodeEditor;

  constructor(props: EditorProps) {
    super(props);
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    this.editor = monaco.editor.create(this.containerRef.current!, {
      value: this.props.value,
      language: this.props.language,
      automaticLayout: true,
    });

    this.editor.onDidChangeModelContent(() => {
      const value = this.editor.getValue();
      this.props.onChange(value);
    });
  }

  componentWillUnmount() {
    this.editor.dispose();
  }

  render() {
    return <div ref={this.containerRef} style={{ height: '300px' }} />;
  }
}

export default CodeEditor;