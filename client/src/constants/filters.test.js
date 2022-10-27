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

import filters from "./filters";

describe("filters.aggregate(high)", () => {
  // full data
  it("should return okay with 1 fault present", () => {
    expect(filters.aggregate(1, 24 - 1, "high").name).toEqual(filters.parse("okay").name);
  });

  it("should return okay with 2 faults present", () => {
    expect(filters.aggregate(2, 24 - 2, "high").name).toEqual(filters.parse("okay").name);
  });

  it("should return okay with 3 faults present", () => {
    expect(filters.aggregate(3, 24 - 3, "high").name).toEqual(filters.parse("okay").name);
  });

  it("should return okay with 6 faults present", () => {
    expect(filters.aggregate(6, 24 - 6, "high").name).toEqual(filters.parse("okay").name);
  });

  it("should return fault with 7 faults present", () => {
    expect(filters.aggregate(7, 24 - 7, "high").name).toEqual(filters.parse("fault").name);
  });

  it("should return fault with 50% faults present", () => {
    expect(filters.aggregate(12, 24 - 12, "high").name).toEqual(filters.parse("fault").name);
  });

  it("should return fault with 100% faults present", () => {
    expect(filters.aggregate(24, 24 - 24, "high").name).toEqual(filters.parse("fault").name);
  });

  // inconclusive
  it("should return inconclusive with 5 or less okay present", () => {
    expect(filters.aggregate(0, 5, "high").name).toEqual(filters.parse("inconclusive").name);
  });

  it("should return inconclusive with 5 or less faults present", () => {
    expect(filters.aggregate(5, 0, "high").name).toEqual(filters.parse("inconclusive").name);
  });

  it("should return inconclusive with no data", () => {
    expect(filters.aggregate(0, 0, "high").name).toEqual(filters.parse("inconclusive").name);
  });

  // partial data
  it("should return fault with 1 fault present out of 6 possible", () => {
    expect(filters.aggregate(1, 6 - 1, "high").name).toEqual(filters.parse("fault").name);
  });

  it("should return fault with 1 fault present out of 7 possible", () => {
    expect(filters.aggregate(1, 7 - 1, "high").name).toEqual(filters.parse("fault").name);
  });

  it("should return fault with 1 fault present out of 8 possible", () => {
    expect(filters.aggregate(1, 8 - 1, "high").name).toEqual(filters.parse("fault").name);
  });

  it("should return okay with 1 fault present out of 9 possible", () => {
    expect(filters.aggregate(1, 9 - 1, "high").name).toEqual(filters.parse("okay").name);
  });

  it("should return fault with 50% faults present out of 10 possible", () => {
    expect(filters.aggregate(5, 10 - 5, "high").name).toEqual(filters.parse("fault").name);
  });

  it("should return fault with 100% faults present out of 9 possible", () => {
    expect(filters.aggregate(9, 9 - 9, "high").name).toEqual(filters.parse("fault").name);
  });

  // big numbers
  it("should return okay with 25% faults present out of 10,000 possible", () => {
    expect(filters.aggregate(10000 * 0.25, 10000 - 10000 * 0.25, "high").name).toEqual(filters.parse("okay").name);
  });

  it("should return fault with 50% faults present out of 10,000 possible", () => {
    expect(filters.aggregate(10000 * 0.5, 10000 - 10000 * 0.5, "high").name).toEqual(filters.parse("fault").name);
  });

  it("should return fault with 75% faults present out of 10,000 possible", () => {
    expect(filters.aggregate(10000 * 0.75, 10000 - 10000 * 0.75, "high").name).toEqual(filters.parse("fault").name);
  });

  it("should return fault with 100% faults present out of 10,000 possible", () => {
    expect(filters.aggregate(10000, 10000 - 10000, "high").name).toEqual(filters.parse("fault").name);
  });
});

