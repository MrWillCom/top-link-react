import { useState, useEffect} from "react";

export default function DeleteSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
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
  useEffect(() => {
    if(props.size) {
      setSize(props.size);
    }
  }, [props.size]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-photo"
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
    if(props.size) {
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
