import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'
import logo from 'assets/logo.png'
import path from 'utils/path'

const Footer = () => {
    return (
        <footer
            className="w-full bg-white text-center text-neutral-600 lg:text-left">


            {/* <!-- Main container div: holds the entire content of the footer, including four sections (TW Elements, Products, Useful links, and Contact), with responsive styling and appropriate padding/margins. --> */}
            <div className='flex justify-center'>
                <div className="w-main mx-6 py-10 text-center border-t md:text-left">
                    <div className="flex flex-8">
                        {/* <!-- TW Elements section --> */}
                        <div className="flex-2">
                            <h6
                                className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
                                <div className='w-[150px] ' ><Link to={`/${path.HOME}`}><img src={logo} alt='logo' /></Link></div>

                            </h6>
                            <div className="flex items-center gap-3 mb-4">
                                <FaMapMarkerAlt className="text-main" />
                                <span>180 Cao Lỗ, Phường 4, Quận 8, TP.HCM</span>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <FaPhone className="text-main" />
                                <span>0123 456 789</span>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <FaEnvelope className="text-main" />
                                <span>watchworld@gmail.com</span>
                            </div>
                        </div>
                        {/* <!-- Products section --> */}
                        <div className="flex-1">
                            <h6
                                className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                                Products
                            </h6>
                            <p className="mb-4">
                                <span className="text-neutral-600 "
                                >Angular</span>
                            </p>
                            <p className="mb-4">
                                <span className="text-neutral-600 "
                                >React</span>
                            </p>
                            <p className="mb-4">
                                <span className="text-neutral-600 "
                                >Vue</span>
                            </p>
                            <p>
                                <span className="text-neutral-600 "
                                >Laravel</span>
                            </p>
                        </div>
                        {/* <!-- Useful links section --> */}
                        <div className="flex-1">
                            <h6
                                className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                                Useful links
                            </h6>
                            <p className="mb-4">
                                <span className="text-neutral-600 "
                                >Pricing</span>
                            </p>
                            <p className="mb-4">
                                <span className="text-neutral-600 "
                                >Settings</span>
                            </p>
                            <p className="mb-4">
                                <span className="text-neutral-600 "
                                >Orders</span>
                            </p>
                            <p>
                                <span className="text-neutral-600 "
                                >Help</span>
                            </p>
                        </div>
                        {/* <!-- Contact section --> */}
                        <div className='flex-1'>
                            <h6
                                className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                                Useful links
                            </h6>
                            <p className="mb-4">
                                <span className="text-neutral-600 "
                                >Pricing</span>
                            </p>
                            <p className="mb-4">
                                <span className="text-neutral-600 "
                                >Settings</span>
                            </p>
                            <p className="mb-4">
                                <span className="text-neutral-600 "
                                >Orders</span>
                            </p>
                            <p>
                                <span className="text-neutral-600 "
                                >Help</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!--Copyright section--> */}
            <div className="bg-neutral-200 p-6 text-center ">
                <span>© 2024 Copyright: </span>
                <span
                    className="font-semibold text-neutral-600 "
                > WatchWorld</span>
            </div>
        </footer>
    )
}

export default memo(Footer)
