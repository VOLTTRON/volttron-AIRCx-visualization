import { reset } from "controllers/action";
import { selectDataForm, setDataForm } from "controllers/data/action";
import configureStore from "controllers/store";
import moment from "moment";

const reduxStore = configureStore({});

describe("data.setForm()", () => {
  beforeEach(() => {
    reduxStore.dispatch(reset());
  });

  it("set current config action should be dispatched.", () => {
    const end = moment(getTimestamp().getTime()).startOf("day");
    const payload = {
      site: "",
      building: "",
      device: "",
      diagnostic: "",
      start: moment(end)
        .year(moment(end).year() - 1)
        .format(),
      end: end.format(),
      group: "day",
      filter: "all",
    };
    reduxStore.dispatch(setDataForm(payload));
    expect(selectDataForm(reduxStore.getState())).toEqual(payload);
  });
});
