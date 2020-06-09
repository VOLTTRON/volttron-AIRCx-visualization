import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import _ from "lodash";
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
  const text = _.get(message, "message", message);
  if (
    text.startsWith(
      "Error: Not implemented: HTMLCanvasElement.prototype.getContext (without installing the canvas npm package)"
    )
  ) {
    return;
  }
  error.apply(console, arguments); // keep default behaviour
  // throw message instanceof Error ? message : new Error(message);
  throw new Error("Warning message posted to console: " + text);
};

// no op function necessary for plotly
function noOp() {}
if (typeof window.URL.createObjectURL === "undefined") {
  Object.defineProperty(window.URL, "createObjectURL", { value: noOp });
}

configure({ adapter: new Adapter() });
