import { useState } from 'react'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    React + TypeScript + Vite
                </h1>
                <div className="p-4">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => setCount((count) => count + 1)}
                    >
                        Count is: {count}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default App 