import styled from "styled-components";

const Tile = styled.div.attrs({
  className: "border border-solid border-2 border-gray-300"
})`
  background: white;
  width: 4.5rem;
  height: 4.5rem;
`;

export default Tile;
