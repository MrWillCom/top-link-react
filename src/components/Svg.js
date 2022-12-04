import { useState, useEffect } from "react";

export function DeleteSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
    </svg>
  );
}

export function PictureSvg(props) {
  const [size, setSize] = useState("24");
  const [strokeWidth, setStrokeWidth] = useState("1");

  useEffect(() => {
    if (props.size) {
      setSize(props.size);
    }
    setStrokeWidth(props.strokeWidth || "1");
  }, [props.size, props.strokeWidth]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-photo"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="#2c3e50"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1="15" y1="8" x2="15.01" y2="8" />
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5" />
      <path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2" />
    </svg>
  );
}

export function MusicSvg(props) {
  const [size, setSize] = useState("24");
  useEffect(() => {
    if (props.size) {
      setSize(props.size);
    }
  }, [props.size]);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-music"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#2c3e50"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="6" cy="17" r="3" />
      <circle cx="16" cy="17" r="3" />
      <polyline points="9 17 9 4 19 4 19 17" />
      <line x1="9" y1="8" x2="19" y2="8" />
    </svg>
  );
}

export function CardItemSvg(props) {
  const [size, setSize] = useState("24");
  useEffect(() => {
    if (props.size) {
      setSize(props.size);
    }
  }, [props.size]);
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M5 4C5.55228 4 6 3.55228 6 3C6 2.44772 5.55228 2 5 2C4.44772 2 4 2.44772 4 3C4 3.55228 4.44772 4 5 4ZM6 8C6 8.55228 5.55228 9 5 9C4.44772 9 4 8.55228 4 8C4 7.44772 4.44772 7 5 7C5.55228 7 6 7.44772 6 8ZM6 13C6 13.5523 5.55228 14 5 14C4.44772 14 4 13.5523 4 13C4 12.4477 4.44772 12 5 12C5.55228 12 6 12.4477 6 13ZM12 8C12 8.55228 11.5523 9 11 9C10.4477 9 10 8.55228 10 8C10 7.44772 10.4477 7 11 7C11.5523 7 12 7.44772 12 8ZM11 14C11.5523 14 12 13.5523 12 13C12 12.4477 11.5523 12 11 12C10.4477 12 10 12.4477 10 13C10 13.5523 10.4477 14 11 14ZM12 3C12 3.55228 11.5523 4 11 4C10.4477 4 10 3.55228 10 3C10 2.44772 10.4477 2 11 2C11.5523 2 12 2.44772 12 3Z" fill="#676B5F"></path>
    </svg>
  )
}

export function EditSvg(props) {
  const [size, setSize] = useState("24");
  useEffect(() => {
    if (props.size) {
      setSize(props.size);
    }
  }, [props.size]);
  return (
    <svg style={{ color: "rgb(190, 193, 195)", fill: "currentcolor" }} width={size} height={size} fontStyle="italic" viewBox="0 0 12 12" enableBackground="new 0 0 24 24" className="">
      <path d="M2.5,6.67188,8.46477.70711a1,1,0,0,1,1.41421,0L11.29289,2.121a1,1,0,0,1,0,1.41421L5.32813,9.5ZM4.32813,10.5,0,12,1.5,7.67188Z"></path>
    </svg>
  )
}

export function CloseSvg(props) {
  const [size, setSize] = useState("24");
  useEffect(() => {
    if (props.size) {
      setSize(props.size);
    }
  }, [props.size]);
  return (
    <svg height={size} viewBox="0 0 32 32" width={size} xmlns="http://www.w3.org/2000/svg">
      <path d="m23.542371 10.62753-1.491936-1.4919365-5.914843 5.9148425-5.914843-5.9148425-1.4919365 1.4919365 5.9148425 5.914843-5.9148425 5.914843 1.4919365 1.491936 5.914843-5.914842 5.914843 5.914842 1.491936-1.491936-5.914842-5.914843z" fill="#656565" fillRule="evenodd" strokeWidth="1.058111" />
    </svg>
  )
}

