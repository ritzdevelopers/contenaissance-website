import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      svg: React.SVGProps<SVGSVGElement> & { children?: React.ReactNode };
      circle: React.SVGProps<SVGCircleElement>;
      path: React.SVGProps<SVGPathElement>;
      video: React.VideoHTMLAttributes<HTMLVideoElement> & { children?: React.ReactNode };
      span: React.HTMLAttributes<HTMLSpanElement> & { children?: React.ReactNode };
      textarea: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { required?: boolean };
      br: {};
      [elemName: string]: any;
    }
  }
}

export {};
