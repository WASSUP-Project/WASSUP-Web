import React from "react";

type SpacerProps = {
  height?: number;
};

export default function Spacer(props: SpacerProps) {
  const convertedHeight =
    typeof props.height === "number" ? `${props.height}rem` : "10rem";

  return <div style={{ height: convertedHeight }} />;
}
