/**
 * The event handler triggered when opening the spreadsheet.
 * @param {Event} e The onOpen event.
 */
function onOpen(e: Event): void {
  const ui = SpreadsheetApp.getUi();

  ui.createMenu('Example Dropdown')
    .addItem('Top Button Example', 'placeholder')
    .addSeparator()
    .addSubMenu(ui.createMenu('Menu Example')
      .addItem('Button 1', 'placeholder')
      .addItem('Button 2', 'placeholder')
      .addItem('Button 3', 'placeholder')
      .addItem('Button 4', 'placeholder'))
    .addToUi();
}

function placeholder(): void {
  const ui = SpreadsheetApp.getUi();

  ui.alert('Error', 'This button is an example and does not have any real functionality.', ui.ButtonSet.OK);
}

/**
 * This example custom function is written in Typescript!
 *
 * @param {string|string[][]} value A string or array of strings that will be inserted into the greeting.
 * @return Hello, {value}!
 * @customfunction
 */
function HELLO(value: string | string[][]): string | string[][] {
  const hello = (v: string) => {
    return `Hello, ${v}!`;
  }

  return combine(hello, lift(hello))(value);
}

/**
 * Lifts a function into a new one that can accept and return 2-D arrays.
 *
 * Use this function to take a "normal" formula and output a new array formula equivalent.
 * Equivalent to =ARRAYFORMULA in Google Sheets.
 *
 * @param {(singleValue: T) => T} f A function that takes and returns a value of a generic type T.
 * @return A function that takes and returns a 2-D array of a generic type T, mapping the function `f` to each value.
 */
function lift<T>(f: (singleValue: T) => T) {
  const arrayFunction = (arrayValue: T[][]) => {
    return arrayValue.map(row => row.map(f));
  }
  return arrayFunction;
}

/**
 * Combines two functions into one, with a third function to determine when to use the second function instead of the first.
 *
 * Use this function to create the final formula for deployment into Google Sheets.
 *
 * @param {(tValue: T) => T} tFn A function that takes and returns a value of a generic type T.
 * @param {(uValue: U) => U} uFn A function that takes and returns a value of a generic type U.
 * @param {(value: T | U) => boolean} [isAltValueFn] Optional parameter for custom logic to determine when to use `uFn`
 * instead of `tFn`. By default, `Array.isArray` is used.
 * @return A function that takes values of either `T` or `U`, and returns a value of the same type.
 */
function combine<T, U>(tFn: (tValue: T) => T, uFn: (uValue: U) => U, isAltValueFn: (value: T | U) => boolean = Array.isArray) {
  const combinedFunction = (value: T | U) => {
    return isAltValueFn(value) ? uFn(value as U) : tFn(value as T);
  }
  return combinedFunction;
}
