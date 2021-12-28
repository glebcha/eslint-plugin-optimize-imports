const optimizeReact = require('./optimizers/react');

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Replace default React import with namespace if possible',
            category: 'Possible Improvements',
            recommended: true,
        },
        fixable: 'code',
        schema: [],
    },

    create(context) {
        function optimizeImportReact(node) {
            optimizeReact(context, node);
        }

        return {
            'ImportDeclaration': optimizeImportReact,
        }
    },
}