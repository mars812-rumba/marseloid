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
  /** Fit to the first mobile capture, keeping shell size stable across slides. */
  fitPhoneToImage?: boolean;
  title: string;
  description: string;
  screens: CaseDemoScreen[];
};
