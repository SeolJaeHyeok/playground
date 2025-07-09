import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              Atomic Components
            </Link>
            
            {location.pathname !== '/' && (
              <Link
                to="/"
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                ← 홈으로
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
} 