"use client"

import { Button, Result } from 'antd';

const NotFound = () => (
  <div className='h-dvh w-dvw grid place-items-center text-white'>
  <Result
    status="404"
    title="404"
    subTitle={<span className='text-white'>Sorry, the page you visited does not exist.</span>}
    extra={<Button href='/' type="primary">Back Home</Button>}
  />
  </div>
);

export default NotFound;