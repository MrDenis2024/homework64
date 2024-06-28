import React from 'react';

interface Props {
  date: string;
}

const DateFormat: React.FC<Props> = ({date}) => {
  const dateFormat = (date: string) => {
    const postDate = new Date(date);
    return [
        postDate.getDate(),
        postDate.getMonth() + 1,
        postDate.getFullYear()
      ].join('.') + ' ' +
      [postDate.getHours(),
        postDate.getMinutes()].join(':');
  };
  return (
    <span>
      {dateFormat(date)}
    </span>
  );
};

export default DateFormat;