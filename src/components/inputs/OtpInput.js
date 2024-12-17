import React, { useEffect, useRef, useState } from 'react'

const OtpInput = ({ length, onOtpSubmit }) => {
    const [otp, setOtp] = useState(new Array(length).fill(''))
    console.log(otp);
    const inputRefs = useRef([])
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus()
        }
    }, [])
    const handleChange = (i, e) => {
        const value = e.target.value
        if (isNaN(value)) return
        const newOtp = [...otp]
        newOtp[i] = value.subString(value.length - 1)
        setOtp(newOtp)
    }
    const handleClick = () => { }
    const handleKeyDown = () => { }
    return (
        <div>
            {otp.map((value, i) => (
                <input
                    key={i}
                    value={value}
                    ref={(input) => (inputRefs.current[i] = input)}
                    onChange={(e) => handleChange(i, e)}
                    onClick={() => handleClick(i)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    type="text"
                    className='text-center outline-none border rounded-md mx-1 text-[24px] w-[45px] h-[45px]'
                />
            ))}
        </div>
    )
}

export default OtpInput
