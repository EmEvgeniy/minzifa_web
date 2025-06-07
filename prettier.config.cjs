/** @type {import("prettier").Config} */
module.exports = {
  semi: true, // всегда ставить точку с запятой
  singleQuote: true, // использовать одинарные кавычки
  printWidth: 100, // максимальная длина строки — 100 символов
  tabWidth: 2, // отступ — 2 пробела
  useTabs: false, // использовать пробелы вместо табов
  trailingComma: "all", // запятые после последнего элемента (важно для Git-диффов)
  bracketSpacing: true, // пробелы внутри фигурных скобок: { foo: bar }
  arrowParens: "always", // всегда использовать скобки в стрелочных функциях: (x) => x
  endOfLine: "lf", // использовать LF для всех систем (надежно на CI/CD)
  proseWrap: "always", // оборачивать markdown-тексты
  jsxSingleQuote: false, // в JSX — двойные кавычки
  jsxBracketSameLine: false, // переносить > на новую строку в JSX
};
