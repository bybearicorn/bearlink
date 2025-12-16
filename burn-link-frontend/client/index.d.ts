import React from "react";

declare module "*.svg" {
  import * as React from "react";
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement> & { title?: string }>;
  // eslint-disable-next-line no-restricted-exports -- for SVG this is needed, and also makes sence
  export default ReactComponent;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      molecule: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      atom: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      organism: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      modal: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "page-wrapper": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
