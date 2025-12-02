declare module "@shikijs/transformers" {
  export function transformerNotationHighlight(opts?: any): any;
  export function transformerNotationDiff(opts?: any): any;
  export function transformerNotationFocus(opts?: any): any;
}

declare module "@/hooks/use-mobile" {
  export function useIsMobile(): boolean;
}
