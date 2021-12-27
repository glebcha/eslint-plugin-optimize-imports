function optimizeBreaks(context, node, options) {
    const { 
        afterCount = 2, 
        symbol = 'tab', 
        symbolsCount = 1, 
        sourceCode 
    } = options;
    const { specifiers } = node;
    const source = sourceCode.getText(node);
    const spaceType = symbol === 'tab' ? `\t` : ` `;
    const spacer = spaceType.repeat(symbolsCount);
    
    const namedImports = specifiers.filter(({ type }) => type === 'ImportSpecifier');
    const importVariables = namedImports.map(({ imported, local }) => {
        const hasAlias = imported.name !== local.name;
        const name = hasAlias ? `${imported.name} as ${local.name}` : imported.name;

        return name;
    });
    const importBreaks = source.match(/(\w+,\n)/gm) || [];
    const isOptimized = importBreaks.length === namedImports.length - 1;
    const shouldBreakStatements = importVariables.length > afterCount;

    if (!isOptimized && shouldBreakStatements) {
        const names = importVariables.map(variable => `${spacer}${variable}`).join(',\n');
        const importVariablesReplacement = `{\n${names}\n}`;

        context.report({
            node,
            message: `Consider to place every import specifier on new line after count of ${afterCount} reached`,
            fix(fixer) {
                const replacement = source.replace(/{([^}]*)}/gm, importVariablesReplacement);

                return fixer.replaceText(node, replacement);
            },
        });
    }
}

module.exports = optimizeBreaks;