import React from "react";
import resolveConfig from "tailwindcss/resolveConfig";

const ELEMENT_DIV = "div";

const createComponents = (elementName, baseClassName) => {
  switch (elementName) {
    case ELEMENT_DIV:
      return ({ children, className, ...props }) => (
        <div className={`${baseClassName} ${className}`} {...props}>
          {children}
        </div>
      );
  }
};

const compileColorClass = (prefix, main, sub = null) =>
  sub ? `${prefix}-${main}-${sub}` : `${prefix}-${main}`;

const compileColorWrappers = (prefix, elementName, colorMap) => {
  return Object.keys(colorMap).reduce((current, colorKey) => {
    const subColorMap = colorMap[colorKey];
    if (typeof subColorMap === "object") {
      current[colorKey] = Object.keys(subColorMap).reduce(
        (subCurrent, subColor) => {
          subCurrent[`S${subColor}`] = createComponents(
            elementName,
            compileColorClass(prefix, colorKey, subColor)
          );
          return subCurrent;
        },
        {}
      );
    } else {
      current[colorKey] = createComponents(
        elementName,
        compileColorClass(prefix, colorKey)
      );
    }
    return current;
  }, {});
};

const Tailwind = {};
const { theme } = resolveConfig();

Tailwind.Text = compileColorWrappers("text", ELEMENT_DIV, theme.textColor);
Tailwind.Background = compileColorWrappers(
  "bg",
  ELEMENT_DIV,
  theme.backgroundColor
);
Tailwind.Border = compileColorWrappers(
  "border",
  ELEMENT_DIV,
  theme.backgroundColor
);

export default Tailwind;
