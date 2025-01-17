import React from 'react'
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'
import { Button } from 'components'

const Contact = () => {
    return (
        <div className="container w-main p-4">
            <h2 className="text-2xl font-medium mb-8">Liên hệ với chúng tôi</h2>

            <div className='flex '>

                <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.9539995210657!2d106.67529067570294!3d10.738028859899492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fad027e3727%3A0x2a77b414e887f86d!2zMTgwIMSQLiBDYW8gTOG7lywgUGjGsOG7nW5nIDQsIFF14bqtbiA4LCBI4buTIENow60gTWluaCwgVmlldG5hbQ!5e0!3m2!1sen!2sus!4v1737026528306!5m2!1sen!2sus`}
                    width="65%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                ></iframe>
                {/* Store Information */}
                <div className=" p-6">
                    <h2 className="text-xl font-medium mb-6">Watch World Store</h2>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <FaMapMarkerAlt className="text-main" />
                            <span>180 Cao Lỗ, Phường 4, Quận 8, TP.HCM</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <FaPhone className="text-main" />
                            <span>0123 456 789</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <FaEnvelope className="text-main" />
                            <span>watchworld@gmail.com</span>
                        </div>

                    </div>
                </div>


            </div>

            {/* Map */}
            <div className="mt-8 w-1/2">
                <div className=" p-6">
                    <h2 className="text-xl font-medium mb-6">Gửi tin nhắn cho chúng tôi</h2>

                    <form className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Họ và tên"
                                className="w-full p-2 border rounded focus:outline-none focus:border-main"
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-2 border rounded focus:outline-none focus:border-main"
                            />
                        </div>

                        <div>
                            <textarea
                                rows="4"
                                placeholder="Nội dung"
                                className="w-full p-2 border rounded focus:outline-none focus:border-main"
                            ></textarea>
                        </div>

                        <Button name="Gửi tin nhắn" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact