import React from 'react';
import './App.css';
import { Tabs, Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import TypeScriptEditor from './TypeScriptEditor';
import PythonEditor from './PythonEditor';

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
      <h1>Learn to code</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab={
          <Dropdown overlay={menu} trigger={['click']}>
            <Button>
              TypeScript <DownOutlined />
            </Button>
          </Dropdown>
        } key="1">
          <TypeScriptEditor initialValue={initialValue} />
        </TabPane>
        <TabPane tab={
          <Dropdown overlay={menu} trigger={['click']}>
            <Button>
              Java <DownOutlined />
            </Button>
          </Dropdown>
        } key="2">
          <p>Java editor component here</p>
        </TabPane>
        <TabPane tab={
          <Dropdown overlay={menu} trigger={['click']}>
            <Button>
              Python <DownOutlined />
            </Button>
          </Dropdown>
        } key="3">
          <PythonEditor initialValue={initialValue} />
        </TabPane>
        <TabPane tab={
          <Dropdown overlay={menu} trigger={['click']}>
            <Button>
              C++ <DownOutlined />
            </Button>
          </Dropdown>
        } key="4">
          <p>C++ editor component here</p>
        </TabPane>
        <TabPane tab={
          <Dropdown overlay={menu} trigger={['click']}>
            <Button>
              C <DownOutlined />
            </Button>
          </Dropdown>
        } key="5">
          <p>C editor component here</p>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
