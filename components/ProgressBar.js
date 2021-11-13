import React from "react";

export default function ProgressBar({ progress }) {
  return (
    <div className="progress flex-fill">
      <div
        className="progress-bar bg-success"
        role="progressbar"
        style={{ width: `${progress}%` }}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  );
}
