import type { CaseImageSource } from "@/lib/case-studies";

export type CaseDemoScreen = {
  id: string;
  label: string;
  title: string;
  description: string;
  desktop?: CaseImageSource;
  mobile?: CaseImageSource;
};
export type CaseDemo = {
  project: string;
  fitPhoneToImage?: boolean;
  title: string;
  description: string;
  screens: CaseDemoScreen[];
};
