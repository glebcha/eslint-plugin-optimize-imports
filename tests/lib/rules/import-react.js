const rule = require('../../../lib/rules/import-react');
const { RuleTester } = require('eslint');

const message = `Consider to avoid default React import, use namespace "* as" or named import instead`;

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

ruleTester.run('import react test', rule, {
    valid: [
		{
            code: 'import * as React from "react";',
        },
        {
            code: 'import React from "preact";',
        },
        {
            code: 'import { useState } from "react";',
        },
    ],
    invalid: [
        {
            code: 'import React from "react";',
            errors: [{ message }],
            output: 'import * as React from "react";',
        },
        {
            code: 'import React, {useState} from "react";',
            errors: [{ message }],
        },
    ]
});