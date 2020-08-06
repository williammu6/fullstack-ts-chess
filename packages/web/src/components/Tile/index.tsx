import styled from "styled-components";

type Props = {
  col: number;
  row: number;
};

const isDark = (row: number, col: number) => {
  return (row % 2 === 0 && col % 2 === 1) || (row % 2 === 1 && col % 2 === 0);
};

const Tile = styled.div.attrs({
  className: ""
})`
  background: ${(p: Props) => (isDark(p.row, p.col) ? "gray" : "white")};
  flex: 1;
`;

export default Tile;
