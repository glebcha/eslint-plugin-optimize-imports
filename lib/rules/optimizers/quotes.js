function optimizeQuotes(context, node, { exclude, single }) {
    const { source: { raw } } = node;

    const initialQuoteStyle = single ? `"` : `'`;
    const optimizedQuoteStyle = single ? `'` : `"`;
    const regExp = new RegExp(initialQuoteStyle, 'g');
    
    const shouldOptimizeQuotes = raw.includes(initialQuoteStyle);
    const isExclusion = exclude.some(keyword => raw.includes(keyword));

    if (!isExclusion && shouldOptimizeQuotes) {
        context.report({
            node,
            message: `Usage of ${single ? 'single' : 'double'} quotes recommended`,
            fix(fixer) {
                const replacement = raw.replace(regExp, optimizedQuoteStyle);

                return fixer.replaceText(node.source, replacement);
            },
        });
    }
}

module.exports = optimizeQuotes;