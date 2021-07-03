import {writable} from 'svelte/store';
export const applicationName = writable("BRP Character Sheet" );
export const sheetName = writable("Basic Role Playing Character Sheet" );
export const fileExtension = writable("brpcs");
export const sheetSuffix = writable("character-sheet-data");
export const sheetPrefix = writable("brp-");
