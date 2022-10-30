// prettier.config.js or .prettierrc.js
module.exports = {
    // Use 'prettier-eslint' instead of 'prettier'. Other settings will only be fallbacks in case they could not be inferred from eslint rules.
    // eslintIntegration: true,

    // Fit code within this line limit
    printWidth: 200,

    // Number of spaces it should use per tab
    tabWidth: 4,

    // If true, will use single instead of double quotes
    singleQuote: true,

    // Controls the printing of trailing commas wherever possible
    trailingComma: 'none',

    // Controls the printing of spaces inside object literals
    bracketSpacing: true,
    // Put the > of a multi-line HTML (HTML, JSX, Vue, Angular) element at the end of the last line instead of being alone on the next line
    bracketSameLine: true,
    // Whether to add a semicolon at the end of every line
    semi: false,
    // Include parentheses around a sole arrow function parameter.
    arrowParens: 'always',

    // Indent lines with tabs
    useTabs: false

    // Advanced feature. Enable and use 'parser' parser for those language ids. Restart required
    //    javascriptEnable: ['javascript']

    // Advanced feature. Enable and use typescript parser for those language ids. Restart required
    //   typescriptEnable: ['typescript', 'typescriptreact'],

    // Advanced feature. Enable and use postcss parser for those language ids. Restart required
    // cssEnable: ['css', 'less', 'scss'],

    // Advanced feature. Enable and use json parser for those language ids. Restart required
    //   jsonEnable: ['json']

    // Advanced feature. Enable and use graphql parser for those language ids. Restart required
    // graphqlEnable: ['graphql']
}
