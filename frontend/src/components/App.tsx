import * as React from "react";
import { motion } from 'framer-motion';
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
  const motionBouncy = {
    initial: {
      opacity: 0.2,
      scale: 0.2
    },
    animate: {
      opacity: 1.0,
      scale: [1.1, 0.95, 1.02, 0.99, 1.0]
    },
    transition: {
      duration: .5
    }
  }
  const motionButton = {
    whileHover: {
      scale: 1.2
    },
    whileTap: {
      scale: 0.85
    },
    transition: {
      duration: 0.1
    }
  }
  const motionTRow = {
    initial: {
      opacity: 0,
      transform: 'scale(0.95) translate(0px, 20px)'
    },
    animate: {
      opacity: 1.0,
      transform: 'scale(1.0) translate(0px, 0px)'
    },
    transition: {
      duration: 0.5
    },
  }

  React.useEffect(() => {
    getDags(setDags);
  }, []);

  return (
    <>
      <div
      className=""
      >
        <div
        className="
        pt-6 pb-12 rounded
        text-center max-w-7xl
        mx-auto mt-4 bg-yellow-700
        "
        >
          <motion.img
          {...motionBouncy}
          className="
          filter drop-shadow-xl
          rounded-md select-none w-1/4 m-auto
          "
          src="https://i.redd.it/k1bvnwiox7l31.jpg">
          </motion.img>
          <br />
          <motion.button
          {...motionButton}
          onClick={() => addDag(setDags)}
          className="btn-blue ml-4"
          >
            Add a Dag
          </motion.button>
          <motion.button
          {...motionButton}
          onClick={() => deleteDags(setDags)}
          className="btn-blue-md"
          >Remove All Dags
          </motion.button>
        {
          dags.length > 0 ?
          <table
          className="
          rounded
          mt-6 mx-auto
          table-auto w-8/12
          "
          >
            <thead>
              <tr className="
              text-left font-bold
              bg-yellow-600 text-white
            ">
                <th>Name</th>
                <th>Breed</th>
              </tr>
            </thead>
            <tbody
            className="
            text-left
            bg-yellow-200
            text-yellow-800
            ">
              {dags &&
                dags.map((dag) => (
                  <motion.tr
                  key={dag.id}
                  className="p-10"
                  {...motionTRow}
                  >
                    <td>{dag.name}</td>
                    <td>{dag.breed}</td>
                  </motion.tr>
                ))}
            </tbody>
          </table>
          : <div
            className="text-center mt-10 text-lg text-white"
            >No daggies!</div>
        }
        </div>
      </div>
    </>
  );
};

export default App;
