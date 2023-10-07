import { describe, expect, it } from "bun:test";
import { nanoid } from "nanoid";

import {
  getMockColumnsTwo,
  getMockEmbed,
  getMockMedia,
  getMockSection,
  getMockTaskList,
  getMockText,
  getRandomSection,
  NUMBER_OF_TEXTS_IN_SECTION,
} from "./mocks.ts";
import { findTexts, findAllTexts } from "./index.ts";
import { ColumnsThree, ColumnsTwo, Text, Type } from "./types.ts";

describe("findTexts", () => {
  it("should return an array containing a single Text object", () => {
    const textObject = getMockText();
    const result = findTexts(textObject);
    expect(result).toEqual([textObject]);
  });

  it("should return an array of Text objects from a ColumnsTwo object", () => {
    const mockColumnTwo: ColumnsTwo = {
      type: Type.ColumnsTwo,
      id: nanoid(),
      1: getMockMedia(),
      2: getMockText(),
    };
    const result = findTexts(mockColumnTwo);
    expect(result).toEqual([mockColumnTwo[2]]);
  });

  it("should return an array of Text objects from a ColumnsThree object", () => {
    const mockColumnThree: ColumnsThree = {
      type: Type.ColumnsThree,
      id: nanoid(),
      1: getMockMedia(),
      2: getMockTaskList(),
      3: getMockText(),
    };
    const result = findTexts(mockColumnThree);
    expect(result).toEqual([mockColumnThree[3]]);
  });

  it("should return an empty array for an object of unknown type", () => {
    const unknownObject = { type: "UnknownType" };
    // @ts-expect-error: for test
    const result = findTexts(unknownObject);
    expect(result).toEqual([]);
  });

  it("should recursively find Text object", () => {
    const mockColumnTwo = getMockColumnsTwo();
    const result = findTexts(mockColumnTwo);
    expect(result.includes(mockColumnTwo[2] as Text)).toBeTrue();
    expect(
      result.includes((mockColumnTwo[1] as ColumnsThree)[3] as Text)
    ).toBeTrue();
  });
});

describe("findAllTexts", () => {
  it("should return an array of Text objects from a section", () => {
    const result = findAllTexts(getMockSection());
    expect(result.length).toEqual(NUMBER_OF_TEXTS_IN_SECTION);
  });

  it("should return an empty array if the section contains no Text objects", () => {
    const section = [getMockEmbed(), getMockMedia(), getMockTaskList()];
    const result = findAllTexts(section);
    expect(result).toEqual([]);
  });

  it("should find all texts in random section", () => {
    const result = findAllTexts(getRandomSection());
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
});
