import { Card as AntCard, CardProps } from "antd";
import { CSSProperties } from "react";

type Props = {
  style?: CSSProperties;
} & CardProps;

export const Card = ({ children, style, ...props }: Props) => {
  return (
    <AntCard
      {...props}
      style={{
        borderRadius: 8,
        ...style,
      }}
    >
      {children}
    </AntCard>
  );
};
