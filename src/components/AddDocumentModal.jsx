import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const Modal = ({ isOpen, closeModal, handleAddDocument }) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Add Document</h3>
        <Formik
          initialValues={{ documentName: '', price: '' }}
          validationSchema={Yup.object({
            documentName: Yup.string().required('Document name is required'),
            price: Yup.number().required('Price is required').positive('Price must be positive'),
          })}
          onSubmit={handleAddDocument}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="documentName" className="block text-sm font-medium text-gray-700">Document Name</label>
                <Field
                  name="documentName"
                  className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.documentName && touched.documentName ? (
                  <div className="text-red-500 text-sm">{errors.documentName}</div>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <Field
                  name="price"
                  type="number"
                  className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.price && touched.price ? (
                  <div className="text-red-500 text-sm">{errors.price}</div>
                ) : null}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-gray-500 mr-4"
                  onClick={closeModal}  // Close modal without submitting
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Add Document
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Modal;
