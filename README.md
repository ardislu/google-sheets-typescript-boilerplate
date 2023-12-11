# google-sheets-typescript-boilerplate
[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

Boilerplate for writing custom Google Sheets functions and UI customizations in Typescript. Included:
- Minimal example to demonstrate UI customization (custom menu dropdowns, custom popup)
- Minimal examples to demonstrate different types of custom formulas
- Helper functions to address edge cases specific to spreadsheet formulas

Reference JSDoc comments in `Code.ts` for more information.

## Requirements
- [Node.js](https://nodejs.org/)
- [git](https://git-scm.com/)
- A Google Apps Script project attached to a Google Sheet to pull and push to (see section below)

## Quickstart
1. Clone this repo
```
git clone https://github.com/ardislu/google-sheets-typescript-boilerplate.git
```

2. Install project dependencies
```
npm i
```

3. Authorize yourself in `clasp` (see [`clasp` documentation](https://developers.google.com/apps-script/guides/clasp) for more information)
```
npm run clasp login
```

4. Write custom functions and UI customizations for Google Sheets in `Code.ts` (in Typescript!)
5. Use `npm run clasp pull` and `npm run clasp push` to sync with the remote Google Apps Scripts project (see below)

## Create a Google Apps Script project attached to a Google Sheet
You need a `.clasp.json` file in the project root with the property `scriptID` for `clasp pull` and `clasp push` to work. Use `.clasp.json.example` as an example.

1. [Create a new Google Sheet](https://sheets.new).
2. Give the sheet a name to save it.
3. In the spreadsheet, click `Extensions > Apps Script` to create and attach a Google Apps Script project to the sheet.
4. Give the Google Apps Script project a name to save it.
5. In the Google Apps Script project, click `Project Settings` to find the `Script ID`.
6. Paste the `Script ID` into `.clasp.json`:
``` json
{
  "scriptId": "..."
}
```

Follow the same steps above to attach this project to an existing Google Sheet or Google Apps Script project. You can view existing Google Apps Script projects at [script.google.com](script.google.com).
- Note that if you use `clasp push` on an existing Google Apps Script project, you will **overwrite any existing code in the project**.

Reference the [clasp documentation](https://developers.google.com/apps-script/guides/clasp) for more details.

## npm scripts
Access the `clasp` CLI
```
npm run clasp
```

Run `eslint`
```
npm run lint
```

## Custom Google Sheets formulas
When writing functions intended to be used in a Google Sheet (i.e. a custom formula), you:

**MUST**
- Declare the function with `function MY_FUNCTION() {...}`. Named function expressions like `const MY_FUNCTION = () => {...}` will NOT be accessible in the Sheet.
- Use the `@customfunction` tag in the function's JSDoc comment.
- Not end the function name with an underscore `_`.
- Make the function deterministic (no `Math.random()` or `Date.now()`).
- Optimize the function to return a value within 30 seconds (or the Apps Script server will time out).

**SHOULD**
- Use the `ALL_CAPS_WITH_UNDERSCORES` naming convention.
- Design the function to accept and return 2D arrays `Array<Array<...>>` (i.e. make it an array formula) to minimize roundtrip calls to the Google Apps Script server.
