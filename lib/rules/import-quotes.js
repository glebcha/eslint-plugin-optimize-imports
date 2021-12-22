const optimizeQuotes = require('./optimizers/quotes');

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Replace quotes from double to single or vice-versa for import source',
            category: 'Possible Improvements',
            recommended: true,
        },
        fixable: 'code',
        schema: [
            {
                additionalProperties: false,
                type: 'object',
                properties: {
                    exclude: {
                        type: 'array',
                        items: {
                            type: 'string'
                        }
                    },
                    single: {
                        type: 'boolean'
                    }
                }
            }
        ],
    },

    create(context) {
        const {
            single = true,
            exclude = [],
        } = context.options[0] || {};

        function optimizeImportQuotes(node) {
            optimizeQuotes(context, node, { exclude, single });
        }

        return {
            'ImportDeclaration': optimizeImportQuotes,
        }
    },
}