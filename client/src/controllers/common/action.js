import { generateAction, generateSelector, generateType } from "../util";

export const key = "common";

// reset common state
export const RESET = generateType(key, "reset-this-only");
export const reset = generateAction(RESET);

// view mode
export const MODE = generateType(key, "mode");
export const setMode = generateAction(MODE);
export const selectMode = generateSelector(key, MODE);

// notice
export const NOTICE = generateType(key, "notice");
export const setNotice = generateAction(NOTICE);
export const selectNotice = generateSelector(key, NOTICE);
