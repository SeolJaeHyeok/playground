import nextJest from 'next/jest.js';


const createJestConfig = nextJest({
    dir: './',
});

/** @type {import('jest').Config} */
const config = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.mjs'],
    testEnvironment: 'jest-environment-jsdom',
};

export default createJestConfig(config);