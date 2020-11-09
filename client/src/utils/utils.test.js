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

import {
  acronymize,
  filter,
  getDocumentHeight,
  getDocumentWidth,
} from "./utils";

describe("utils.getDocumentWidth()", () => {
  it("width should be 0 when no page is shown", () => {
    expect(getDocumentWidth()).toEqual(0);
  });
});

describe("utils.getDocumentHeight()", () => {
  it("height should be 0 when no page is shown", () => {
    expect(getDocumentHeight()).toEqual(0);
  });
});

describe("utils.acronymize()", () => {
  it("acronymize should handle: all lowercase letters", () => {
    expect(acronymize("all lowercase letters")).toEqual("all");
  });
  it("acronymize should handle: All Normalcase Letters", () => {
    expect(acronymize("All Normalcase Letters")).toEqual("ANL");
  });
  it("acronymize should handle: AllCamelcaseLetters", () => {
    expect(acronymize("AllCamelcaseLetters")).toEqual("ACL");
  });
  it("acronymize should handle: ALL UPPERCASE LETTERS", () => {
    expect(acronymize("ALL UPPERCASE LETTERS")).toEqual("AUL");
  });
  it("acronymize should handle: ALL_UNDERSCORE_SEPARATED", () => {
    expect(acronymize("ALL_UNDERSCORE_SEPARATED")).toEqual("AUS");
  });
  it("acronymize should handle: all_underscore_separated", () => {
    expect(acronymize("all_underscore_separated")).toEqual("aus");
  });
  it("acronymize should handle: all-hyphenated-separated", () => {
    expect(acronymize("all-hyphenated-separated")).toEqual("ahs");
  });
  it("acronymize should handle: all\\slash/separated", () => {
    expect(acronymize("all\\slash/separated")).toEqual("ass");
  });
});

describe("utils.filter()", () => {
  let items = null;
  let paths = null;

  beforeEach(() => {
    items = JSON.parse(
      JSON.stringify([
        {
          index: 0,
          name: "zero",
          label: "label",
        },
        {
          index: 1,
          name: "one",
          label: "label",
        },
        {
          index: 2,
          name: "two",
          label: "label",
        },
      ])
    );
    paths = JSON.parse(
      JSON.stringify([
        {
          index: 0,
          name: "zero",
          label: "label",
          items: [
            {
              index: 0,
              name: "zero-a",
              label: "label",
            },
            {
              index: 1,
              name: "zero-b",
              label: "label",
            },
            {
              index: 2,
              name: "zero-c",
              label: "label",
            },
          ],
          data: {
            name: "zero-c",
            label: "label",
          },
        },
        {
          index: 1,
          name: "one",
          label: "label",
          items: [],
          data: {},
        },
        {
          index: 2,
          name: "two",
          label: "label",
          items: null,
          data: null,
        },
      ])
    );
  });

  it("should return all items when no search is specified", () => {
    const expected = items.map((item) => ({
      ...item,
      terms: {
        index: [item.index, "", ""],
        name: [item.name, "", ""],
        label: [item.label, "", ""],
      },
    }));
    expect(filter(items)).toEqual(expected);
  });

  it("should filter terms when keys is specified", () => {
    const expected = items.map((item) => ({
      ...item,
      terms: {
        name: [item.name, "", ""],
        label: [item.label, "", ""],
      },
    }));
    expect(filter(items, null, ["name", "label"])).toEqual(expected);
  });

  it("should filter when search is specified", () => {
    const expected = [
      {
        index: 0,
        name: "zero",
        label: "label",
        terms: {
          index: [0, "", ""],
          name: ["", "z", "ero"],
          label: ["label", "", ""],
        },
      },
    ];
    expect(filter(items, "z")).toEqual(expected);
  });

  it("should filter when search and keys is specified", () => {
    const expected = [
      {
        index: 0,
        name: "zero",
        label: "label",
        terms: {
          name: ["z", "e", "ro"],
        },
      },
      {
        index: 1,
        name: "one",
        label: "label",
        terms: {
          name: ["on", "e", ""],
        },
      },
    ];
    expect(filter(items, "e", ["name"])).toEqual(expected);
  });

  it("should filter when search and path is specified", () => {
    const expected = [
      {
        index: 0,
        name: "zero",
        label: "label",
        terms: {
          name: ["z", "e", "ro"],
        },
      },
      {
        index: 1,
        name: "one",
        label: "label",
        terms: {
          name: ["on", "e", ""],
        },
      },
    ];
    expect(filter(items, "e", ["$.name"])).toEqual(expected);
  });

  it("should filter recursively when search and path is specified", () => {
    const expected = [
      {
        index: 0,
        name: "zero",
        label: "label",
        items: [
          {
            index: 0,
            name: "zero-a",
            label: "label",
          },
          {
            index: 1,
            name: "zero-b",
            label: "label",
          },
          {
            index: 2,
            name: "zero-c",
            label: "label",
            terms: {
              name: ["zero", "-c", ""],
            },
          },
        ],
        data: {
          name: "zero-c",
          label: "label",
          terms: {
            name: ["zero", "-c", ""],
          },
        },
      },
    ];
    expect(filter(paths, "-c", ["$..name"])).toEqual(expected);
  });
});
