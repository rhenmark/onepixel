"use client"

import { EyeOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Input } from "antd";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

function Login() {
    const router = useRouter()
    
    
    const handleEyeClick = () => {
        // alert('eye')
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        router.push("/dashboard")
    }
    
    return (
        <div className="h-screen w-screen grid place-items-center">
            <Card title="Login" className="w-full max-w-screen-md">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input size="large" placeholder="Username" />
                    </div>
                    <div className="mb-4">
                        <Input size="large" placeholder="Password" type="password" suffix={<Button onClick={handleEyeClick} icon={<EyeOutlined />} />}  />
                    </div>
                    <div className="my-4">
                        <Button type="primary" block size="large" htmlType="submit" >Login</Button>
                    </div>
                    <div>
                        <Divider />
                        <Button>Forgot Password</Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default Login;