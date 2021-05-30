import { apiBase } from '../index';
import axios, { AxiosResponse } from 'axios';
import { Dag, DagResponse } from '../types/Dags';

interface SetDags {
  (dags: Dag[]): void;
}

const addDag = async (setDags: SetDags): Promise<void> => {
    try {
      const _dag: AxiosResponse<{success:string;message:string;dog:Dag;dogs:Dag[]}> =
        await axios.post(`${apiBase}/breeds`);
      setDags(_dag.data.dogs);
    } catch (err) {
      console.log(err);
    }
  }
const getDags = async (setDags: SetDags): Promise<void> => {
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
const deleteDags = async (setDags: SetDags): Promise<void> => {
  try {
    const _delete: AxiosResponse<DagResponse> = await axios.delete(
      `${apiBase}/breeds`
    );
    setDags(_delete.data.dogs);
  } catch (err) {
    console.log(err);
  }
};

export {
    addDag,
    getDags,
    deleteDags
}
