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
 * Combines two functions into one.
 *
 * Use this function to create the final function for deployment into Google Sheets.
 *
 * @param {(singleValue: T) => T} sf A function that takes and returns a value of a generic type T.
 * @param {(arrayValue: T[][]) => T[][]} af A function that takes and returns a 2-D array of a generic type T.
 * @param {(value: T | T[][]) => boolean} [isArrayValueFn] Optional parameter for custom logic to determine when to use `af`
 * instead of `sf`. By default, `Array.isArray` is used.
 * @return A function that takes values of either `T` or `T[][]`, and returns a value of the same type.
 */
function combine<T>(sf: (singleValue: T) => T, af: (arrayValue: T[][]) => T[][], isArrayValueFn?: (value: T | T[][]) => boolean) {
  const combinedFunction = (value: T | T[][]) => {
    if (isArrayValueFn !== undefined) {
      return isArrayValueFn(value) ? af(value as T[][]) : sf(value as T);
    }
    else {
      return Array.isArray(value) ? af(value) : sf(value);
    }
  }
  return combinedFunction;
}
