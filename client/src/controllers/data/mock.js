import _ from "lodash";
import {
  SERVICE_ENDPOINT_SOURCES_READ,
  UNIQUE_KEY_UPLOAD_CONFIG,
  UNIQUE_KEY_UPLOAD_SAMPLE,
} from "./api";

export default {
  [UNIQUE_KEY_UPLOAD_SAMPLE]: {
    payload: _.merge(
      new Blob(["COL_ONE,COL_TWO,COL_THREE\r\n123456,Stacy,01/01/2001"], {
        type: "text/csv",
      }),
      {
        lastModifiedDate: "",
        name: "sample.csv",
      }
    ),
    result: {
      header: ["COL_ONE", "COL_TWO", "COL_THREE"],
      data: { COL_ONE: "123456", COL_TWO: "Stacy", COL_THREE: "01/01/2001" },
      rows: [["123456", "Stacy", "01/01/2001"]],
      size: 1,
    },
  },
  [UNIQUE_KEY_UPLOAD_CONFIG]: {
    payload: _.merge(
      new Blob(['{"items":[]}'], {
        type: "application/json",
      }),
      {
        lastModifiedDate: "",
        name: "config.json",
      }
    ),
    result: {
      items: [],
    },
  },
  [SERVICE_ENDPOINT_SOURCES_READ]: {
    payload: null,
    result: {
      sites: ["PNNL"],
      buildings: {
        PNNL: ["SEB", "BSF_CSF", "ROI", "ROII", "350_BUILDING"],
      },
      devices: {
        SEB: ["AHU1", "AHU2", "AHU3", "AHU4"],
        BSF_CSF: ["RTU3", "RTU4", "RTU5"],
        ROI: ["INTERIOR_AHU"],
        ROII: ["INTERIOR_AHU"],
        "350_BUILDING": ["HP3", "HP4", "HP5", "HP6", "HP7"],
      },
      diagnostics: ["Economizer_RCx", "Airside_RCx"],
    },
  },
};
