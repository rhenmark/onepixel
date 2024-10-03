import { Spin } from 'antd';

const Loading = () => {
    return (
        <div className='w-full h-full grid place-items-center'>
            <Spin size='large' />
        </div>
    )
}

export default Loading