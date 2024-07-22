import { AllSystemCSSProperties, ResponsiveStyleValue } from "@mui/system";


export type NineElements<T> = [T, T, T, T, T, T, T, T, T];
export interface Element {
    player: "x" | "o" | null;
}
interface ElementCong {
    size: number,
    xColor: ResponsiveStyleValue<AllSystemCSSProperties["color"]>,
    oColor: ResponsiveStyleValue<AllSystemCSSProperties["color"]>,

}
export const caseConf: ElementCong = {
    size: 120,
    xColor: "red",
    oColor: "blueviolet",
};