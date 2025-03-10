export const UnicodeArrow = ({ color = "black", direction = "left" }) => {
  const arrows = {
    left: "⟵",
    right: "⟶"
  };

  return <span style={{ color, fontSize: "2em" }}>{arrows[direction] || arrows.left}</span>;
};
