// Copyright (c) 2020, Battelle Memorial Institute
// All rights reserved.

// 1.  Battelle Memorial Institute (hereinafter Battelle) hereby grants
//     permission to any person or entity lawfully obtaining a copy of this
//     software and associated documentation files (hereinafter "the Software")
//     to redistribute and use the Software in source and binary forms, with or
//     without modification.  Such person or entity may use, copy, modify, merge,
//     publish, distribute, sublicense, and/or sell copies of the Software, and
//     may permit others to do so, subject to the following conditions:

//     -   Redistributions of source code must retain the above copyright notice,
//         this list of conditions and the following disclaimers.

//     -          Redistributions in binary form must reproduce the above copyright
//         notice, this list of conditions and the following disclaimer in the
//         documentation and/or other materials provided with the distribution.

//     -          Other than as used herein, neither the name Battelle Memorial Institute
//         or Battelle may be used in any form whatsoever without the express
//         written consent of Battelle.

// 2. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
//     AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//     IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
//     ARE DISCLAIMED. IN NO EVENT SHALL BATTELLE OR CONTRIBUTORS BE LIABLE FOR
//     ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
//     DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
//     SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
//     CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
//     LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
//     OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
//     DAMAGE.

// The views and conclusions contained in the software and documentation are those
// of the authors and should not be interpreted as representing official policies,
// either expressed or implied, of the FreeBSD Project.

// This material was prepared as an account of work sponsored by an agency of the
// United States Government. Neither the United States Government nor the United
// States Department of Energy, nor Battelle, nor any of their employees, nor any
// jurisdiction or organization that has cooperated in the development of these
// materials, makes any warranty, express or implied, or assumes any legal
// liability or responsibility for the accuracy, completeness, or usefulness or
// any information, apparatus, product, software, or process disclosed, or
// represents that its use would not infringe privately owned rights.

// Reference herein to any specific commercial product, process, or service by
// trade name, trademark, manufacturer, or otherwise does not necessarily
// constitute or imply its endorsement, recommendation, or favoring by the
// United States Government or any agency thereof, or Battelle Memorial Institute.
// The views and opinions of authors expressed herein do not necessarily state or
// reflect those of the United States Government or any agency thereof.

// PACIFIC NORTHWEST NATIONAL LABORATORY
// operated by
// BATTELLE for the UNITED STATES DEPARTMENT OF ENERGY
// under Contract DE-AC05-76RL01830

import CsvParser from "csv-parser";
import { Readable } from "stream";
import { logError } from "utils/utils";
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
        logError(error);
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
