export function Spinner(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <defs>
        <filter id="svgSpinnersGooeyBalls20">
          <feGaussianBlur
            in="SourceGraphic"
            result="y"
            stdDeviation="1"
          ></feGaussianBlur>
          <feColorMatrix
            in="y"
            result="z"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
          ></feColorMatrix>
          <feBlend in="SourceGraphic" in2="z"></feBlend>
        </filter>
      </defs>
      <g filter="url(#svgSpinnersGooeyBalls20)">
        <circle cx="5" cy="12" r="4" fill="currentColor">
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="2s"
            keySplines=".36,.62,.43,.99;.79,0,.58,.57"
            repeatCount="indefinite"
            values="5;8;5"
          ></animate>
        </circle>
        <circle cx="19" cy="12" r="4" fill="currentColor">
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="2s"
            keySplines=".36,.62,.43,.99;.79,0,.58,.57"
            repeatCount="indefinite"
            values="19;16;19"
          ></animate>
        </circle>
        <animateTransform
          attributeName="transform"
          dur="0.75s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        ></animateTransform>
      </g>
    </svg>
  );
}
