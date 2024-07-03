import React from 'react'
import './Spinner.css'
import { Oval } from 'react-loader-spinner'

export default function Spinner() {
    return (
        <div className='spinner-container w-100 d-flex justify-content-center'>
            <Oval
                height={80}
                width={80}
                color="#f9f9f9"
                wrapperStyle={{}}
                wrapperClass="spinner"
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#ffff"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div>
    )
}
