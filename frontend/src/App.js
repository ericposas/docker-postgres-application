import React from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [results, setResults] = React.useState();

  React.useEffect(() => {
    axios.get('test_query')
      .then(_results => {
        setResults(_results.data);
        console.log(_results.data);
      })
      .catch(err => {
        throw new Error(err);
      });
  }, []);

  return (
    <div className="App" style={{ position: 'relative' }}>
      <div style={{
        "margin": "10px 0 10px 0",
        "fontSize": "18px"
        }}>Some db results</div>
      <table style={{
        left: 0,
        right: 0,
        width: '400px',
        margin: 'auto',
        padding: '10px',
        display: 'block',
        textAlign: 'left',
        position: 'absolute',
        backgroundColor: 'cyan'
      }}>
        <thead>
          <th>id</th>
          <th>name</th>
          <th>email</th>
        </thead>
        {
        results && results.map((item, index) => (
          <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
          </tr>
        ))
      }
      </table>
    </div>
  );
}

export default App;
