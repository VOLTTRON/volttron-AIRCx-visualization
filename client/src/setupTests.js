import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { timestampGenerator } from "./controllers/util";

// set timestamps on busy and error types to a static time for testing
const date = new Date();
timestampGenerator(() => date);

// put timestamps on console statements
console.logCopy = console.log.bind(console);
console.log = function(message) {
  const header = `[${new Date().toUTCString()}]`;
  this.logCopy(header, message);
};

// throw an error when a warning is printed to the console
let error = console.error;
console.error = function(message) {
  error.apply(console, arguments); // keep default behaviour
  // throw message instanceof Error ? message : new Error(message);
  throw new Error("Warning message posted to console.");
};

configure({ adapter: new Adapter() });
