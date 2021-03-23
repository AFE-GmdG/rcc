declare module "remarkable" {

  export type RemarkableOptions = {
    html?: boolean;
    xhtmlOut?: boolean;
    breaks?: boolean;
    langPrefix?: string;
    linkTarget?: string;
    quotes?: string;
  };

  export class Remarkable {
    constructor();
    constructor(options: RemarkableOptions);
    constructor(preset: "default" | "commonmark" | "full");
    constructor(preset: "default" | "commonmark" | "full", options: RemarkableOptions);

    set(options: RemarkableOptions): void;

    render(md: string);
    render(md: string, env: Object);
  }
}
