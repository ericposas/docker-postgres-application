/**
 * @jest-environment jsdom
 */

import React from "react";
import {
  cleanup,
  fireEvent,
  queryByText,
  render,
} from "@testing-library/react";
import App from "./App";
import { spyUtil } from "./App";

afterEach(cleanup);

test("App renders out a title h1 field", () => {
  const { queryByText } = render(<App />);
  expect(queryByText(/React/i)).toBeTruthy();
});

test("App component renders a subtitle h2 element", () => {
  const { queryByText } = render(<App />);
  expect(queryByText(/with\ Typescript/i)).toBeTruthy();
});

test("App should call log function", () => {
  const log = jest.fn();
  // jest.fn() can stand in for any externally available method
  // and can be passed in via React props to a component
  render(<App logger={log} />);
  expect(log).toHaveBeenCalled();
  expect(log).toHaveBeenCalledTimes(1);
});

test("App should call method", () => {
  const spyMethod = jest.spyOn(spyUtil, "spyMethod");
  // so, spyOn just "looks" inside on an object or class method,
  // but it can't actually call a method of a function component
  const { queryByText } = render(<App />);
  const button = queryByText(/click/i);
  fireEvent.click(button);
  fireEvent.click(button);
  expect(spyMethod).toHaveBeenCalled();
  expect(spyMethod).toHaveBeenCalledTimes(2);
});
