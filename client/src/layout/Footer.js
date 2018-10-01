import React from 'react'

const Footer = () => {
    return (
        <div className="mg-footer" text-align="center" padding="16px">
            Copyright &copy; {new Date().getFullYear() > 2018 ? '2018 - ' + new Date().getFullYear() : '2018'}
        </div>
    )
}

export default Footer
