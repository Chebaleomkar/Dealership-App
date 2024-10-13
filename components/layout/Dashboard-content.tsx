import React from 'react'

const DashboardContent = ({children,}: Readonly<{children: React.ReactNode;}>) => {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-5 sm:py-5 sm:pl-16">
                {children}
            </div>
        </div>
    )
}

export default DashboardContent
