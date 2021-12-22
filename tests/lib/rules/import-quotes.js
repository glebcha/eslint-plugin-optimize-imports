const rule = require('../../../lib/rules/import-quotes');
const { RuleTester } = require('eslint');

RuleTester.setDefaultConfig({
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		ecmaFeatures: {
            jsx: true,
        },
	}
});

const ruleTester = new RuleTester();

ruleTester.run('import quotes test', rule, {
    valid: [
		{
			code: `import * as React from 'react'`,
			options: []	
		},
		{
			code: `import * as React from "react"`,
			options: [{ single: false }]
		},
        {
			code: `import * as React from "react"`,
			options: [{ exclude: ['react'] }]
		}
    ],
    invalid: [
        {
            code: `import { Fragment } from "react"`,
			options: [],
            output: `import { Fragment } from 'react'`,
            errors: [{ message: 'Usage of single quotes recommended' }]
        },
		{
            code: `import React from 'react'`,
			options: [{ single: false }],
            output: `import React from "react"`,
            errors: [{ message: 'Usage of double quotes recommended' }]
        }
    ]
});