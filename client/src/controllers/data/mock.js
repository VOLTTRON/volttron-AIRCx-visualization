import _ from "lodash";
import {
  SERVICE_ENDPOINT_DIAGNOSTICS,
  SERVICE_ENDPOINT_SOURCES,
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
  [SERVICE_ENDPOINT_SOURCES]: {
    payload: null,
    result: {
      EconomizerAIRCx: {
        PNNL: {
          BSF_CSF: {
            RTU3: {
              "Excess Outdoor-air Intake Dx": {},
              "Temperature Sensor Dx": {},
              "Insufficient Outdoor-air Intake Dx": {},
              "Economizing When Unit Should Not Dx": {},
              "Not Economizing When Unit Should Dx": {},
            },
            RTU4: {
              "Temperature Sensor Dx": {},
              "Not Economizing When Unit Should Dx": {},
              "Excess Outdoor-air Intake Dx": {},
              "Insufficient Outdoor-air Intake Dx": {},
              "Economizing When Unit Should Not Dx": {},
            },
            RTU5: {
              "Not Economizing When Unit Should Dx": {},
              "Excess Outdoor-air Intake Dx": {},
              "Temperature Sensor Dx": {},
              "Economizing When Unit Should Not Dx": {},
              "Insufficient Outdoor-air Intake Dx": {},
            },
          },
          SEB: {
            AHU1: {
              "Insufficient Outdoor-air Intake Dx": {},
              "Not Economizing When Unit Should Dx": {},
              "Excess Outdoor-air Intake Dx": {},
              "Economizing When Unit Should Not Dx": {},
              "Temperature Sensor Dx": {},
            },
            AHU2: {
              "Economizing When Unit Should Not Dx": {},
              "Excess Outdoor-air Intake Dx": {},
              "Insufficient Outdoor-air Intake Dx": {},
              "Not Economizing When Unit Should Dx": {},
              "Temperature Sensor Dx": {},
            },
            AHU3: {
              "Economizing When Unit Should Not Dx": {},
              "Insufficient Outdoor-air Intake Dx": {},
              "Excess Outdoor-air Intake Dx": {},
              "Temperature Sensor Dx": {},
              "Not Economizing When Unit Should Dx": {},
            },
            AHU4: {
              "Economizing When Unit Should Not Dx": {},
              "Excess Outdoor-air Intake Dx": {},
              "Insufficient Outdoor-air Intake Dx": {},
              "Temperature Sensor Dx": {},
              "Not Economizing When Unit Should Dx": {},
            },
          },
          ROII: {
            PERIMETER_AHU: {
              "Insufficient Outdoor-air Intake Dx": {},
              "Excess Outdoor-air Intake Dx": {},
              "Temperature Sensor Dx": {},
              "Not Economizing When Unit Should Dx": {},
              "Economizing When Unit Should Not Dx": {},
            },
            INTERIOR_AHU: {
              "Economizing When Unit Should Not Dx": {},
              "Excess Outdoor-air Intake Dx": {},
              "Not Economizing When Unit Should Dx": {},
              "Insufficient Outdoor-air Intake Dx": {},
              "Temperature Sensor Dx": {},
            },
          },
          EMSL: {
            AHU8: {
              "Not Economizing When Unit Should Dx": {},
              "Economizing When Unit Should Not Dx": {},
              "Temperature Sensor Dx": {},
              "Insufficient Outdoor-air Intake Dx": {},
              "Excess Outdoor-air Intake Dx": {},
            },
            AHU6: {
              "Excess Outdoor-air Intake Dx": {},
              "Temperature Sensor Dx": {},
              "Not Economizing When Unit Should Dx": {},
              "Economizing When Unit Should Not Dx": {},
              "Insufficient Outdoor-air Intake Dx": {},
            },
            AHU7: {
              "Economizing When Unit Should Not Dx": {},
              "Excess Outdoor-air Intake Dx": {},
              "Temperature Sensor Dx": {},
              "Not Economizing When Unit Should Dx": {},
              "Insufficient Outdoor-air Intake Dx": {},
            },
            AHU20: {
              "Not Economizing When Unit Should Dx": {},
              "Excess Outdoor-air Intake Dx": {},
              "Economizing When Unit Should Not Dx": {},
              "Insufficient Outdoor-air Intake Dx": {},
              "Temperature Sensor Dx": {},
            },
            AHU12: {
              "Economizing When Unit Should Not Dx": {},
              "Insufficient Outdoor-air Intake Dx": {},
              "Temperature Sensor Dx": {},
              "Not Economizing When Unit Should Dx": {},
              "Excess Outdoor-air Intake Dx": {},
            },
            AHU9: {
              "Not Economizing When Unit Should Dx": {},
              "Excess Outdoor-air Intake Dx": {},
              "Economizing When Unit Should Not Dx": {},
              "Insufficient Outdoor-air Intake Dx": {},
              "Temperature Sensor Dx": {},
            },
            AHU10: {
              "Not Economizing When Unit Should Dx": {},
              "Excess Outdoor-air Intake Dx": {},
              "Economizing When Unit Should Not Dx": {},
              "Temperature Sensor Dx": {},
              "Insufficient Outdoor-air Intake Dx": {},
            },
            AHU11: {
              "Not Economizing When Unit Should Dx": {},
              "Insufficient Outdoor-air Intake Dx": {},
              "Excess Outdoor-air Intake Dx": {},
              "Economizing When Unit Should Not Dx": {},
              "Temperature Sensor Dx": {},
            },
            AHU13: {
              "Economizing When Unit Should Not Dx": {},
              "Insufficient Outdoor-air Intake Dx": {},
              "Excess Outdoor-air Intake Dx": {},
              "Not Economizing When Unit Should Dx": {},
              "Temperature Sensor Dx": {},
            },
          },
          ROI: {
            INTERIOR_AHU: {
              "Insufficient Outdoor-air Intake Dx": {},
              "Excess Outdoor-air Intake Dx": {},
              "Economizing When Unit Should Not Dx": {},
              "Temperature Sensor Dx": {},
              "Not Economizing When Unit Should Dx": {},
            },
            PERIMETER_AHU: {
              "Economizing When Unit Should Not Dx": {},
              "Not Economizing When Unit Should Dx": {},
              "Excess Outdoor-air Intake Dx": {},
              "Insufficient Outdoor-air Intake Dx": {},
              "Temperature Sensor Dx": {},
            },
          },
          "350_BUILDING": {
            HP4: {
              "Insufficient Outdoor-air Intake Dx": {},
              "Temperature Sensor Dx": {},
              "Economizing When Unit Should Not Dx": {},
              "Excess Outdoor-air Intake Dx": {},
              "Not Economizing When Unit Should Dx": {},
            },
            HP6: {
              "Economizing When Unit Should Not Dx": {},
              "Insufficient Outdoor-air Intake Dx": {},
              "Excess Outdoor-air Intake Dx": {},
              "Temperature Sensor Dx": {},
              "Not Economizing When Unit Should Dx": {},
            },
            HP7: {
              "Economizing When Unit Should Not Dx": {},
              "Excess Outdoor-air Intake Dx": {},
              "Insufficient Outdoor-air Intake Dx": {},
              "Temperature Sensor Dx": {},
              "Not Economizing When Unit Should Dx": {},
            },
            HP3: {
              "Excess Outdoor-air Intake Dx": {},
              "Insufficient Outdoor-air Intake Dx": {},
              "Temperature Sensor Dx": {},
              "Economizing When Unit Should Not Dx": {},
              "Not Economizing When Unit Should Dx": {},
            },
            HP5: {
              "Insufficient Outdoor-air Intake Dx": {},
              "Economizing When Unit Should Not Dx": {},
              "Not Economizing When Unit Should Dx": {},
              "Temperature Sensor Dx": {},
              "Excess Outdoor-air Intake Dx": {},
            },
          },
          "3860_BUILDING": {
            AHU1: {
              "Economizing When Unit Should Not Dx": {},
              "Excess Outdoor-air Intake Dx": {},
              "Not Economizing When Unit Should Dx": {},
              "Temperature Sensor Dx": {},
              "Insufficient Outdoor-air Intake Dx": {},
            },
            AHU2: {
              "Economizing When Unit Should Not Dx": {},
              "Insufficient Outdoor-air Intake Dx": {},
              "Excess Outdoor-air Intake Dx": {},
              "Temperature Sensor Dx": {},
              "Not Economizing When Unit Should Dx": {},
            },
          },
        },
        "PNNL-SEQUIM": {
          MSL5: {
            AHU1: {
              "Not Economizing When Unit Should Dx": {},
              "Temperature Sensor Dx": {},
              "Economizing When Unit Should Not Dx": {},
              "Excess Outdoor-air Intake Dx": {},
              "Insufficient Outdoor-air Intake Dx": {},
            },
          },
        },
      },
      AirsideAIRCx: {
        PNNL: {
          BSF_CSF: {
            RTU3: {
              "Duct Static Pressure Set Point Control Loop Dx": {},
              "High Supply-air Temperature Dx": {},
              "Low Duct Static Pressure Dx": {},
              "No Supply-air Temperature Reset Dx": {},
              "No Static Pressure Reset Dx": {},
              "High Duct Static Pressure Dx": {},
              "Supply-air Temperature Set Point Control Loop Dx": {},
              "Low Supply-air Temperature Dx": {},
              "Operational Schedule Dx": {},
            },
            RTU4: {
              "Duct Static Pressure Set Point Control Loop Dx": {},
              "High Supply-air Temperature Dx": {},
              "No Supply-air Temperature Reset Dx": {},
              "Operational Schedule Dx": {},
              "No Static Pressure Reset Dx": {},
              "Low Duct Static Pressure Dx": {},
              "Supply-air Temperature Set Point Control Loop Dx": {},
              "High Duct Static Pressure Dx": {},
              "Low Supply-air Temperature Dx": {},
            },
            RTU5: {
              "No Supply-air Temperature Reset Dx": {},
              "Operational Schedule Dx": {},
              "High Duct Static Pressure Dx": {},
              "Duct Static Pressure Set Point Control Loop Dx": {},
              "High Supply-air Temperature Dx": {},
              "Supply-air Temperature Set Point Control Loop Dx": {},
              "Low Supply-air Temperature Dx": {},
              "Low Duct Static Pressure Dx": {},
              "No Static Pressure Reset Dx": {},
            },
          },
          SEB: {
            AHU1: {
              "High Duct Static Pressure Dx": {},
              "Low Duct Static Pressure Dx": {},
              "Operational Schedule Dx": {},
              "Duct Static Pressure Set Point Control Loop Dx": {},
              "High Supply-air Temperature Dx": {},
              "Supply-air Temperature Set Point Control Loop Dx": {},
              "Low Supply-air Temperature Dx": {},
              "No Supply-air Temperature Reset Dx": {},
              "No Static Pressure Reset Dx": {},
            },
            AHU3: {
              "No Static Pressure Reset Dx": {},
              "Supply-air Temperature Set Point Control Loop Dx": {},
              "No Supply-air Temperature Reset Dx": {},
              "High Duct Static Pressure Dx": {},
              "Operational Schedule Dx": {},
              "High Supply-air Temperature Dx": {},
              "Low Duct Static Pressure Dx": {},
              "Duct Static Pressure Set Point Control Loop Dx": {},
              "Low Supply-air Temperature Dx": {},
            },
          },
          EMSL: {
            AHU6: {
              "Low Supply-air Temperature Dx": {},
              "Supply-air Temperature Set Point Control Loop Dx": {},
              "Low Duct Static Pressure Dx": {},
              "No Static Pressure Reset Dx": {},
              "No Supply-air Temperature Reset Dx": {},
              "High Supply-air Temperature Dx": {},
              "Duct Static Pressure Set Point Control Loop Dx": {},
              "High Duct Static Pressure Dx": {},
              "Operational Schedule Dx": {},
            },
            AHU20: {
              "Low Duct Static Pressure Dx": {},
              "Duct Static Pressure Set Point Control Loop Dx": {},
              "High Duct Static Pressure Dx": {},
              "Low Supply-air Temperature Dx": {},
              "No Static Pressure Reset Dx": {},
              "Operational Schedule Dx": {},
              "Supply-air Temperature Set Point Control Loop Dx": {},
              "High Supply-air Temperature Dx": {},
              "No Supply-air Temperature Reset Dx": {},
            },
            AHU8: {
              "High Duct Static Pressure Dx": {},
              "High Supply-air Temperature Dx": {},
              "Duct Static Pressure Set Point Control Loop Dx": {},
              "Low Supply-air Temperature Dx": {},
              "No Static Pressure Reset Dx": {},
              "Supply-air Temperature Set Point Control Loop Dx": {},
              "Low Duct Static Pressure Dx": {},
              "Operational Schedule Dx": {},
              "No Supply-air Temperature Reset Dx": {},
            },
            AHU7: {
              "Low Duct Static Pressure Dx": {},
              "No Static Pressure Reset Dx": {},
              "Low Supply-air Temperature Dx": {},
              "High Duct Static Pressure Dx": {},
              "Operational Schedule Dx": {},
              "No Supply-air Temperature Reset Dx": {},
              "Supply-air Temperature Set Point Control Loop Dx": {},
              "High Supply-air Temperature Dx": {},
              "Duct Static Pressure Set Point Control Loop Dx": {},
            },
            AHU10: {
              "High Supply-air Temperature Dx": {},
              "Low Duct Static Pressure Dx": {},
              "No Static Pressure Reset Dx": {},
              "Duct Static Pressure Set Point Control Loop Dx": {},
              "Supply-air Temperature Set Point Control Loop Dx": {},
              "High Duct Static Pressure Dx": {},
              "No Supply-air Temperature Reset Dx": {},
              "Low Supply-air Temperature Dx": {},
              "Operational Schedule Dx": {},
            },
            AHU9: {
              "High Duct Static Pressure Dx": {},
              "Low Supply-air Temperature Dx": {},
              "Duct Static Pressure Set Point Control Loop Dx": {},
              "Low Duct Static Pressure Dx": {},
              "High Supply-air Temperature Dx": {},
              "Supply-air Temperature Set Point Control Loop Dx": {},
              "Operational Schedule Dx": {},
              "No Supply-air Temperature Reset Dx": {},
              "No Static Pressure Reset Dx": {},
            },
          },
          ROII: {
            INTERIOR_AHU: {
              "Low Duct Static Pressure Dx": {},
              "Low Supply-air Temperature Dx": {},
              "High Duct Static Pressure Dx": {},
              "Operational Schedule Dx": {},
              "No Supply-air Temperature Reset Dx": {},
              "High Supply-air Temperature Dx": {},
              "Supply-air Temperature Set Point Control Loop Dx": {},
              "Duct Static Pressure Set Point Control Loop Dx": {},
              "No Static Pressure Reset Dx": {},
            },
          },
          ROI: {
            INTERIOR_AHU: {
              "Operational Schedule Dx": {},
              "No Static Pressure Reset Dx": {},
              "Supply-air Temperature Set Point Control Loop Dx": {},
              "High Duct Static Pressure Dx": {},
              "Low Supply-air Temperature Dx": {},
              "Low Duct Static Pressure Dx": {},
              "Duct Static Pressure Set Point Control Loop Dx": {},
              "High Supply-air Temperature Dx": {},
              "No Supply-air Temperature Reset Dx": {},
            },
          },
          "3860_BUILDING": {
            AHU2: {
              "Supply-air Temperature Set Point Control Loop Dx": {},
              "Duct Static Pressure Set Point Control Loop Dx": {},
              "No Static Pressure Reset Dx": {},
              "Low Supply-air Temperature Dx": {},
              "High Duct Static Pressure Dx": {},
              "High Supply-air Temperature Dx": {},
              "Low Duct Static Pressure Dx": {},
              "Operational Schedule Dx": {},
              "No Supply-air Temperature Reset Dx": {},
            },
            AHU1: {
              "High Supply-air Temperature Dx": {},
              "Duct Static Pressure Set Point Control Loop Dx": {},
              "Operational Schedule Dx": {},
              "No Supply-air Temperature Reset Dx": {},
              "No Static Pressure Reset Dx": {},
              "Low Supply-air Temperature Dx": {},
              "Supply-air Temperature Set Point Control Loop Dx": {},
              "Low Duct Static Pressure Dx": {},
              "High Duct Static Pressure Dx": {},
            },
          },
        },
        "PNNL-SEQUIM": {
          MSL5: {
            AHU1: {
              "Low Duct Static Pressure Dx": {},
              "Supply-air Temperature Set Point Control Loop Dx": {},
              "High Duct Static Pressure Dx": {},
              "Duct Static Pressure Set Point Control Loop Dx": {},
              "Low Supply-air Temperature Dx": {},
              "No Supply-air Temperature Reset Dx": {},
              "High Supply-air Temperature Dx": {},
              "No Static Pressure Reset Dx": {},
              "Operational Schedule Dx": {},
            },
          },
        },
      },
    },
  },
  [SERVICE_ENDPOINT_DIAGNOSTICS]: {
    payload: {
      site: "PNNL",
      building: "SEB",
      device: "AHU1",
      diagnostic: "Economizer_RCx",
      start: "2019-04-27T00:00:00-07:00",
      end: "2020-04-27T00:00:00-07:00",
    },
    result: {
      "Not Economizing When Unit Should Dx": [
        [
          "2017-09-06T20:57:26.784000+00:00",
          {
            high: 11.1,
            low: 11.1,
            normal: 11.1,
          },
        ],
        [
          "2017-09-06T21:29:26.783000+00:00",
          {
            high: 11.1,
            low: 11.1,
            normal: 11.1,
          },
        ],
        [
          "2017-09-06T22:01:26.781000+00:00",
          {
            high: 11.1,
            low: 11.1,
            normal: 11.1,
          },
        ],
        [
          "2017-09-06T22:41:26.782000+00:00",
          {
            high: 11.1,
            low: 11.1,
            normal: 11.1,
          },
        ],
        [
          "2017-09-06T23:13:26.782000+00:00",
          {
            high: 11.1,
            low: 11.1,
            normal: 11.1,
          },
        ],
        [
          "2017-09-06T23:45:26.782000+00:00",
          {
            high: 11.1,
            low: 11.1,
            normal: 11.1,
          },
        ],
        [
          "2017-09-07T00:17:26.781000+00:00",
          {
            high: 11.1,
            low: 11.1,
            normal: 11.1,
          },
        ],
        [
          "2017-09-07T00:49:26.782000+00:00",
          {
            high: 11.1,
            low: 11.1,
            normal: 11.1,
          },
        ],
        [
          "2017-09-07T01:30:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T02:01:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T02:33:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T03:05:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T03:36:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T04:08:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T04:39:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T05:11:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T05:42:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T06:13:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T06:45:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T07:17:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T07:48:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T08:20:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T08:52:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T09:23:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T09:54:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T10:25:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T10:56:26.785000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T11:28:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T11:59:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T12:31:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T13:02:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T13:34:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T14:05:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T14:37:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T15:09:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T15:40:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T16:11:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T16:43:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T17:14:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T17:46:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T18:17:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T18:49:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T19:47:26.782000+00:00",
          {
            high: 11.1,
            low: 11.1,
            normal: 11.1,
          },
        ],
        [
          "2017-09-07T20:23:26.781000+00:00",
          {
            high: -89,
            low: -89,
            normal: -89,
          },
        ],
        [
          "2017-09-07T20:55:26.783000+00:00",
          {
            high: -89,
            low: -89,
            normal: -89,
          },
        ],
        [
          "2017-09-07T21:29:26.782000+00:00",
          {
            high: 11.1,
            low: 11.1,
            normal: 11.1,
          },
        ],
        [
          "2017-09-07T22:12:26.782000+00:00",
          {
            high: -89,
            low: -89,
            normal: -89,
          },
        ],
        [
          "2017-09-07T22:44:26.782000+00:00",
          {
            high: -89,
            low: -89,
            normal: -89,
          },
        ],
        [
          "2017-09-07T23:17:26.782000+00:00",
          {
            high: 11.1,
            low: 11.1,
            normal: 11.1,
          },
        ],
        [
          "2017-09-07T23:48:26.782000+00:00",
          {
            high: 11.1,
            low: 11.1,
            normal: 11.1,
          },
        ],
        [
          "2017-09-08T00:19:26.784000+00:00",
          {
            high: 11.1,
            low: 11.1,
            normal: 11.1,
          },
        ],
        [
          "2017-09-08T00:51:26.782000+00:00",
          {
            high: 11.1,
            low: 11.1,
            normal: 11.1,
          },
        ],
        [
          "2017-09-08T01:23:26.781000+00:00",
          {
            high: 11.1,
            low: 11.1,
            normal: 11.1,
          },
        ],
        [
          "2017-09-08T01:54:26.784000+00:00",
          {
            high: 11.1,
            low: 11.1,
            normal: 11.1,
          },
        ],
        [
          "2017-09-08T02:25:26.783000+00:00",
          {
            high: 11.1,
            low: 11.1,
            normal: 11.1,
          },
        ],
        [
          "2017-09-08T03:16:26.783000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T03:47:26.784000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T04:18:26.782000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T04:50:26.782000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T05:21:26.782000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T05:53:26.784000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T06:25:26.783000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T06:57:26.781000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T07:28:26.782000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T07:59:26.784000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T08:30:26.782000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T09:01:26.784000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T09:32:26.784000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T10:04:26.781000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T10:35:26.783000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T11:07:26.782000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T11:38:26.782000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T12:10:26.781000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T12:42:26.784000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T13:14:26.782000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T13:46:26.782000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T14:17:26.783000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T14:49:26.784000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T15:20:26.783000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T15:51:26.784000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T16:22:26.782000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T16:54:26.781000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T17:26:26.781000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T17:57:26.782000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T18:28:26.785000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T19:25:26.783000+00:00",
          {
            high: 11.1,
            low: 11.1,
            normal: 11.1,
          },
        ],
        [
          "2017-09-08T19:56:26.782000+00:00",
          {
            high: 11.1,
            low: 11.1,
            normal: 11.1,
          },
        ],
        [
          "2017-09-08T20:28:26.781000+00:00",
          {
            high: 11.1,
            low: 11.1,
            normal: 11.1,
          },
        ],
        [
          "2017-09-08T21:00:26.784000+00:00",
          {
            high: 11.1,
            low: 11.1,
            normal: 11.1,
          },
        ],
        [
          "2017-09-08T21:31:26.782000+00:00",
          {
            high: 11.1,
            low: 11.1,
            normal: 11.1,
          },
        ],
        [
          "2017-09-08T22:30:26.782000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T23:02:26.784000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-08T23:34:26.782000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-09T00:05:26.782000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-09T00:37:26.782000+00:00",
          {
            high: 14.2,
            low: 14.2,
            normal: 14.2,
          },
        ],
        [
          "2017-09-09T01:30:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-09T02:01:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-09T02:33:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-09T03:05:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-09T03:37:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
      ],
      "Temperature Sensor Dx": [
        [
          "2017-09-06T20:26:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-06T20:57:26.784000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-06T21:29:26.783000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-06T22:01:26.781000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-06T22:41:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-06T23:13:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-06T23:45:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-07T00:17:26.781000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-07T00:49:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-07T01:30:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T02:01:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T02:33:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T03:05:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T03:36:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T04:08:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T04:39:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T05:11:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T05:42:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T06:13:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T06:45:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T07:17:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T07:48:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T08:20:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T08:52:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T09:23:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T09:54:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T10:25:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T10:56:26.785000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T11:28:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T11:59:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T12:31:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T13:02:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T13:34:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T14:05:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T14:37:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T15:09:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T15:40:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T16:11:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T16:43:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T17:14:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T17:46:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T18:17:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T18:49:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T19:43:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-07T20:23:26.781000+00:00",
          {
            high: -89,
            low: -89,
            normal: -89,
          },
        ],
        [
          "2017-09-07T20:55:26.783000+00:00",
          {
            high: -89,
            low: -89,
            normal: -89,
          },
        ],
        [
          "2017-09-07T21:26:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-07T22:12:26.782000+00:00",
          {
            high: -89,
            low: -89,
            normal: -89,
          },
        ],
        [
          "2017-09-07T22:44:26.782000+00:00",
          {
            high: -89,
            low: -89,
            normal: -89,
          },
        ],
        [
          "2017-09-07T23:14:26.809000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-07T23:45:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T00:16:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T00:47:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T01:19:26.783000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T01:51:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T02:22:26.784000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T02:54:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T03:25:26.783000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T03:56:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T04:27:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T04:59:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T05:31:26.781000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T06:03:26.781000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T06:34:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T07:06:26.784000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T07:38:26.781000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T08:10:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T08:41:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T09:12:26.784000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T09:43:26.781000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T10:15:26.781000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T10:47:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T11:19:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T11:51:26.781000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T12:22:26.783000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T12:53:26.781000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T13:25:26.784000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T13:56:26.783000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T14:28:26.783000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T15:00:26.781000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T15:32:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T16:03:26.783000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T16:34:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T17:06:26.783000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T17:38:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T18:09:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T18:40:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T19:11:26.784000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T19:42:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T20:13:26.783000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T20:44:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T21:15:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T21:46:26.781000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T22:17:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T22:49:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T23:21:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-08T23:52:26.782000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-09T00:23:26.783000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-09T00:54:26.784000+00:00",
          {
            high: 0,
            low: 0,
            normal: 0,
          },
        ],
        [
          "2017-09-09T01:30:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
      ],
      "Economizing When Unit Should Not Dx": [
        [
          "2017-09-06T20:57:26.784000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-06T21:29:26.783000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-06T22:01:26.781000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-06T22:41:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-06T23:13:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-06T23:45:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-07T00:17:26.781000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-07T00:49:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-07T01:30:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T02:01:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T02:33:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T03:05:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T03:36:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T04:08:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T04:39:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T05:11:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T05:42:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T06:13:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T06:45:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T07:17:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T07:48:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T08:20:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T08:52:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T09:23:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T09:54:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T10:25:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T10:56:26.785000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T11:28:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T11:59:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T12:31:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T13:02:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T13:34:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T14:05:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T14:37:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T15:09:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T15:40:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T16:11:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T16:43:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T17:14:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T17:46:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T18:17:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T18:49:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T19:43:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-07T20:23:26.781000+00:00",
          {
            high: -89,
            low: -89,
            normal: -89,
          },
        ],
        [
          "2017-09-07T20:55:26.783000+00:00",
          {
            high: -89,
            low: -89,
            normal: -89,
          },
        ],
        [
          "2017-09-07T21:26:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-07T22:12:26.782000+00:00",
          {
            high: -89,
            low: -89,
            normal: -89,
          },
        ],
        [
          "2017-09-07T22:44:26.782000+00:00",
          {
            high: -89,
            low: -89,
            normal: -89,
          },
        ],
        [
          "2017-09-07T23:14:26.809000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-07T23:45:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T00:16:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T00:47:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T01:19:26.783000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T01:51:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T02:22:26.784000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T02:54:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T03:25:26.783000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T03:56:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T04:27:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T04:59:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T05:31:26.781000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T06:03:26.781000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T06:34:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T07:06:26.784000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T07:38:26.781000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T08:10:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T08:41:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T09:12:26.784000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T09:43:26.781000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T10:15:26.781000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T10:47:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T11:19:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T11:51:26.781000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T12:22:26.783000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T12:53:26.781000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T13:25:26.784000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T13:56:26.783000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T14:28:26.783000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T15:00:26.781000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T15:32:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T16:03:26.783000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T16:34:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T17:06:26.783000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T17:38:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T18:09:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T18:40:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T19:11:26.784000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T19:42:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T20:13:26.783000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T20:44:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T21:15:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T21:46:26.781000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T22:17:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T22:49:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T23:21:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-08T23:52:26.782000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-09T00:23:26.783000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-09T00:54:26.784000+00:00",
          {
            high: 25.2,
            low: 25.2,
            normal: 25.2,
          },
        ],
        [
          "2017-09-09T01:30:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-09T02:01:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
      ],
      "Excess Outdoor-air Intake Dx": [
        [
          "2017-09-06T20:57:26.784000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-06T21:29:26.783000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-06T22:01:26.781000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-06T22:41:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-06T23:13:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-06T23:45:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-07T00:17:26.781000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-07T00:49:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-07T01:30:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T02:01:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T02:33:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T03:05:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T03:36:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T04:08:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T04:39:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T05:11:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T05:42:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T06:13:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T06:45:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T07:17:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T07:48:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T08:20:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T08:52:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T09:23:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T09:54:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T10:25:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T10:56:26.785000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T11:28:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T11:59:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T12:31:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T13:02:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T13:34:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T14:05:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T14:37:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T15:09:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T15:40:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T16:11:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T16:43:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T17:14:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T17:46:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T18:17:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T18:49:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T19:43:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-07T20:23:26.781000+00:00",
          {
            high: -89,
            low: -89,
            normal: -89,
          },
        ],
        [
          "2017-09-07T20:55:26.783000+00:00",
          {
            high: -89,
            low: -89,
            normal: -89,
          },
        ],
        [
          "2017-09-07T21:26:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-07T22:12:26.782000+00:00",
          {
            high: -89,
            low: -89,
            normal: -89,
          },
        ],
        [
          "2017-09-07T22:44:26.782000+00:00",
          {
            high: -89,
            low: -89,
            normal: -89,
          },
        ],
        [
          "2017-09-07T23:14:26.809000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-07T23:45:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T00:16:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T00:47:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T01:19:26.783000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T01:51:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T02:22:26.784000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T02:54:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T03:25:26.783000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T03:56:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T04:27:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T04:59:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T05:31:26.781000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T06:03:26.781000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T06:34:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T07:06:26.784000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T07:38:26.781000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T08:10:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T08:41:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T09:12:26.784000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T09:43:26.781000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T10:15:26.781000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T10:47:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T11:19:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T11:51:26.781000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T12:22:26.783000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T12:53:26.781000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T13:25:26.784000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T13:56:26.783000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T14:28:26.783000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T15:00:26.781000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T15:32:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T16:03:26.783000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T16:34:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T17:06:26.783000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T17:38:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T18:09:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T18:40:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T19:11:26.784000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T19:42:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T20:13:26.783000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T20:44:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T21:15:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T21:46:26.781000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T22:17:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T22:49:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T23:21:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-08T23:52:26.782000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-09T00:23:26.783000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-09T00:54:26.784000+00:00",
          {
            high: 36.2,
            low: 36.2,
            normal: 36.2,
          },
        ],
        [
          "2017-09-09T01:30:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-09T02:01:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
      ],
      "Insufficient Outdoor-air Intake Dx": [
        [
          "2017-09-06T20:57:26.784000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-06T21:29:26.783000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-06T22:01:26.781000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-06T22:41:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-06T23:13:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-06T23:45:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-07T00:17:26.781000+00:00",
          {
            high: 43.1,
            low: 40,
            normal: 43.1,
          },
        ],
        [
          "2017-09-07T00:49:26.782000+00:00",
          {
            high: 43.1,
            low: 40,
            normal: 43.1,
          },
        ],
        [
          "2017-09-07T01:30:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T02:01:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T02:33:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T03:05:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T03:36:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T04:08:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T04:39:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T05:11:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T05:42:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T06:13:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T06:45:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T07:17:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T07:48:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T08:20:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T08:52:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T09:23:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T09:54:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T10:25:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T10:56:26.785000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T11:28:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T11:59:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T12:31:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T13:02:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T13:34:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T14:05:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T14:37:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T15:09:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T15:40:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T16:11:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T16:43:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T17:14:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T17:46:26.781000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T18:17:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T18:49:26.782000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-07T19:43:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-07T20:23:26.781000+00:00",
          {
            high: -89,
            low: -89,
            normal: -89,
          },
        ],
        [
          "2017-09-07T20:55:26.783000+00:00",
          {
            high: -89,
            low: -89,
            normal: -89,
          },
        ],
        [
          "2017-09-07T21:26:26.782000+00:00",
          {
            high: 41.2,
            low: 41.2,
            normal: 41.2,
          },
        ],
        [
          "2017-09-07T22:12:26.782000+00:00",
          {
            high: -89,
            low: -89,
            normal: -89,
          },
        ],
        [
          "2017-09-07T22:44:26.782000+00:00",
          {
            high: -89,
            low: -89,
            normal: -89,
          },
        ],
        [
          "2017-09-07T23:14:26.809000+00:00",
          {
            high: 41.2,
            low: 41.2,
            normal: 41.2,
          },
        ],
        [
          "2017-09-07T23:45:26.782000+00:00",
          {
            high: 41.2,
            low: 41.2,
            normal: 41.2,
          },
        ],
        [
          "2017-09-08T00:16:26.782000+00:00",
          {
            high: 41.2,
            low: 41.2,
            normal: 41.2,
          },
        ],
        [
          "2017-09-08T00:47:26.782000+00:00",
          {
            high: 41.2,
            low: 41.2,
            normal: 41.2,
          },
        ],
        [
          "2017-09-08T01:19:26.783000+00:00",
          {
            high: 41.2,
            low: 41.2,
            normal: 41.2,
          },
        ],
        [
          "2017-09-08T01:51:26.782000+00:00",
          {
            high: 43.1,
            low: 43.1,
            normal: 43.1,
          },
        ],
        [
          "2017-09-08T02:22:26.784000+00:00",
          {
            high: 43.1,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T02:54:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T03:25:26.783000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T03:56:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T04:27:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T04:59:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T05:31:26.781000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T06:03:26.781000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T06:34:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T07:06:26.784000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T07:38:26.781000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T08:10:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T08:41:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T09:12:26.784000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T09:43:26.781000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T10:15:26.781000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T10:47:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T11:19:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T11:51:26.781000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T12:22:26.783000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T12:53:26.781000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T13:25:26.784000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T13:56:26.783000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T14:28:26.783000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T15:00:26.781000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T15:32:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T16:03:26.783000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T16:34:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T17:06:26.783000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T17:38:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T18:09:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T18:40:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T19:11:26.784000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T19:42:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T20:13:26.783000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T20:44:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T21:15:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T21:46:26.781000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T22:17:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T22:49:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T23:21:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-08T23:52:26.782000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-09T00:23:26.783000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-09T00:54:26.784000+00:00",
          {
            high: 40,
            low: 40,
            normal: 40,
          },
        ],
        [
          "2017-09-09T01:30:26.783000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
        [
          "2017-09-09T02:01:26.784000+00:00",
          {
            high: -99,
            low: -99,
            normal: -99,
          },
        ],
      ],
    },
  },
};
