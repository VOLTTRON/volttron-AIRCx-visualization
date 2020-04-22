import { createShallow } from "@material-ui/core/test-utils";
import React from "react";
import {
  MuiCheckbox,
  MuiSection,
  MuiSelect,
  MuiTextArea,
  MuiTextField
} from "./index";

describe("<MuiCheckbox />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  afterAll(() => {
    shallow.cleanUp();
  });

  it("should render with properties specified.", () => {
    const properties = {
      checked: false,
      disabled: false,
      id: "test-checkbox",
      onChange: () => {},
      value: ""
    };

    shallow(<MuiCheckbox {...properties} />);
  });
});

describe("<MuiSection />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  afterAll(() => {
    shallow.cleanUp();
  });

  it("should render with properties specified.", () => {
    const properties = {
      header: "test"
    };

    shallow(<MuiSection {...properties} />);
  });
});

describe("<MuiSelect />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  afterAll(() => {
    shallow.cleanUp();
  });

  it("should render with properties specified.", () => {
    const properties = {
      children: [
        <option value="item1">item1</option>,
        <option value="item2">item2</option>
      ],
      id: "test-select",
      onChange: () => {},
      value: {}
    };

    shallow(<MuiSelect {...properties} />);
  });
});

describe("<MuiTextArea />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  afterAll(() => {
    shallow.cleanUp();
  });

  it("should render with properties specified.", () => {
    const properties = {
      id: "test-textarea",
      onChange: () => {},
      value: "",
      rows: 4
    };

    shallow(<MuiTextArea {...properties} />);
  });
});

describe("<MuiTextField />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  afterAll(() => {
    shallow.cleanUp();
  });

  it("should render with properties specified.", () => {
    const properties = {
      id: "test-textfield",
      onChange: () => {},
      value: ""
    };

    shallow(<MuiTextField {...properties} />);
  });
});
