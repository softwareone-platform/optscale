import CopyText from "components/CopyText";

export default {
  component: CopyText,
  argTypes: {
    text: { name: "Text", control: "text", defaultValue: "message" },
    variant: {
      name: "Variant",
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "subtitle1",
        "subtitle2",
        "body1",
        "body2",
        "caption",
        "button",
        "overline",
        "inherit"
      ],
      defaultValue: "body2"
    }
  }
};

export const basic = () => <CopyText text="CopyText">CopyText</CopyText>;

export const withKnobs = (args) => (
  <CopyText text={args.text} variant={args.variant} copyIconType={args.copyIconType}>
    {args.text}
  </CopyText>
);
