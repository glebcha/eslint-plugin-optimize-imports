function optimizeBreaks(context, node) {
    const { source, specifiers, importKind = 'value' } = node;
    const isReact = source.value === 'react' && importKind === 'value';
    const defaultReactImportVariable = specifiers.find(({ type }) => type === 'ImportDefaultSpecifier');
    const shouldOptimize = isReact && defaultReactImportVariable;
    const message = `Consider to avoid default React import, use namespace "* as" or named import instead`;

    if (shouldOptimize) {
        const canOptimize = specifiers.length === 1;

        function fix(fixer) {
            return fixer.replaceText(defaultReactImportVariable, '* as React');
        }

        context.report(Object.assign(
            { node, message }, 
            canOptimize && { fix },
        ));
    }
}

module.exports = optimizeBreaks;