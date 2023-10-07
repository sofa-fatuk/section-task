import { nanoid } from "nanoid";

import {
  Media,
  Text,
  Embed,
  Type,
  TaskList,
  FileSharing,
  ColumnsTwo,
  ColumnsThree,
} from "./types.ts";

export function getMockText(): Text {
  return {
    type: Type.Text,
    id: nanoid(),
    value: "Text",
  };
}

export function getMockMedia(): Media {
  return {
    type: Type.Media,
    id: nanoid(),
    link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    mimeType: "application/pdf",
  };
}

export function getMockEmbed(): Embed {
  return {
    type: Type.Embed,
    id: nanoid(),
    html: `<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=CtAGIj75qx4sqCer" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  };
}

export function getMockTaskList(): TaskList {
  return {
    type: Type.TaskList,
    id: nanoid(),
    value: [
      { id: nanoid(), text: "Купить молока" },
      { id: nanoid(), text: "Погулять с собакой" },
    ],
  };
}

export function getMockFileSharing(): FileSharing {
  return {
    type: Type.FileSharing,
    id: nanoid(),
    file: new File(["Test"], "filename", { type: "text/html" }),
  };
}

export function getMockColumnsTwo(): ColumnsTwo {
  return {
    type: Type.ColumnsTwo,
    id: nanoid(),
    1: getMockColumnsThree(false),
    2: getMockText(),
  };
}

export function getMockColumnsThree(includeColumnTwo = true): ColumnsThree {
  return {
    type: Type.ColumnsThree,
    id: nanoid(),
    1: getMockEmbed(),
    2: includeColumnTwo ? getMockColumnsTwo() : getMockText(),
    3: getMockText(),
  };
}

export const NUMBER_OF_TEXTS_IN_SECTION = 9;
export function getMockSection() {
  return [
    getMockMedia(),
    getMockText(),
    getMockColumnsTwo(),
    getMockFileSharing(),
    getMockColumnsThree(),
    getMockText(),
  ];
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomSection(shouldHaveText = true) {
  const options = [
    getMockText,
    getMockMedia,
    getMockEmbed,
    getMockTaskList,
    getMockFileSharing,
    getMockColumnsTwo,
    getMockColumnsThree,
  ];
  const result = Array.from({ length: getRandomInt(40, 100) }).map(() =>
    options[getRandomInt(0, options.length - 1)]()
  );
  if (shouldHaveText) {
    result.push(getMockText());
  }
  return result;
}