describe("filters.aggregate(low)", () => {
  // full data
  it("should return okay with 1 fault present", () => {
    expect(filters.aggregate(1, 24 - 1, "low").name).toEqual(filters.parse("okay").name);
  });

  it("should return okay with 2 faults present", () => {
    expect(filters.aggregate(2, 24 - 2, "low").name).toEqual(filters.parse("okay").name);
  });

  it("should return okay with 3 faults present", () => {
    expect(filters.aggregate(3, 24 - 3, "low").name).toEqual(filters.parse("okay").name);
  });

  it("should return okay with 6 faults present", () => {
    expect(filters.aggregate(6, 24 - 6, "low").name).toEqual(filters.parse("okay").name);
  });

  it("should return fault with 7 faults present", () => {
    expect(filters.aggregate(7, 24 - 7, "low").name).toEqual(filters.parse("okay").name);
  });

  it("should return fault with 50% faults present", () => {
    expect(filters.aggregate(12, 24 - 12, "low").name).toEqual(filters.parse("okay").name);
  });

  it("should return fault with 100% faults present", () => {
    expect(filters.aggregate(24, 24 - 24, "low").name).toEqual(filters.parse("fault").name);
  });

  // inconclusive
  it("should return inconclusive with 5 or less okay present", () => {
    expect(filters.aggregate(0, 5, "low").name).toEqual(filters.parse("inconclusive").name);
  });

  it("should return inconclusive with 5 or less faults present", () => {
    expect(filters.aggregate(5, 0, "low").name).toEqual(filters.parse("inconclusive").name);
  });

  it("should return inconclusive with no data", () => {
    expect(filters.aggregate(0, 0, "low").name).toEqual(filters.parse("inconclusive").name);
  });

  // partial data
  it("should return fault with 1 fault present out of 6 possible", () => {
    expect(filters.aggregate(1, 6 - 1, "low").name).toEqual(filters.parse("okay").name);
  });

  it("should return fault with 1 fault present out of 7 possible", () => {
    expect(filters.aggregate(1, 7 - 1, "low").name).toEqual(filters.parse("okay").name);
  });

  it("should return fault with 1 fault present out of 8 possible", () => {
    expect(filters.aggregate(1, 8 - 1, "low").name).toEqual(filters.parse("okay").name);
  });

  it("should return okay with 1 fault present out of 9 possible", () => {
    expect(filters.aggregate(1, 9 - 1, "low").name).toEqual(filters.parse("okay").name);
  });

  it("should return fault with 50% faults present out of 10 possible", () => {
    expect(filters.aggregate(5, 10 - 5, "low").name).toEqual(filters.parse("okay").name);
  });

  it("should return fault with 100% faults present out of 9 possible", () => {
    expect(filters.aggregate(9, 9 - 9, "low").name).toEqual(filters.parse("fault").name);
  });

  // big numbers
  it("should return okay with 25% faults present out of 10,000 possible", () => {
    expect(filters.aggregate(10000 * 0.25, 10000 - 10000 * 0.25, "low").name).toEqual(filters.parse("okay").name);
  });

  it("should return fault with 50% faults present out of 10,000 possible", () => {
    expect(filters.aggregate(10000 * 0.5, 10000 - 10000 * 0.5, "low").name).toEqual(filters.parse("okay").name);
  });

  it("should return fault with 75% faults present out of 10,000 possible", () => {
    expect(filters.aggregate(10000 * 0.75, 10000 - 10000 * 0.75, "low").name).toEqual(filters.parse("fault").name);
  });

  it("should return fault with 100% faults present out of 10,000 possible", () => {
    expect(filters.aggregate(10000, 10000 - 10000, "low").name).toEqual(filters.parse("fault").name);
  });
});

describe("filters.aggregate(normal)", () => {
  // full data
  it("should return okay with 1 fault present", () => {
    expect(filters.aggregate(1, 24 - 1, "normal").name).toEqual(filters.parse("okay").name);
  });

  it("should return okay with 2 faults present", () => {
    expect(filters.aggregate(2, 24 - 2, "normal").name).toEqual(filters.parse("okay").name);
  });

  it("should return okay with 3 faults present", () => {
    expect(filters.aggregate(3, 24 - 3, "normal").name).toEqual(filters.parse("okay").name);
  });

  it("should return okay with 6 faults present", () => {
    expect(filters.aggregate(6, 24 - 6, "normal").name).toEqual(filters.parse("okay").name);
  });

  it("should return fault with 7 faults present", () => {
    expect(filters.aggregate(7, 24 - 7, "normal").name).toEqual(filters.parse("okay").name);
  });

  it("should return fault with 50% faults present", () => {
    expect(filters.aggregate(12, 24 - 12, "normal").name).toEqual(filters.parse("fault").name);
  });

  it("should return fault with 100% faults present", () => {
    expect(filters.aggregate(24, 24 - 24, "normal").name).toEqual(filters.parse("fault").name);
  });

  // inconclusive
  it("should return inconclusive with 5 or less okay present", () => {
    expect(filters.aggregate(0, 5, "normal").name).toEqual(filters.parse("inconclusive").name);
  });

  it("should return inconclusive with 5 or less faults present", () => {
    expect(filters.aggregate(5, 0, "normal").name).toEqual(filters.parse("inconclusive").name);
  });

  it("should return inconclusive with no data", () => {
    expect(filters.aggregate(0, 0, "normal").name).toEqual(filters.parse("inconclusive").name);
  });

  // partial data
  it("should return fault with 1 fault present out of 6 possible", () => {
    expect(filters.aggregate(1, 6 - 1, "normal").name).toEqual(filters.parse("okay").name);
  });

  it("should return fault with 1 fault present out of 7 possible", () => {
    expect(filters.aggregate(1, 7 - 1, "normal").name).toEqual(filters.parse("okay").name);
  });

  it("should return fault with 1 fault present out of 8 possible", () => {
    expect(filters.aggregate(1, 8 - 1, "normal").name).toEqual(filters.parse("okay").name);
  });

  it("should return okay with 1 fault present out of 9 possible", () => {
    expect(filters.aggregate(1, 9 - 1, "normal").name).toEqual(filters.parse("okay").name);
  });

  it("should return fault with 50% faults present out of 10 possible", () => {
    expect(filters.aggregate(5, 10 - 5, "normal").name).toEqual(filters.parse("fault").name);
  });

  it("should return fault with 100% faults present out of 9 possible", () => {
    expect(filters.aggregate(9, 9 - 9, "normal").name).toEqual(filters.parse("fault").name);
  });

  // big numbers
  it("should return okay with 25% faults present out of 10,000 possible", () => {
    expect(filters.aggregate(10000 * 0.25, 10000 - 10000 * 0.25, "normal").name).toEqual(filters.parse("okay").name);
  });

  it("should return fault with 50% faults present out of 10,000 possible", () => {
    expect(filters.aggregate(10000 * 0.5, 10000 - 10000 * 0.5, "normal").name).toEqual(filters.parse("fault").name);
  });

  it("should return fault with 75% faults present out of 10,000 possible", () => {
    expect(filters.aggregate(10000 * 0.75, 10000 - 10000 * 0.75, "normal").name).toEqual(filters.parse("fault").name);
  });

  it("should return fault with 100% faults present out of 10,000 possible", () => {
    expect(filters.aggregate(10000, 10000 - 10000, "normal").name).toEqual(filters.parse("fault").name);
  });
});
