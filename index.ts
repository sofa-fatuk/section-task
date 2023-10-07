import { Data, Section, Text, Type } from "./types.ts";

export function findTexts(data: Data) {
  const textObjects: Text[] = [];

  if (data.type === Type.Text) {
    textObjects.push(data);
    return textObjects;
  }

  if (data.type === Type.ColumnsTwo) {
    textObjects.push(...findTexts(data[1]));
    textObjects.push(...findTexts(data[2]));
    return textObjects;
  }

  if (data.type === Type.ColumnsThree) {
    textObjects.push(...findTexts(data[1]));
    textObjects.push(...findTexts(data[2]));
    textObjects.push(...findTexts(data[3]));
    return textObjects;
  }

  return textObjects;
}

export function findAllTexts(section: Section) {
  return section.reduce<Text[]>((acc, data) => {
    acc.push(...findTexts(data));
    return acc;
  }, []);
}
