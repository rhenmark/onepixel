"use client"

import { EyeOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Input } from "antd";
import { useRouter } from "next/navigation";
import { FormEvent, Key } from "react";

const appName = "ONEPIXEL"
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
        <div className="max-h-dvh w-dvw flex flex-col justify-start items-center gap-10 pt-40">
                <div className="flex gap-1 h-auto">
                    {
                        appName.split("").map((item: string, index: Key) => (
                            <div key={index} className="h-10 w-10 grid place-items-center text-lg font-bold text-black bg-white rounded-sm">{item}</div>
                        ))
                    }
                </div>
                <Card title="Login" className="w-full max-w-screen-sm">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Input size="large" placeholder="Username" />
                        </div>
                        <div className="mb-4">
                            <Input.Password placeholder="Password" size="large" />
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