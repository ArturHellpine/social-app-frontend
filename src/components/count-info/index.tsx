import React, {FC} from 'react';

type Props = {
  count: number
  title: string
}

const CountInfo: FC<Props> = ({title, count}) => {
  return (
      <div className='flex flex-col items-center space-y-2 p-4'>
        <span className='text-4xl font-semibold'>{count}</span>
        <span>{title}</span>
      </div>
  );
};

export default CountInfo;