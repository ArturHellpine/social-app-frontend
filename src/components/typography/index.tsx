import React, {FC} from 'react';

type Props = {
  children: string
  size?: string
}

const Typography: FC<Props> = ({ children, size = 'text-md' }) => {
  return (
      <p className={`${size}`}>
        { children }
      </p>
  );
};

export default Typography;