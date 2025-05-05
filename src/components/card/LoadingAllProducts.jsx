import React from 'react'

const LoadingAllProducts = () => {
    return (
        <div className="flex justify-center flex-col items-center h-[70vh] space-y-2">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-t-blue-700 border-gray-200"></div>
            <div>Loading Data...</div>
        </div>
    )
}

export default LoadingAllProducts