import * as React from "react";
import { FC, useEffect } from "react";

export const spyUtil = {
  spyMethod: () => {},
};

const App: FC<{ logger?: () => void }> = ({ logger }): JSX.Element => {
  const clicker = () => {};

  useEffect(() => {
    if (logger) {
      logger();
    }
  }, []);

  return (
    <>
      <h1 className="text-2xl">Blank React Template</h1>
      <h2 className="text-lg">
        With Typescript, TailwindCSS, PostgreSQL DB, on Docker container
      </h2>
      <br />
      <button onClick={spyUtil.spyMethod}>Click me</button>
    </>
  );
};

export default App;
