const viewPath = __dirname.replace(/\\/g, "/");

module.exports = {
  "src/**/*.{ts,tsx,js,jsx}": [
    (filenames) =>
      `next lint --no-cache --fix --file ${filenames
        .map((file) => file.split(viewPath)[1])
        .join(" --file ")} --max-warnings 0`,
  ],
};