export function VerifySvg(props) {
  const [size, setSize] = useState("16");
  useEffect(() => {
    if (props.size) {
      setSize(props.size);
    }
  }, [props.size]);

  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M8.5247 15.1234C8.203 14.9251 7.797 14.9251 7.4753 15.1234L7.14873 15.3247C6.6942 15.6048 6.09974 15.4785 5.79845 15.0377L5.58199 14.721C5.36875 14.409 4.99785 14.2438 4.62332 14.2941L4.24311 14.3452C3.71392 14.4162 3.22226 14.059 3.12631 13.5338L3.05737 13.1564C2.98947 12.7847 2.7178 12.483 2.35519 12.3766L1.98709 12.2686C1.47475 12.1182 1.17088 11.5919 1.29687 11.0731L1.38738 10.7003C1.47655 10.333 1.35109 9.94692 1.0631 9.70224L0.770757 9.45385C0.363852 9.10813 0.300327 8.50373 0.626462 8.08096L0.860777 7.77722C1.0916 7.47801 1.13404 7.07424 0.970468 6.73358L0.804424 6.38776C0.573314 5.90643 0.761114 5.32844 1.23101 5.07488L1.56861 4.8927C1.90117 4.71324 2.10417 4.36164 2.0933 3.9839L2.08227 3.60044C2.06692 3.06672 2.47357 2.61509 3.00597 2.57457L3.38848 2.54546C3.76529 2.51678 4.09375 2.27814 4.23746 1.92864L4.38335 1.57385C4.5864 1.08002 5.1416 0.832836 5.64445 1.01237L6.00573 1.14135C6.36163 1.26842 6.75875 1.18401 7.03219 0.923173L7.30978 0.658391C7.69613 0.289852 8.30387 0.289852 8.69022 0.658392L8.96781 0.923173C9.24125 1.18401 9.63837 1.26842 9.99427 1.14135L10.3555 1.01237C10.8584 0.832836 11.4136 1.08002 11.6167 1.57385L11.7625 1.92864C11.9063 2.27814 12.2347 2.51678 12.6115 2.54546L12.994 2.57457C13.5264 2.61509 13.9331 3.06672 13.9177 3.60044L13.9067 3.9839C13.8958 4.36164 14.0988 4.71324 14.4314 4.8927L14.769 5.07488C15.2389 5.32844 15.4267 5.90643 15.1956 6.38776L15.0295 6.73358C14.866 7.07424 14.9084 7.47801 15.1392 7.77722L15.3735 8.08096C15.6997 8.50373 15.6361 9.10813 15.2292 9.45385L14.9369 9.70224C14.6489 9.94692 14.5234 10.333 14.6126 10.7003L14.7031 11.0731C14.8291 11.5919 14.5253 12.1182 14.0129 12.2686L13.6448 12.3766C13.2822 12.483 13.0105 12.7847 12.9426 13.1564L12.8737 13.5338C12.7777 14.059 12.2861 14.4162 11.7569 14.3452L11.3767 14.2941C11.0021 14.2438 10.6313 14.409 10.418 14.721L10.2015 15.0377C9.90026 15.4785 9.3058 15.6048 8.85127 15.3247L8.5247 15.1234Z" fill="#00B6FF" />
      <path d="M5.06998 7.56265L7.1913 9.68397L11.4339 5.44133" stroke="white" strokeWidth="2" />
    </svg>
  )
}

export function PlusSvg(props) {
  const [size, setSize] = useState("24");
  useEffect(() => {
    if (props.size) {
      setSize(props.size);
    }
  }, [props.size]);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" strokeWidth="2" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}


export function LoadingSvg(props) {
  const [fill, setFill] = useState("#8129d9");

  useEffect(()=>{
    if(props.fill){
      setFill(props.fill);
    }
  }, props.fill)

  return (
    <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
      viewBox="0 0 100 100" enableBackground="new 0 0 0 0" strokeWidth="1.2">
      <path fill={fill} d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur=".7s"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite" />
      </path>
    </svg>
  )
}