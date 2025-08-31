import React from "react";
import { LoaderWrapper, Spinner } from "./Loader.styles";

const Loader = ({ size = 50, color = "#6366f1" }) => {
  return (
    <LoaderWrapper>
      <Spinner size={size} color={color} />
    </LoaderWrapper>
  );
};

export default Loader;
