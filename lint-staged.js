module.exports = {
  "*.{js,jsx,ts,tsx}": [
    "eslint --max-warnings=0 --fix",
    "react-scripts test --bail --watchAll=false --findRelatedTests --passWithNoTests",
    () => "tsc-files --noEmit",
  ],
  "*.{json,css}": ["prettier --write"],
};
