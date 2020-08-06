import styled from "styled-components";

type Props = {
  dark?: boolean;
};

const Tile = styled.div.attrs({
  className: ""
})`
  background: ${(p: Props) => (p.dark ? "gray" : "white")};
  flex: 1;
`;
export default Tile;
