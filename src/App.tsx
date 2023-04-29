import React from 'react';
import './App.css';
import CodeEditor from './TextEditor';
import { Tabs, Menu, Dropdown, Button } from 'antd';
//import { DownOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

function App() {
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => handleMenuClick('console.log("Hello World")')}>
        Console.log("Hello World")
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleMenuClick('let num: number = 5;')}>
        Define a number variable
      </Menu.Item>
      <Menu.Item key="3" onClick={() => handleMenuClick('let str: string = "Hello";')}>
        Define a string variable
      </Menu.Item>
      <Menu.Item key="4" onClick={() => handleMenuClick('let arr: number[] = [1, 2, 3];')}>
        Define an array variable
      </Menu.Item>
      <Menu.Item key="5" onClick={() => handleMenuClick('class Car {}')}>
        Define a class
      </Menu.Item>
    </Menu>
  );

  const handleMenuClick = (value:string) => {
    setInitialValue(value);
  };

  const [initialValue, setInitialValue] = React.useState('console.log("Hello World")');

  return (
    <div>
      <h1>Code Editor</h1>
      <CodeEditor initialValue={'console.log("hello world")'}></CodeEditor>
    </div>
  );
}

export default App;
