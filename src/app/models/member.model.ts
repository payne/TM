// models/member.model.ts
export interface Member {
  'First Name': string;
  'Last Name': string;
  [key: string]: string;  // For dynamic date columns
}
