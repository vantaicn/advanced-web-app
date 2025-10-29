import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome to User Registration System
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            A complete authentication system built with NestJS and React
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md border-2 border-indigo-600 hover:bg-indigo-50 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Login
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-semibold text-gray-800 mb-2">Secure</h3>
              <p className="text-sm text-gray-600">
                Password hashing with bcrypt for maximum security
              </p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-lg">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-gray-800 mb-2">Fast</h3>
              <p className="text-sm text-gray-600">
                Built with modern technologies for optimal performance
              </p>
            </div>
            <div className="p-6 bg-purple-50 rounded-lg">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-semibold text-gray-800 mb-2">Modern</h3>
              <p className="text-sm text-gray-600">
                Clean UI with Tailwind CSS and React Hook Form
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
