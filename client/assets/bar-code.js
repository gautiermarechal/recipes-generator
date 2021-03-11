import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 297 297" {...props}>
      <Path d="M0 49.5h33v198H0zM83 49.5h33v198H83zM133 49.5h33v198h-33zM248 49.5h49v198h-49zM50 49.5h16v198H50zM182 49.5h16v198h-16zM215 49.5h16v198h-16z" />
    </Svg>
  );
}

export default SvgComponent;
