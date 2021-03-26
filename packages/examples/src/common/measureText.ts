export type MeasureTextOptions = {
  fontFamily?: string;
  fontSize?: number;
  fontSizeUnit?: "px" | "pt" | "rem";
  fontStyle?: "normal" | "italic";
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | "normal" | "bold";
  parentElementType?: "div" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  maxElementWidth?: number;
};

export type MeasuredSize = {
  width: number;
  height: number;
};

const measureContainer = document.createElement("div");
measureContainer.style.visibility = "hidden";
measureContainer.style.position = "absolute";
measureContainer.style.zIndex = "-1";
document.body.appendChild(measureContainer);

export function measureText(text: string): MeasuredSize;
export function measureText(text: string, options: MeasureTextOptions): MeasuredSize;
export function measureText(text: string, options?: MeasureTextOptions): MeasuredSize {
  const measureElement = document.createElement(options?.parentElementType || "div");
  if (options?.maxElementWidth) {
    measureElement.style.maxWidth = `${options.maxElementWidth}px`;
  }
  if (options?.fontFamily) {
    measureElement.style.fontFamily = options.fontFamily;
  }
  if (options?.fontSize) {
    measureElement.style.fontSize = `${options.fontSize}${options?.fontSizeUnit || "px"}`;
  }
  if (options?.fontStyle) {
    measureElement.style.fontStyle = options.fontStyle;
  }
  if (options?.fontWeight) {
    measureElement.style.fontWeight = `${options.fontWeight}`;
  }

  measureElement.appendChild(document.createTextNode(text));
  measureContainer.appendChild(measureElement);
  const { width, height } = measureElement.getBoundingClientRect();
  measureContainer.removeChild(measureElement);

  return {
    width,
    height,
  };
}
