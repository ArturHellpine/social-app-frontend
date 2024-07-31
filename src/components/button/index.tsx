import React, { FC } from 'react';
import { Button as NextButton } from "@nextui-org/react";

type Props = {
  children: React.ReactNode
  icon?: JSX.Element
  classname?: string
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined
}

const Button: FC<Props> = ({ color, type, children, icon, classname, fullWidth }) => {
  return (
      <NextButton
          startContent={ icon }
          size='lg'
          color={ color }
          variant='light'
          className={ classname }
          type={ type }
          fullWidth={ fullWidth }
      >
        { children }
      </NextButton>
  );
};

export default Button;