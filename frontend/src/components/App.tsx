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
  React.useEffect(() => {
    const getDags = async () => {
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
    getDags();
  }, []);

  return (
    <>
      <br />
      <table>
        <thead>
          <tr style={{ textAlign: "left" }}>
            <th>name</th>
            <th>age</th>
            <th>breed</th>
          </tr>
        </thead>
        <tbody>
          {dags &&
            dags.map((dag) => (
              <tr key={dag.id}>
                <td>{dag.name}</td>
                <td>{dag.age}</td>
                <td>{dag.breed}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default App;
