import * as React from "react";
import { Dag } from '../types/Dags';
import { getDags, addDag, deleteDags } from './frontendCrud';

const dummyData = [{
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
];

const App = ({}) => {
  const [dags, setDags] = React.useState<Dag[]>(dummyData);
  
  React.useEffect(() => {
    getDags(setDags);
  }, []);

  return (
    <>
      <div
      className="
      text-center max-w-xs
      mx-auto mt-8
      "
      >
        <img
        className="
        filter drop-shadow-xl
        rounded-md select-none
        "
        src="https://i.redd.it/k1bvnwiox7l31.jpg"></img>
        <br />
        <button
        onClick={() => addDag(setDags)}
        className="btn-blue ml-4"
        >Add a Dag</button>
        <button
        onClick={() => deleteDags(setDags)}
        className="btn-blue-md"
        >Remove All Dags</button>
      </div>
      {
        dags.length > 0 ?
        <table
        className="
        rounded
        mt-10 text-center mx-auto
        table-auto w-8/12
        "
        >
          <thead>
            <tr className="font-bold bg-yellow-500 text-white">
              <th>Name</th>
              <th>Breed</th>
            </tr>
          </thead>
          <tbody className="bg-yellow-200 text-yellow-800">
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
          className="text-center mt-10 text-lg text-white"
          >No daggies!</div>
      }
    </>
  );
};

export default App;
