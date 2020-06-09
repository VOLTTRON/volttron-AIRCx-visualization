import _ from "lodash";
import {
  SERVICE_ENDPOINT_DETAILED,
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
  [SERVICE_ENDPOINT_DETAILED]: {
    payload: {
      site: "PNNL",
      building: "SEB",
      device: "AHU1",
      diagnostic: "Economizer_RCx",
      start: "2019-09-02T00:00:00-07:00",
      end: "2020-09-03T00:00:00-07:00",
      topic: [
        "PNNL/SEB/AHU1/VAV121_ENERGY/TerminalBoxHotWaterFlowRate",
        "PNNL/SEB/AHU1/VAV121_ENERGY/TerminalBoxHotWaterPower",
        "PNNL/SEB/AHU1/VAV133_ENERGY/TerminalBoxHotWaterSupplyTemperature",
        "PNNL/SEB/AHU1/ReturnAirTemperature",
        "PNNL/SEB/AHU1/OutdoorDamperSignal",
        "PNNL/SEB/AHU1/ChilledWaterValvePosition",
        "PNNL/SEB/AHU1/ExhaustAirFlow",
        "PNNL/SEB/AHU1/SUPPLY_FAN/SupplyFanSpeed",
      ],
    },
    result: {
      ReturnAirTemperature: [
        ["2019-09-02T07:00:00.516000+00:00", 73.73231506347656],
        ["2019-09-02T07:01:00.518000+00:00", 73.65031433105469],
        ["2019-09-02T07:02:00.516000+00:00", 73.58885192871094],
        ["2019-09-02T07:03:00.271000+00:00", 73.54792785644531],
        ["2019-09-02T07:04:00.516000+00:00", 73.50700378417969],
        ["2019-09-02T07:05:00.516000+00:00", 73.46609497070312],
        ["2019-09-02T07:06:00.528000+00:00", 73.42522430419922],
        ["2019-09-02T07:07:00.270000+00:00", 73.38435363769531],
        ["2019-09-02T07:08:00.516000+00:00", 73.32310485839844],
        ["2019-09-02T07:09:00.517000+00:00", 73.26187133789062],
        ["2019-09-02T07:10:00.517000+00:00", 73.22108459472656],
        ["2019-09-02T07:11:00.516000+00:00", 73.18031311035156],
        ["2019-09-02T07:12:00.516000+00:00", 73.1599349975586],
        ["2019-09-02T07:13:00.516000+00:00", 73.09883117675781],
        ["2019-09-02T07:14:00.271000+00:00", 73.07846069335938],
        ["2019-09-02T07:15:00.516000+00:00", 73.05812072753906],
        ["2019-09-02T07:16:00.516000+00:00", 73.05812072753906],
        ["2019-09-02T07:17:00.516000+00:00", 73.03778076171875],
        ["2019-09-02T07:18:00.516000+00:00", 73.01742553710938],
        ["2019-09-02T07:19:00.270000+00:00", 73.01742553710938],
        ["2019-09-02T07:20:00.517000+00:00", 73.01742553710938],
        ["2019-09-02T07:21:00.519000+00:00", 73.01742553710938],
        ["2019-09-02T07:22:00.516000+00:00", 73.03778076171875],
        ["2019-09-02T07:23:00.519000+00:00", 73.01742553710938],
        ["2019-09-02T07:24:00.519000+00:00", 73.03778076171875],
        ["2019-09-02T07:25:00.272000+00:00", 73.03778076171875],
        ["2019-09-02T07:26:00.515000+00:00", 73.03778076171875],
        ["2019-09-02T07:27:00.517000+00:00", 73.05812072753906],
        ["2019-09-02T07:28:00.517000+00:00", 73.03778076171875],
        ["2019-09-02T07:29:00.516000+00:00", 73.03778076171875],
        ["2019-09-02T07:30:00.516000+00:00", 73.03778076171875],
        ["2019-09-02T07:31:00.518000+00:00", 73.03778076171875],
        ["2019-09-02T07:32:00.273000+00:00", 73.03778076171875],
        ["2019-09-02T07:33:00.516000+00:00", 73.03778076171875],
        ["2019-09-02T07:34:00.516000+00:00", 73.01742553710938],
        ["2019-09-02T07:35:00.517000+00:00", 73.01742553710938],
        ["2019-09-02T07:36:00.269000+00:00", 73.03778076171875],
        ["2019-09-02T07:37:00.518000+00:00", 73.03778076171875],
        ["2019-09-02T07:38:00.518000+00:00", 73.07846069335938],
        ["2019-09-02T07:39:00.279000+00:00", 73.09883117675781],
        ["2019-09-02T07:40:00.516000+00:00", 73.09883117675781],
        ["2019-09-02T07:41:00.516000+00:00", 73.07846069335938],
        ["2019-09-02T07:42:00.518000+00:00", 73.05812072753906],
        ["2019-09-02T07:43:00.516000+00:00", 73.05812072753906],
        ["2019-09-02T07:44:00.531000+00:00", 73.03778076171875],
        ["2019-09-02T07:45:00.532000+00:00", 73.05812072753906],
        ["2019-09-02T07:46:00.517000+00:00", 73.03778076171875],
        ["2019-09-02T07:47:00.516000+00:00", 73.05812072753906],
        ["2019-09-02T07:48:00.516000+00:00", 73.05812072753906],
        ["2019-09-02T07:49:00.516000+00:00", 73.05812072753906],
        ["2019-09-02T07:50:00.516000+00:00", 73.05812072753906],
        ["2019-09-02T07:51:00.271000+00:00", 73.03778076171875],
        ["2019-09-02T07:52:00.519000+00:00", 73.05812072753906],
        ["2019-09-02T07:53:00.520000+00:00", 73.05812072753906],
        ["2019-09-02T07:54:00.516000+00:00", 73.07846069335938],
        ["2019-09-02T07:55:00.524000+00:00", 73.07846069335938],
        ["2019-09-02T07:56:00.268000+00:00", 73.07846069335938],
        ["2019-09-02T07:57:00.516000+00:00", 73.07846069335938],
        ["2019-09-02T07:58:00.517000+00:00", 73.09883117675781],
        ["2019-09-02T07:59:00.516000+00:00", 73.07846069335938],
        ["2019-09-02T08:00:00.516000+00:00", 73.07846069335938],
        ["2019-09-02T08:01:00.271000+00:00", 73.07846069335938],
        ["2019-09-02T08:02:00.521000+00:00", 73.07846069335938],
        ["2019-09-02T08:03:00.516000+00:00", 73.07846069335938],
        ["2019-09-02T08:04:00.517000+00:00", 73.07846069335938],
        ["2019-09-02T08:05:00.516000+00:00", 73.07846069335938],
        ["2019-09-02T08:06:00.516000+00:00", 73.05812072753906],
        ["2019-09-02T08:07:00.272000+00:00", 73.05812072753906],
        ["2019-09-02T08:08:00.516000+00:00", 73.05812072753906],
        ["2019-09-02T08:09:00.266000+00:00", 73.05812072753906],
        ["2019-09-02T08:10:00.516000+00:00", 73.05812072753906],
        ["2019-09-02T08:11:00.516000+00:00", 73.07846069335938],
        ["2019-09-02T08:12:00.519000+00:00", 73.07846069335938],
        ["2019-09-02T08:13:00.515000+00:00", 73.07846069335938],
        ["2019-09-02T08:14:00.516000+00:00", 73.07846069335938],
        ["2019-09-02T08:15:00.517000+00:00", 73.05812072753906],
        ["2019-09-02T08:16:00.515000+00:00", 73.07846069335938],
        ["2019-09-02T08:17:00.524000+00:00", 73.07846069335938],
        ["2019-09-02T08:18:00.516000+00:00", 73.05812072753906],
        ["2019-09-02T08:19:00.266000+00:00", 73.07846069335938],
        ["2019-09-02T08:20:00.517000+00:00", 73.07846069335938],
        ["2019-09-02T08:21:00.517000+00:00", 73.07846069335938],
        ["2019-09-02T08:22:00.516000+00:00", 73.09883117675781],
        ["2019-09-02T08:23:00.516000+00:00", 73.11920166015625],
        ["2019-09-02T08:24:00.525000+00:00", 73.11920166015625],
        ["2019-09-02T08:25:00.519000+00:00", 73.13957214355469],
        ["2019-09-02T08:26:00.530000+00:00", 73.1599349975586],
        ["2019-09-02T08:27:00.523000+00:00", 73.18031311035156],
        ["2019-09-02T08:28:00.523000+00:00", 73.20069885253906],
        ["2019-09-02T08:29:00.522000+00:00", 73.20069885253906],
        ["2019-09-02T08:30:00.518000+00:00", 73.20069885253906],
        ["2019-09-02T08:31:00.517000+00:00", 73.24148559570312],
        ["2019-09-02T08:32:00.516000+00:00", 73.26187133789062],
        ["2019-09-02T08:33:00.521000+00:00", 73.28227233886719],
        ["2019-09-02T08:34:00.266000+00:00", 73.32310485839844],
        ["2019-09-02T08:35:00.520000+00:00", 73.34352111816406],
        ["2019-09-02T08:36:00.519000+00:00", 73.36392211914062],
        ["2019-09-02T08:37:00.524000+00:00", 73.38435363769531],
        ["2019-09-02T08:38:00.523000+00:00", 73.40478515625],
        ["2019-09-02T08:39:00.533000+00:00", 73.40478515625],
      ],
      OutdoorDamperSignal: [
        ["2019-09-02T07:00:00.516000+00:00", 100.0],
        ["2019-09-02T07:01:00.518000+00:00", 100.0],
        ["2019-09-02T07:02:00.516000+00:00", 100.0],
        ["2019-09-02T07:03:00.271000+00:00", 100.0],
        ["2019-09-02T07:04:00.516000+00:00", 100.0],
        ["2019-09-02T07:05:00.516000+00:00", 100.0],
        ["2019-09-02T07:06:00.528000+00:00", 100.0],
        ["2019-09-02T07:07:00.270000+00:00", 100.0],
        ["2019-09-02T07:08:00.516000+00:00", 100.0],
        ["2019-09-02T07:09:00.517000+00:00", 100.0],
        ["2019-09-02T07:10:00.517000+00:00", 100.0],
        ["2019-09-02T07:11:00.516000+00:00", 100.0],
        ["2019-09-02T07:12:00.516000+00:00", 100.0],
        ["2019-09-02T07:13:00.516000+00:00", 100.0],
        ["2019-09-02T07:14:00.271000+00:00", 100.0],
        ["2019-09-02T07:15:00.516000+00:00", 100.0],
        ["2019-09-02T07:16:00.516000+00:00", 100.0],
        ["2019-09-02T07:17:00.516000+00:00", 100.0],
        ["2019-09-02T07:18:00.516000+00:00", 100.0],
        ["2019-09-02T07:19:00.270000+00:00", 100.0],
        ["2019-09-02T07:20:00.517000+00:00", 100.0],
        ["2019-09-02T07:21:00.519000+00:00", 100.0],
        ["2019-09-02T07:22:00.516000+00:00", 100.0],
        ["2019-09-02T07:23:00.519000+00:00", 100.0],
        ["2019-09-02T07:24:00.519000+00:00", 100.0],
        ["2019-09-02T07:25:00.272000+00:00", 100.0],
        ["2019-09-02T07:26:00.515000+00:00", 100.0],
        ["2019-09-02T07:27:00.517000+00:00", 100.0],
        ["2019-09-02T07:28:00.517000+00:00", 100.0],
        ["2019-09-02T07:29:00.516000+00:00", 100.0],
        ["2019-09-02T07:30:00.516000+00:00", 100.0],
        ["2019-09-02T07:31:00.518000+00:00", 100.0],
        ["2019-09-02T07:32:00.273000+00:00", 100.0],
        ["2019-09-02T07:33:00.516000+00:00", 100.0],
        ["2019-09-02T07:34:00.516000+00:00", 100.0],
        ["2019-09-02T07:35:00.517000+00:00", 100.0],
        ["2019-09-02T07:36:00.269000+00:00", 100.0],
        ["2019-09-02T07:37:00.518000+00:00", 100.0],
        ["2019-09-02T07:38:00.518000+00:00", 100.0],
        ["2019-09-02T07:39:00.279000+00:00", 100.0],
        ["2019-09-02T07:40:00.516000+00:00", 100.0],
        ["2019-09-02T07:41:00.516000+00:00", 100.0],
        ["2019-09-02T07:42:00.518000+00:00", 100.0],
        ["2019-09-02T07:43:00.516000+00:00", 100.0],
        ["2019-09-02T07:44:00.531000+00:00", 100.0],
        ["2019-09-02T07:45:00.532000+00:00", 100.0],
        ["2019-09-02T07:46:00.517000+00:00", 100.0],
        ["2019-09-02T07:47:00.516000+00:00", 100.0],
        ["2019-09-02T07:48:00.516000+00:00", 100.0],
        ["2019-09-02T07:49:00.516000+00:00", 100.0],
        ["2019-09-02T07:50:00.516000+00:00", 100.0],
        ["2019-09-02T07:51:00.271000+00:00", 100.0],
        ["2019-09-02T07:52:00.519000+00:00", 100.0],
        ["2019-09-02T07:53:00.520000+00:00", 100.0],
        ["2019-09-02T07:54:00.516000+00:00", 100.0],
        ["2019-09-02T07:55:00.524000+00:00", 100.0],
        ["2019-09-02T07:56:00.268000+00:00", 100.0],
        ["2019-09-02T07:57:00.516000+00:00", 100.0],
        ["2019-09-02T07:58:00.517000+00:00", 100.0],
        ["2019-09-02T07:59:00.516000+00:00", 100.0],
        ["2019-09-02T08:00:00.516000+00:00", 100.0],
        ["2019-09-02T08:01:00.271000+00:00", 100.0],
        ["2019-09-02T08:02:00.521000+00:00", 100.0],
        ["2019-09-02T08:03:00.516000+00:00", 100.0],
        ["2019-09-02T08:04:00.517000+00:00", 100.0],
        ["2019-09-02T08:05:00.516000+00:00", 100.0],
        ["2019-09-02T08:06:00.516000+00:00", 100.0],
        ["2019-09-02T08:07:00.272000+00:00", 100.0],
        ["2019-09-02T08:08:00.516000+00:00", 100.0],
        ["2019-09-02T08:09:00.266000+00:00", 100.0],
        ["2019-09-02T08:10:00.516000+00:00", 100.0],
        ["2019-09-02T08:11:00.516000+00:00", 100.0],
        ["2019-09-02T08:12:00.519000+00:00", 100.0],
        ["2019-09-02T08:13:00.515000+00:00", 100.0],
        ["2019-09-02T08:14:00.516000+00:00", 100.0],
        ["2019-09-02T08:15:00.517000+00:00", 100.0],
        ["2019-09-02T08:16:00.515000+00:00", 100.0],
        ["2019-09-02T08:17:00.524000+00:00", 100.0],
        ["2019-09-02T08:18:00.516000+00:00", 100.0],
        ["2019-09-02T08:19:00.266000+00:00", 100.0],
        ["2019-09-02T08:20:00.517000+00:00", 100.0],
        ["2019-09-02T08:21:00.517000+00:00", 100.0],
        ["2019-09-02T08:22:00.516000+00:00", 100.0],
        ["2019-09-02T08:23:00.516000+00:00", 100.0],
        ["2019-09-02T08:24:00.525000+00:00", 100.0],
        ["2019-09-02T08:25:00.519000+00:00", 100.0],
        ["2019-09-02T08:26:00.530000+00:00", 100.0],
        ["2019-09-02T08:27:00.523000+00:00", 100.0],
        ["2019-09-02T08:28:00.523000+00:00", 100.0],
        ["2019-09-02T08:29:00.522000+00:00", 100.0],
        ["2019-09-02T08:30:00.518000+00:00", 100.0],
        ["2019-09-02T08:31:00.517000+00:00", 100.0],
        ["2019-09-02T08:32:00.516000+00:00", 100.0],
        ["2019-09-02T08:33:00.521000+00:00", 100.0],
        ["2019-09-02T08:34:00.266000+00:00", 100.0],
        ["2019-09-02T08:35:00.520000+00:00", 100.0],
        ["2019-09-02T08:36:00.519000+00:00", 100.0],
        ["2019-09-02T08:37:00.524000+00:00", 100.0],
        ["2019-09-02T08:38:00.523000+00:00", 100.0],
        ["2019-09-02T08:39:00.533000+00:00", 100.0],
      ],
      ChilledWaterValvePosition: [
        ["2019-09-02T07:00:00.516000+00:00", 51.257911682128906],
        ["2019-09-02T07:01:00.518000+00:00", 51.04476547241211],
        ["2019-09-02T07:02:00.516000+00:00", 50.502193450927734],
        ["2019-09-02T07:03:00.271000+00:00", 50.61233901977539],
        ["2019-09-02T07:04:00.516000+00:00", 50.97432327270508],
        ["2019-09-02T07:05:00.516000+00:00", 51.01847457885742],
        ["2019-09-02T07:06:00.528000+00:00", 50.70022964477539],
        ["2019-09-02T07:07:00.270000+00:00", 50.00681686401367],
        ["2019-09-02T07:08:00.516000+00:00", 49.54508590698242],
        ["2019-09-02T07:09:00.517000+00:00", 49.49376678466797],
        ["2019-09-02T07:10:00.517000+00:00", 49.50861740112305],
        ["2019-09-02T07:11:00.516000+00:00", 49.64408874511719],
        ["2019-09-02T07:12:00.516000+00:00", 49.60250473022461],
        ["2019-09-02T07:13:00.516000+00:00", 49.43863296508789],
        ["2019-09-02T07:14:00.271000+00:00", 49.72198486328125],
        ["2019-09-02T07:15:00.516000+00:00", 49.38105392456055],
        ["2019-09-02T07:16:00.516000+00:00", 48.98808670043945],
        ["2019-09-02T07:17:00.516000+00:00", 48.30530548095703],
        ["2019-09-02T07:18:00.516000+00:00", 47.88218307495117],
        ["2019-09-02T07:19:00.270000+00:00", 47.57832717895508],
        ["2019-09-02T07:20:00.517000+00:00", 47.11601257324219],
        ["2019-09-02T07:21:00.519000+00:00", 46.70481491088867],
        ["2019-09-02T07:22:00.516000+00:00", 46.11861801147461],
        ["2019-09-02T07:23:00.519000+00:00", 46.09901428222656],
        ["2019-09-02T07:24:00.519000+00:00", 45.83831787109375],
        ["2019-09-02T07:25:00.272000+00:00", 45.611854553222656],
        ["2019-09-02T07:26:00.515000+00:00", 45.77138137817383],
        ["2019-09-02T07:27:00.517000+00:00", 45.88750076293945],
        ["2019-09-02T07:28:00.517000+00:00", 45.84259033203125],
        ["2019-09-02T07:29:00.516000+00:00", 45.73186111450195],
        ["2019-09-02T07:30:00.516000+00:00", 45.92353820800781],
        ["2019-09-02T07:31:00.518000+00:00", 46.112239837646484],
        ["2019-09-02T07:32:00.273000+00:00", 45.75658416748047],
        ["2019-09-02T07:33:00.516000+00:00", 45.1519775390625],
        ["2019-09-02T07:34:00.516000+00:00", 44.582191467285156],
        ["2019-09-02T07:35:00.517000+00:00", 44.39168167114258],
        ["2019-09-02T07:36:00.269000+00:00", 44.58073806762695],
        ["2019-09-02T07:37:00.518000+00:00", 44.58018112182617],
        ["2019-09-02T07:38:00.518000+00:00", 44.76267623901367],
        ["2019-09-02T07:39:00.279000+00:00", 44.913330078125],
        ["2019-09-02T07:40:00.516000+00:00", 45.126953125],
        ["2019-09-02T07:41:00.516000+00:00", 44.80366897583008],
        ["2019-09-02T07:42:00.518000+00:00", 44.00919723510742],
        ["2019-09-02T07:43:00.516000+00:00", 43.17133712768555],
        ["2019-09-02T07:44:00.531000+00:00", 42.75838088989258],
        ["2019-09-02T07:45:00.532000+00:00", 42.11339569091797],
        ["2019-09-02T07:46:00.517000+00:00", 41.61903381347656],
        ["2019-09-02T07:47:00.516000+00:00", 41.45980453491211],
        ["2019-09-02T07:48:00.516000+00:00", 41.68022155761719],
        ["2019-09-02T07:49:00.516000+00:00", 41.89803695678711],
        ["2019-09-02T07:50:00.516000+00:00", 41.99310302734375],
        ["2019-09-02T07:51:00.271000+00:00", 42.20759201049805],
        ["2019-09-02T07:52:00.519000+00:00", 42.49048614501953],
        ["2019-09-02T07:53:00.520000+00:00", 42.69343185424805],
        ["2019-09-02T07:54:00.516000+00:00", 42.546260833740234],
        ["2019-09-02T07:55:00.524000+00:00", 42.256492614746094],
        ["2019-09-02T07:56:00.268000+00:00", 42.225341796875],
        ["2019-09-02T07:57:00.516000+00:00", 42.50040817260742],
        ["2019-09-02T07:58:00.517000+00:00", 42.755863189697266],
        ["2019-09-02T07:59:00.516000+00:00", 42.77455520629883],
        ["2019-09-02T08:00:00.516000+00:00", 42.60406494140625],
        ["2019-09-02T08:01:00.271000+00:00", 42.23960876464844],
        ["2019-09-02T08:02:00.521000+00:00", 41.56896209716797],
        ["2019-09-02T08:03:00.516000+00:00", 41.05875778198242],
        ["2019-09-02T08:04:00.517000+00:00", 40.19353103637695],
        ["2019-09-02T08:05:00.516000+00:00", 39.47087478637695],
        ["2019-09-02T08:06:00.516000+00:00", 39.36742401123047],
        ["2019-09-02T08:07:00.272000+00:00", 39.57992172241211],
        ["2019-09-02T08:08:00.516000+00:00", 39.70161437988281],
        ["2019-09-02T08:09:00.266000+00:00", 39.461952209472656],
        ["2019-09-02T08:10:00.516000+00:00", 38.89963912963867],
        ["2019-09-02T08:11:00.516000+00:00", 38.692955017089844],
        ["2019-09-02T08:12:00.519000+00:00", 38.39332580566406],
        ["2019-09-02T08:13:00.515000+00:00", 37.742183685302734],
        ["2019-09-02T08:14:00.516000+00:00", 37.240577697753906],
        ["2019-09-02T08:15:00.517000+00:00", 37.14798355102539],
        ["2019-09-02T08:16:00.515000+00:00", 37.3516845703125],
        ["2019-09-02T08:17:00.524000+00:00", 37.78467559814453],
        ["2019-09-02T08:18:00.516000+00:00", 38.179298400878906],
        ["2019-09-02T08:19:00.266000+00:00", 38.810752868652344],
        ["2019-09-02T08:20:00.517000+00:00", 38.54334259033203],
        ["2019-09-02T08:21:00.517000+00:00", 37.85009002685547],
        ["2019-09-02T08:22:00.516000+00:00", 36.826499938964844],
        ["2019-09-02T08:23:00.516000+00:00", 35.61833572387695],
        ["2019-09-02T08:24:00.525000+00:00", 34.716163635253906],
        ["2019-09-02T08:25:00.519000+00:00", 34.34242248535156],
        ["2019-09-02T08:26:00.530000+00:00", 34.40269470214844],
        ["2019-09-02T08:27:00.523000+00:00", 34.52537536621094],
        ["2019-09-02T08:28:00.523000+00:00", 34.94636535644531],
        ["2019-09-02T08:29:00.522000+00:00", 34.8956298828125],
        ["2019-09-02T08:30:00.518000+00:00", 34.55393600463867],
        ["2019-09-02T08:31:00.517000+00:00", 34.08442306518555],
        ["2019-09-02T08:32:00.516000+00:00", 33.691864013671875],
        ["2019-09-02T08:33:00.521000+00:00", 33.4213752746582],
        ["2019-09-02T08:34:00.266000+00:00", 33.539146423339844],
        ["2019-09-02T08:35:00.520000+00:00", 33.74460983276367],
        ["2019-09-02T08:36:00.519000+00:00", 33.876670837402344],
        ["2019-09-02T08:37:00.524000+00:00", 33.825557708740234],
        ["2019-09-02T08:38:00.523000+00:00", 33.696876525878906],
        ["2019-09-02T08:39:00.533000+00:00", 33.568443298339844],
      ],
      ExhaustAirFlow: [
        ["2019-09-02T07:00:00.516000+00:00", 6506.97265625],
        ["2019-09-02T07:01:00.518000+00:00", 6515.47021484375],
        ["2019-09-02T07:02:00.516000+00:00", 6520.31201171875],
        ["2019-09-02T07:03:00.271000+00:00", 6539.462890625],
        ["2019-09-02T07:04:00.516000+00:00", 6522.24951171875],
        ["2019-09-02T07:05:00.516000+00:00", 6558.14990234375],
        ["2019-09-02T07:06:00.528000+00:00", 6642.162109375],
        ["2019-09-02T07:07:00.270000+00:00", 6667.16259765625],
        ["2019-09-02T07:08:00.516000+00:00", 6743.32568359375],
        ["2019-09-02T07:09:00.517000+00:00", 6090.65478515625],
        ["2019-09-02T07:10:00.517000+00:00", 7183.876953125],
        ["2019-09-02T07:11:00.516000+00:00", 6667.650390625],
        ["2019-09-02T07:12:00.516000+00:00", 6685.30224609375],
        ["2019-09-02T07:13:00.516000+00:00", 6760.9912109375],
        ["2019-09-02T07:14:00.271000+00:00", 6400.35693359375],
        ["2019-09-02T07:15:00.516000+00:00", 6530.09912109375],
        ["2019-09-02T07:16:00.516000+00:00", 6267.431640625],
        ["2019-09-02T07:17:00.516000+00:00", 6438.35546875],
        ["2019-09-02T07:18:00.516000+00:00", 6262.3466796875],
        ["2019-09-02T07:19:00.270000+00:00", 6033.326171875],
        ["2019-09-02T07:20:00.517000+00:00", 5920.86572265625],
        ["2019-09-02T07:21:00.519000+00:00", 6030.38818359375],
        ["2019-09-02T07:22:00.516000+00:00", 5862.8017578125],
        ["2019-09-02T07:23:00.519000+00:00", 5598.6484375],
        ["2019-09-02T07:24:00.519000+00:00", 5643.2900390625],
        ["2019-09-02T07:25:00.272000+00:00", 5690.82568359375],
        ["2019-09-02T07:26:00.515000+00:00", 5387.47802734375],
        ["2019-09-02T07:27:00.517000+00:00", 5742.685546875],
        ["2019-09-02T07:28:00.517000+00:00", 5671.15087890625],
        ["2019-09-02T07:29:00.516000+00:00", 5505.2802734375],
        ["2019-09-02T07:30:00.516000+00:00", 5883.51806640625],
        ["2019-09-02T07:31:00.518000+00:00", 5928.54541015625],
        ["2019-09-02T07:32:00.273000+00:00", 5766.94384765625],
        ["2019-09-02T07:33:00.516000+00:00", 5837.1259765625],
        ["2019-09-02T07:34:00.516000+00:00", 5755.90234375],
        ["2019-09-02T07:35:00.517000+00:00", 5763.64013671875],
        ["2019-09-02T07:36:00.269000+00:00", 5541.875],
        ["2019-09-02T07:37:00.518000+00:00", 5390.3408203125],
        ["2019-09-02T07:38:00.518000+00:00", 5151.39501953125],
        ["2019-09-02T07:39:00.279000+00:00", 5160.52685546875],
        ["2019-09-02T07:40:00.516000+00:00", 4651.45263671875],
        ["2019-09-02T07:41:00.516000+00:00", 5444.0634765625],
        ["2019-09-02T07:42:00.518000+00:00", 5299.39111328125],
        ["2019-09-02T07:43:00.516000+00:00", 5398.826171875],
        ["2019-09-02T07:44:00.531000+00:00", 5290.04541015625],
        ["2019-09-02T07:45:00.532000+00:00", 5157.4541015625],
        ["2019-09-02T07:46:00.517000+00:00", 5044.37353515625],
        ["2019-09-02T07:47:00.516000+00:00", 4917.70751953125],
        ["2019-09-02T07:48:00.516000+00:00", 5086.099609375],
        ["2019-09-02T07:49:00.516000+00:00", 5083.71875],
        ["2019-09-02T07:50:00.516000+00:00", 4764.291015625],
        ["2019-09-02T07:51:00.271000+00:00", 4526.79833984375],
        ["2019-09-02T07:52:00.519000+00:00", 4680.26513671875],
        ["2019-09-02T07:53:00.520000+00:00", 4984.31591796875],
        ["2019-09-02T07:54:00.516000+00:00", 4504.95556640625],
        ["2019-09-02T07:55:00.524000+00:00", 4804.658203125],
        ["2019-09-02T07:56:00.268000+00:00", 4870.1640625],
        ["2019-09-02T07:57:00.516000+00:00", 4789.0546875],
        ["2019-09-02T07:58:00.517000+00:00", 4974.9921875],
        ["2019-09-02T07:59:00.516000+00:00", 4851.5751953125],
        ["2019-09-02T08:00:00.516000+00:00", 4548.33251953125],
        ["2019-09-02T08:01:00.271000+00:00", 4906.49560546875],
        ["2019-09-02T08:02:00.521000+00:00", 4983.19677734375],
        ["2019-09-02T08:03:00.516000+00:00", 4518.39208984375],
        ["2019-09-02T08:04:00.517000+00:00", 4498.63818359375],
        ["2019-09-02T08:05:00.516000+00:00", 4186.98193359375],
        ["2019-09-02T08:06:00.516000+00:00", 4412.2861328125],
        ["2019-09-02T08:07:00.272000+00:00", 4356.20263671875],
        ["2019-09-02T08:08:00.516000+00:00", 4220.22998046875],
        ["2019-09-02T08:09:00.266000+00:00", 4283.498046875],
        ["2019-09-02T08:10:00.516000+00:00", 4134.23095703125],
        ["2019-09-02T08:11:00.516000+00:00", 3754.882080078125],
        ["2019-09-02T08:12:00.519000+00:00", 4557.1796875],
        ["2019-09-02T08:13:00.515000+00:00", 3932.848388671875],
        ["2019-09-02T08:14:00.516000+00:00", 4185.7705078125],
        ["2019-09-02T08:15:00.517000+00:00", 4362.4921875],
        ["2019-09-02T08:16:00.515000+00:00", 4250.7080078125],
        ["2019-09-02T08:17:00.524000+00:00", 4242.255859375],
        ["2019-09-02T08:18:00.516000+00:00", 4248.7158203125],
        ["2019-09-02T08:19:00.266000+00:00", 4288.02880859375],
        ["2019-09-02T08:20:00.517000+00:00", 4380.19287109375],
        ["2019-09-02T08:21:00.517000+00:00", 4296.71923828125],
        ["2019-09-02T08:22:00.516000+00:00", 3864.6845703125],
        ["2019-09-02T08:23:00.516000+00:00", 3924.99560546875],
        ["2019-09-02T08:24:00.525000+00:00", 3851.58154296875],
        ["2019-09-02T08:25:00.519000+00:00", 3853.66015625],
        ["2019-09-02T08:26:00.530000+00:00", 3778.931396484375],
        ["2019-09-02T08:27:00.523000+00:00", 3713.4765625],
        ["2019-09-02T08:28:00.523000+00:00", 3902.1484375],
        ["2019-09-02T08:29:00.522000+00:00", 3935.74169921875],
        ["2019-09-02T08:30:00.518000+00:00", 3495.751953125],
        ["2019-09-02T08:31:00.517000+00:00", 3258.712646484375],
        ["2019-09-02T08:32:00.516000+00:00", 3394.5654296875],
        ["2019-09-02T08:33:00.521000+00:00", 3824.701171875],
        ["2019-09-02T08:34:00.266000+00:00", 3705.41015625],
        ["2019-09-02T08:35:00.520000+00:00", 3527.0576171875],
        ["2019-09-02T08:36:00.519000+00:00", 3303.37939453125],
        ["2019-09-02T08:37:00.524000+00:00", 3274.112548828125],
        ["2019-09-02T08:38:00.523000+00:00", 3428.820556640625],
        ["2019-09-02T08:39:00.533000+00:00", 3393.0078125],
      ],
      SupplyFanSpeed: [
        ["2019-09-02T07:00:00.857000+00:00", 41.5],
        ["2019-09-02T07:01:00.654000+00:00", 41.39999771118164],
        ["2019-09-02T07:02:00.656000+00:00", 41.39999771118164],
        ["2019-09-02T07:03:00.391000+00:00", 41.39999771118164],
        ["2019-09-02T07:04:00.648000+00:00", 41.39999771118164],
        ["2019-09-02T07:05:00.703000+00:00", 41.29999923706055],
        ["2019-09-02T07:06:00.362000+00:00", 41.29999923706055],
        ["2019-09-02T07:07:00.417000+00:00", 41.29999923706055],
        ["2019-09-02T07:08:00.398000+00:00", 41.39999771118164],
        ["2019-09-02T07:09:00.660000+00:00", 41.70000076293945],
        ["2019-09-02T07:10:00.725000+00:00", 41.5],
        ["2019-09-02T07:11:00.682000+00:00", 41.39999771118164],
        ["2019-09-02T07:12:00.751000+00:00", 41.29999923706055],
        ["2019-09-02T07:13:00.650000+00:00", 41.5],
        ["2019-09-02T07:14:00.420000+00:00", 41.099998474121094],
        ["2019-09-02T07:15:00.736000+00:00", 40.70000076293945],
        ["2019-09-02T07:16:00.656000+00:00", 40.20000076293945],
        ["2019-09-02T07:17:00.648000+00:00", 39.89999771118164],
        ["2019-09-02T07:18:00.686000+00:00", 39.5],
        ["2019-09-02T07:19:00.425000+00:00", 39.20000076293945],
        ["2019-09-02T07:20:00.697000+00:00", 38.79999923706055],
        ["2019-09-02T07:21:00.659000+00:00", 38.5],
        ["2019-09-02T07:22:00.671000+00:00", 38.099998474121094],
        ["2019-09-02T07:23:00.689000+00:00", 37.79999923706055],
        ["2019-09-02T07:24:00.454000+00:00", 37.599998474121094],
        ["2019-09-02T07:25:00.449000+00:00", 37.39999771118164],
        ["2019-09-02T07:26:00.676000+00:00", 37.20000076293945],
        ["2019-09-02T07:27:00.638000+00:00", 37.099998474121094],
        ["2019-09-02T07:28:00.443000+00:00", 37.0],
        ["2019-09-02T07:29:00.665000+00:00", 36.89999771118164],
        ["2019-09-02T07:30:00.709000+00:00", 36.79999923706055],
        ["2019-09-02T07:31:00.663000+00:00", 36.70000076293945],
        ["2019-09-02T07:32:00.596000+00:00", 36.5],
        ["2019-09-02T07:33:00.649000+00:00", 36.39999771118164],
        ["2019-09-02T07:34:00.648000+00:00", 36.29999923706055],
        ["2019-09-02T07:35:00.687000+00:00", 36.20000076293945],
        ["2019-09-02T07:36:00.442000+00:00", 36.099998474121094],
        ["2019-09-02T07:37:00.698000+00:00", 36.0],
        ["2019-09-02T07:38:00.676000+00:00", 35.89999771118164],
        ["2019-09-02T07:39:00.405000+00:00", 36.0],
        ["2019-09-02T07:40:00.689000+00:00", 36.29999923706055],
        ["2019-09-02T07:41:00.681000+00:00", 36.0],
        ["2019-09-02T07:42:00.672000+00:00", 35.70000076293945],
        ["2019-09-02T07:43:00.647000+00:00", 35.39999771118164],
        ["2019-09-02T07:44:00.667000+00:00", 35.099998474121094],
        ["2019-09-02T07:45:00.748000+00:00", 35.0],
        ["2019-09-02T07:46:00.667000+00:00", 34.79999923706055],
        ["2019-09-02T07:47:00.629000+00:00", 34.79999923706055],
        ["2019-09-02T07:48:00.405000+00:00", 34.70000076293945],
        ["2019-09-02T07:49:00.670000+00:00", 34.70000076293945],
        ["2019-09-02T07:50:00.486000+00:00", 34.5],
        ["2019-09-02T07:51:00.431000+00:00", 34.39999771118164],
        ["2019-09-02T07:52:00.662000+00:00", 34.29999923706055],
        ["2019-09-02T07:53:00.662000+00:00", 34.20000076293945],
        ["2019-09-02T07:54:00.690000+00:00", 34.0],
        ["2019-09-02T07:55:00.768000+00:00", 33.89999771118164],
        ["2019-09-02T07:56:00.447000+00:00", 33.89999771118164],
        ["2019-09-02T07:57:00.704000+00:00", 34.20000076293945],
        ["2019-09-02T07:58:00.656000+00:00", 34.29999923706055],
        ["2019-09-02T07:59:00.657000+00:00", 34.0],
        ["2019-09-02T08:00:00.708000+00:00", 33.70000076293945],
        ["2019-09-02T08:01:00.430000+00:00", 33.5],
        ["2019-09-02T08:02:00.851000+00:00", 33.29999923706055],
        ["2019-09-02T08:03:00.651000+00:00", 33.20000076293945],
        ["2019-09-02T08:04:00.685000+00:00", 32.70000076293945],
        ["2019-09-02T08:05:00.818000+00:00", 32.5],
        ["2019-09-02T08:06:00.333000+00:00", 32.39999771118164],
        ["2019-09-02T08:07:00.595000+00:00", 32.29999923706055],
        ["2019-09-02T08:08:00.664000+00:00", 32.20000076293945],
        ["2019-09-02T08:09:00.418000+00:00", 32.0],
        ["2019-09-02T08:10:00.707000+00:00", 31.899999618530273],
        ["2019-09-02T08:11:00.675000+00:00", 32.099998474121094],
        ["2019-09-02T08:12:00.657000+00:00", 31.799999237060547],
        ["2019-09-02T08:13:00.366000+00:00", 31.69999885559082],
        ["2019-09-02T08:14:00.646000+00:00", 31.599998474121094],
        ["2019-09-02T08:15:00.716000+00:00", 31.5],
        ["2019-09-02T08:16:00.911000+00:00", 31.399999618530273],
        ["2019-09-02T08:17:00.676000+00:00", 31.399999618530273],
        ["2019-09-02T08:18:00.682000+00:00", 31.69999885559082],
        ["2019-09-02T08:19:00.405000+00:00", 31.799999237060547],
        ["2019-09-02T08:20:00.685000+00:00", 31.0],
        ["2019-09-02T08:21:00.643000+00:00", 30.399999618530273],
        ["2019-09-02T08:22:00.659000+00:00", 29.899999618530273],
        ["2019-09-02T08:23:00.651000+00:00", 29.599998474121094],
        ["2019-09-02T08:24:00.653000+00:00", 29.399999618530273],
        ["2019-09-02T08:25:00.703000+00:00", 29.299999237060547],
        ["2019-09-02T08:26:00.692000+00:00", 29.19999885559082],
        ["2019-09-02T08:27:00.655000+00:00", 29.0],
        ["2019-09-02T08:28:00.660000+00:00", 28.799999237060547],
        ["2019-09-02T08:29:00.722000+00:00", 28.399999618530273],
        ["2019-09-02T08:30:00.676000+00:00", 28.19999885559082],
        ["2019-09-02T08:31:00.779000+00:00", 27.899999618530273],
        ["2019-09-02T08:32:00.714000+00:00", 27.799999237060547],
        ["2019-09-02T08:33:00.663000+00:00", 27.5],
        ["2019-09-02T08:34:00.383000+00:00", 27.399999618530273],
        ["2019-09-02T08:35:00.439000+00:00", 27.19999885559082],
        ["2019-09-02T08:36:00.667000+00:00", 27.0],
        ["2019-09-02T08:37:00.682000+00:00", 26.899999618530273],
        ["2019-09-02T08:38:00.623000+00:00", 26.799999237060547],
        ["2019-09-02T08:39:00.667000+00:00", 26.69999885559082],
      ],
    },
  },
};
