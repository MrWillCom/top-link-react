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
    <svg style={{color:"rgb(190, 193, 195)", fill:"currentcolor"}} width={size} height={size} fontStyle="italic" viewBox="0 0 12 12" enableBackground="new 0 0 24 24" className="">
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
    <path d="m23.542371 10.62753-1.491936-1.4919365-5.914843 5.9148425-5.914843-5.9148425-1.4919365 1.4919365 5.9148425 5.914843-5.9148425 5.914843 1.4919365 1.491936 5.914843-5.914842 5.914843 5.914842 1.491936-1.491936-5.914842-5.914843z" fill="#656565" fillRule="evenodd" strokeWidth="1.058111"/>
  </svg>
  )
}