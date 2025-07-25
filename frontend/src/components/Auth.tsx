import { SingupInput } from "@slowbook/medium-blog"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate() ;
    const [postInputs, setPostInputs] = useState<SingupInput>({
        name: "",
        username: "",
        password: "",
    })

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup" ? "signup" : "signin"}` , postInputs) ;
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate('/blogs') ;
        }
        catch(e){
            //alert that the request failed
            // give a toast
            alert("Request failed") ;
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col bg-gray-900">
            <div className="flex justify-center">
                <div className="px-10">
                    <div>
                        <div className="text-3xl font-extrabold text-white">
                            Create an Account
                        </div>

                        <div className="text-gray-400">
                            {type==="signin"? "Don't have an account?" : "Already have an account?"}
                            <Link className="pl-2 underline text-blue-400 hover:text-blue-300" to={type==="signin" ? "/signup" :"/signin"}>
                            {type==="signin"? "Sign up" : "Login"} 
                            </Link>
                        </div>
                    </div>

                    <div className="pt-4">
                        {type==="signup"?<LabelledInput
                            label="Name"
                            placeholder="john ..."
                            onChange={(e) => {
                                setPostInputs({
                                    ...postInputs,
                                    name: e.target.value,
                                })
                            }}
                        />:null}

                        <LabelledInput
                            label="Email"
                            placeholder="abc@gmail.com"
                            onChange={(e) => {
                                setPostInputs({
                                    ...postInputs,
                                    username: e.target.value,
                                })
                            }}
                        />

                        <LabelledInput
                            label="Password"
                            type={"password"}
                            placeholder="123456"
                            onChange={(e) => {
                                setPostInputs({
                                    ...postInputs,
                                    password: e.target.value,
                                })
                            }}
                        />

                        <button
                            onClick={sendRequest}
                            type="button"
                            className="text-white w-full mt-8 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        >
                            {type==="signup" ? "Sign up" : "Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface LabelledInputType {
    label: string
    placeholder: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
}

function LabelledInput({
    label,
    placeholder,
    onChange,
    type,
}: LabelledInputType) {
    return (
        <div>
            <label className="block mb-2 text-sm font-semibold text-white pt-4">
                {label}
            </label>
            <input
                onChange={onChange}
                type={type || "text"}
                id="first_name"
                className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                placeholder={placeholder}
                required
            />
        </div>
    )
}
