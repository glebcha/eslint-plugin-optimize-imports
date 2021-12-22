const optimizeBreaks = require('./optimizers/breaks');

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Add new line breaks after defined number of import variables',
            category: 'Possible Improvements',
            recommended: true,
        },
        fixable: 'code',
        schema: [
            {
                additionalProperties: false,
                type: 'object',
                properties: {
                    afterCount: {
                        type: 'number'
                    },
                    symbol: {
                        enum: ['tab', 'space']
                    },
                    symbolsCount: {
                        type: 'number'
                    }
                }
            }
        ],
    },

    create(context) {
        const {
            afterCount = 2, 
            symbol = 'tab', 
            symbolsCount = 4,
        } = context.options[0] || {};
        const sourceCode = context.getSourceCode();
        const optimizerOptions = { afterCount, symbol, symbolsCount, sourceCode };

        function optimizeImportBreaks(node) {
            optimizeBreaks(context, node, optimizerOptions);
        }

        return {
            'ImportDeclaration': optimizeImportBreaks,
        }
    },
}