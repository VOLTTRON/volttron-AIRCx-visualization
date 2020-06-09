import CsvParser from "csv-parser";
import { Readable } from "stream";
import { create, doMocked, isMocked, read } from "../api";
import { key } from "./action";
export const UNIQUE_KEY_UPLOAD_SAMPLE = "sample/upload";
export const UNIQUE_KEY_UPLOAD_CONFIG = "config/upload";
export const SERVICE_ENDPOINT = "data";
export const SERVICE_ENDPOINT_DIAGNOSTICS = `${SERVICE_ENDPOINT}/diagnostics`;
export const SERVICE_ENDPOINT_DETAILED = `${SERVICE_ENDPOINT}/detailed`;
export const SERVICE_ENDPOINT_SOURCES = `${SERVICE_ENDPOINT}/sources`;

const readSample = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = {
        header: [],
        data: {},
        rows: [],
        size: 0,
      };
      const readable = new Readable();
      readable.push(event.target.result);
      readable.push(null);
      readable
        .pipe(CsvParser({ strict: true }))
        .on("headers", (headers) => (result.header = headers))
        .on("data", (data) => {
          if (result.size === 0) {
            result.data = data;
          }
          if (result.size < 10) {
            result.rows.push(
              Array.isArray(result.header)
                ? result.header.map((h) => data[h])
                : Object.values(data)
            );
          }
          result.size++;
        })
        .on("end", () => {
          resolve(result);
        })
        .on("error", (error) => {
          reject(error);
        });
    };
    reader.readAsText(file);
  });
};

export const uploadSample = (file) => {
  if (isMocked()) return doMocked(key, UNIQUE_KEY_UPLOAD_SAMPLE);
  return readSample(file);
};

const readConfig = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = JSON.parse(event.target.result);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsText(file);
  });
};

export const uploadConfig = (file) => {
  if (isMocked()) return doMocked(key, UNIQUE_KEY_UPLOAD_CONFIG);
  return readConfig(file);
};

export const readSources = () => {
  if (isMocked()) return doMocked(key, SERVICE_ENDPOINT_SOURCES);
  return read(`${SERVICE_ENDPOINT_SOURCES}`, null, false);
};

export const readDiagnostics = (form) => {
  if (isMocked()) return doMocked(key, SERVICE_ENDPOINT_DIAGNOSTICS);
  return create(`${SERVICE_ENDPOINT_DIAGNOSTICS}`, form, null, false);
};

export const readDetailed = (form) => {
  if (isMocked()) return doMocked(key, SERVICE_ENDPOINT_DETAILED);
  return create(`${SERVICE_ENDPOINT_DETAILED}`, form, null, false);
};
