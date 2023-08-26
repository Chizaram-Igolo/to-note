import { Link, useLocation } from "react-router-dom";

function SignUpSuccess() {
  const { state } = useLocation();
  const { first_name, last_name, email } = state;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Registration Success!</h2>
        <p className="mb-4">
          Congratulations, you're one step closer to unlocking all the benefits
          of our platform. 🎉
        </p>
        <div className="border-t border-gray-300 pt-4">
          <h3 className="text-lg font-semibold mb-2">Account Details:</h3>
          <p className="mb-2">
            <span className="font-semibold">Name:</span> {first_name}{" "}
            {last_name}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Email:</span> {email}
          </p>
          <p className="text-gray-600 mb-2">
            Thank you for joining us! You can now explore and engage with our
            platform, and enjoy exclusive features. Stay tuned for exciting
            updates and events.
          </p>
          <p className="text-gray-600 mb-4">
            If you have any questions or need assistance feel free to reach out
            to us at{" "}
            <span className="text-blue-500">igolo.chizaram@gmail.com</span> or
            through our support portal.
          </p>
          <p className="text-gray-600">
            Remember, your journey with us has just begun. Get ready to
            experience success, growth, and meaningful connections!
          </p>
        </div>

        <div className="pt-4">
          <Link to={{ pathname: "/login" }}>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpSuccess;
