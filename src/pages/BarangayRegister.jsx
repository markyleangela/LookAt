import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import barangayService from '../api/barangayService';

export const BarangayRegister = () => {
  const RegisterForm = () => {
    const formik = useFormik({
      // Initialize values
      initialValues: {
        barangayName: '',
        purok: '',
        barangayLoc: '',
        cityMunicipality: '',
        province: '',
      },
      validationSchema: Yup.object({
        barangayName: Yup.string().required('Barangay Name is required'),
        purok: Yup.string().required('Purok is required'),
        barangayLoc: Yup.string().required('Barangay Location is required'),
        cityMunicipality: Yup.string().required('City/Municipality is required'),
        province: Yup.string().required('Province is required'),
      }),
      onSubmit: async (values) => {
        try {
          const response = await barangayService.createBarangay(values);
          alert('Barangay registered successfully');
          console.log('Response:', response);
        } catch (error) {
          alert('Error registering barangay');
          console.error('Error: ', error);
        }
      }
    });

    return (
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-accent1">
          Barangay Registration
        </h2>

        {/* Barangay Name */}
        <div>
          <label htmlFor="barangayName" className="block text-gray-700 font-medium">
            Barangay Name
          </label>
          <input
            id="barangayName"
            type="text"
            name="barangayName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.barangayName}
            className={`w-full p-2 border rounded-md ${
              formik.touched.barangayName && formik.errors.barangayName
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          />
          {formik.touched.barangayName && formik.errors.barangayName && (
            <p className="text-red-500 text-sm">{formik.errors.barangayName}</p>
          )}
        </div>

        {/* Purok */}
        <div>
          <label htmlFor="purok" className="block text-gray-700 font-medium">
            Purok
          </label>
          <input
            id="purok"
            type="text"
            name="purok"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.purok}
            className={`w-full p-2 border rounded-md ${
              formik.touched.purok && formik.errors.purok
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          />
          {formik.touched.purok && formik.errors.purok && (
            <p className="text-red-500 text-sm">{formik.errors.purok}</p>
          )}
        </div>

        {/* Barangay Location */}
        <div>
          <label htmlFor="barangayLoc" className="block text-gray-700 font-medium">
            Barangay Location
          </label>
          <input
            id="barangayLoc"
            type="text"
            name="barangayLoc"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.barangayLoc}
            className={`w-full p-2 border rounded-md ${
              formik.touched.barangayLoc && formik.errors.barangayLoc
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          />
          {formik.touched.barangayLoc && formik.errors.barangayLoc && (
            <p className="text-red-500 text-sm">{formik.errors.barangayLoc}</p>
          )}
        </div>

        {/* City/Municipality */}
        <div>
          <label htmlFor="cityMunicipality" className="block text-gray-700 font-medium">
            City/Municipality
          </label>
          <input
            id="cityMunicipality"
            type="text"
            name="cityMunicipality"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cityMunicipality}
            className={`w-full p-2 border rounded-md ${
              formik.touched.cityMunicipality && formik.errors.cityMunicipality
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          />
          {formik.touched.cityMunicipality && formik.errors.cityMunicipality && (
            <p className="text-red-500 text-sm">{formik.errors.cityMunicipality}</p>
          )}
        </div>

        {/* Province */}
        <div>
          <label htmlFor="province" className="block text-gray-700 font-medium">
            Province
          </label>
          <input
            id="province"
            type="text"
            name="province"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.province}
            className={`w-full p-2 border rounded-md ${
              formik.touched.province && formik.errors.province
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          />
          {formik.touched.province && formik.errors.province && (
            <p className="text-red-500 text-sm">{formik.errors.province}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-accent1 text-white py-2 rounded-md font-medium hover:bg-accent2"
        >
          Register
        </button>
      </form>
    );
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-3   00">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
};
