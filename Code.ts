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
 * @param {string|Array<Array<string>>} value A string or array of strings that will be inserted into the greeting.
 * @return Hello, {value}!
 * @customfunction
 */
function HELLO(value: string | Array<Array<string>>): string | Array<Array<string>> {
  return Array.isArray(value) ? value.map(row => row.map(cell => `Hello, ${cell}!`)) : `Hello, ${value}!`;
}
