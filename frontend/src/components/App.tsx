import * as React from "react";
import axios, { AxiosResponse } from "axios";

const apiBase = `http://localhost:${process.env.API_PORT}/api/v1`;

interface Dag {
  id: number;
  name: string;
  age: number;
  breed: string;
}
interface DagResponse {
  success: boolean;
  message: string;
  dogs: Dag[];
}

const App = ({}) => {
  const [dags, setDags] = React.useState<Dag[]>([
    {
      id: 0,
      name: "borky",
      age: 32,
      breed: "husky",
    },
    {
      id: 1,
      name: "boof",
      age: 12,
      breed: "wheenie",
    },
  ]);
  const addDag = async (): Promise<void> => {
    try {
      const _dag: AxiosResponse<{success:string;message:string;dog:Dag;dogs:Dag[]}> =
        await axios.post(`${apiBase}/breeds`);
      setDags(_dag.data.dogs);
    } catch (err) {
      console.log(err);
    }
  }
  const getDags = async (): Promise<void> => {
    try {
      const _dags: AxiosResponse<DagResponse> = await axios.get(
        `${apiBase}/breeds`
      );
      console.log(_dags);
      setDags(_dags.data.dogs);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteDags = async (): Promise<void> => {
    try {
      const _delete: AxiosResponse<DagResponse> = await axios.delete(
        `${apiBase}/breeds`
      );
      setDags(_delete.data.dogs);
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getDags();
  }, []);

  return (
    <>
      <div
      style={{ textAlign: 'center', margin: '25px 0 0 0' }}
      >
        {/* <h1
        style={{ display: 'inline' }}
        >You like Dags?</h1> */}
        <img
        style={{ width: '250px' }}
        src="https://i.redd.it/k1bvnwiox7l31.jpg"></img>
        <br />
        <button
        onClick={addDag}
        style={{ 
          display: 'inline',
          margin: '0 0 0 20px'
        }}>Add a Dag</button>
        <button
        onClick={deleteDags}
        style={{ 
          display: 'inline',
          margin: '0 0 0 20px'
        }}>Remove All Dags</button>
      </div>
      <br />
      <br />
      {
        dags.length > 0 ?
        <table
        style={{
          textAlign: 'left',
          padding: '10px 40px 10px 40px',
          margin: 'auto',
          border: '2px dotted grey'
          }}>
          <thead>
            <tr style={{}}>
              <th>Name</th>
              {/* <th>Age</th> */}
              <th>Breed</th>
            </tr>
          </thead>
          <tbody>
            {dags &&
              dags.map((dag) => (
                <tr key={dag.id}>
                  <td>{dag.name}</td>
                  {/* <td>{dag.age}</td> */}
                  <td>{dag.breed}</td>
                </tr>
              ))}
          </tbody>
        </table>
        : <div
            style={{
              textAlign: 'center'
            }}
          >No daggies!</div>
      }
    </>
  );
};

export default App;
