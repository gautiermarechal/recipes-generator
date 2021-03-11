import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
      <Path d="M225.813 48.907L128 146.72 30.187 48.907 0 79.093l128 128 128-128z" />
    </Svg>
  );
}

export default SvgComponent;
