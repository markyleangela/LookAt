import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import barangayService from '../../api/barangayService';

const Login = () => {
  // Formik setup
  const formik = useFormik({
    initialValues: {
      barangayId: '',
      password: '',
    },
    validationSchema: Yup.object({
      barangayId: Yup.string()
        .required('BarangayId is required'),
      password: Yup.string()
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await barangayService.login(values);
        window.location.href = `/barangay/${values.barangayId}/home`;
      } catch (error) {
        console.error('Error: ', error);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-accent1">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Login
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="barangayId"
              className="block text-sm font-medium text-gray-700"
            >
              Barangay ID
            </label>
            <input
              type="text"
              id="barangayId"
              name="barangayId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.barangayId}
              className={`mt-1 block w-full p-2 border rounded-md ${
                formik.touched.barangayId && formik.errors.barangayId
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="Enter Barangay ID"
            />
            {formik.touched.barangayId && formik.errors.barangayId && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.barangayId}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`mt-1 block w-full p-2 border rounded-md ${
                formik.touched.password && formik.errors.password
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-accent2 text-white py-2 rounded-md font-medium hover:bg-accent1"
          >
            Login
          </button>

          <div className="text-left text-sm text-gray-600 mt-4">            
              <a
                href="/barangay/register"
                className="text-blue-600 hover:underline"
              >
                Register here
              </a>
            <p>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
