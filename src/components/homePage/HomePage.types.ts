import { string } from "yup";

export interface MovieData {
  title: string,
  year: number,
  format: string,
  actor: string[],
}