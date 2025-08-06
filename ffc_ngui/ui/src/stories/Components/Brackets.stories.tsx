import Brackets from "components/Brackets";

export default {
  component: Brackets,
  argTypes: {
    bold: { name: "Bold", control: "boolean", defaultValue: false },
    type: {
      name: "Type",
      control: "select",
      options: ["round", "curly", "square", "angle"],
      defaultValue: "round"
    },
    children: { name: "Children", control: "text", defaultValue: "..." }
  }
};

export const basic = () => <Brackets />;

export const bold = () => <Brackets bold />;

export const withChildren = () => <Brackets>{"..."}</Brackets>;

export const withKnobs = (args) => (
  <Brackets bold={args.bold} type={args.type}>
    {args.children}
  </Brackets>
);
