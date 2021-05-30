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
      className="text-center max-w-xs mx-auto mt-8"
      >
        <img
        className="rounded-md select-none"
        src="https://i.redd.it/k1bvnwiox7l31.jpg"></img>
        <br />
        <button
        onClick={addDag}
        className="btn-blue ml-4"
        >Add a Dag</button>
        <button
        onClick={deleteDags}
        className="btn-blue-md"
        >Remove All Dags</button>
      </div>
      {
        dags.length > 0 ?
        <table
        className="
        rounded-lg
        mt-10 text-center mx-auto
        table-auto w-8/12
        "
        >
          <thead>
            <tr className="bg-blue-500 text-white">
              <th>Name</th>
              <th>Breed</th>
            </tr>
          </thead>
          <tbody className="bg-blue-200 text-blue-500">
            {dags &&
              dags.map((dag) => (
                <tr
                key={dag.id}
                >
                  <td>{dag.name}</td>
                  <td>{dag.breed}</td>
                </tr>
              ))}
          </tbody>
        </table>
        : <div
          className="text-center mt-10 text-lg"
          >No daggies!</div>
      }
    </>
  );
};

export default App;
