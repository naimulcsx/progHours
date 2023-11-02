/* eslint-disable */
export default {
  setupFilesAfterEnv: ["<rootDir>/test-setup.ts"],
  displayName: "web",
  preset: "../../jest.preset.js",
  transform: {
    "^.+\\.[tj]sx?$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.spec.json" }]
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../coverage/apps/web"
};
