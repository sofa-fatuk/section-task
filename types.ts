export enum Type {
  Text,
  Media,
  Embed,
  TaskList,
  FileSharing,
  ColumnsTwo,
  ColumnsThree,
}

export type Content = Text | Media | Embed | TaskList | FileSharing;

export type Data = Content | ColumnsTwo | ColumnsThree;

export type Section = Data[];

interface DataAbstract {
  type: Type;
  id: string;
}

// Content
export interface Text extends DataAbstract {
  type: Type.Text;
  value: string;
}

export interface Media extends DataAbstract {
  type: Type.Media;
  link: string;
  mimeType: string;
}

export interface Embed extends DataAbstract {
  type: Type.Embed;
  html: string;
}

export interface Task {
  id: string;
  text: string;
}

export interface TaskList extends DataAbstract {
  type: Type.TaskList;
  value: Task[];
}

export interface FileSharing extends DataAbstract {
  type: Type.FileSharing;
  file: File;
}

// Structural
export interface ColumnsTwo extends DataAbstract {
  type: Type.ColumnsTwo;
  1: Data;
  2: Data;
}

export interface ColumnsThree extends DataAbstract {
  type: Type.ColumnsThree;
  1: Data;
  2: Data;
  3: Data;
}
