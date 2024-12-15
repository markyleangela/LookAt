import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import documentService from "../../api/DocumentService";
import Switch from "@mui/material/Switch";



const DocumentCard = ({ document }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(document);


  const toggleEdit = () => setIsEditing(!isEditing);

  useEffect(() => {
    setCurrentDocument(document);
  }, [document]);

  const validationSchema = Yup.object({
    documentName: Yup.string().required("Document name is required"),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Price must be greater than or equal to 0"),
    isAvailable: Yup.boolean(),
  });

  const handleSubmit = async (values) => {
    try {
        const response = await documentService.updateDocument(document.documentId, values);
        alert("nice ka bai edited ni");
        console.log(response.data);
        setCurrentDocument(values);
    } catch (error) {
        alert("taronga bai naay sayop");
    }
    setIsEditing(false); 
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between items-center hover:scale-105 transform transition duration-200 ease-in-out h-56 w-48 mx-5 border border-gray-300">
      {!isEditing ? (
        <>
          {/* Header Section */}
          <div className="bg-accent2 h-8 w-full rounded-t-md flex items-center justify-center">
            <p className="text-white text-md font-semibold">{document.documentName}</p>
          </div>
          {/* Content Section */}
          <div className="flex flex-col justify-center items-center flex-1 mt-4">
          <p className="font-semibold text-lg">Document ID: {document.documentId}</p>
            <p className="font-semibold text-lg">{document.price?.toFixed(1) || "0.00"}</p>
            <p className={`text-sm mt-2 ${document.isAvailable ? "text-green-600" : "text-red-600"}`}>
              {document.isAvailable ? "Available" : "Not Available"}
            </p>
          </div>
          {/* Edit Button */}
          <button
            className="mt-4 px-4 py-2 bg-accent1 text-white rounded shadow hover:bg-accent1-dark"
            onClick={toggleEdit}
          >
            Edit
          </button>
        </>
      ) : (
        <Formik
          initialValues={{
            documentName: document.documentName,
            price: document.price,
            isAvailable: document.isAvailable,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col space-y-2 w-full">
              <div>
                <Field
                  type="text"
                  name="documentName"
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Document Name"
                />
                <ErrorMessage
                  name="documentName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <Field
                  type="number"
                  name="price"
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Price"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Field name="isAvailable">
                    {({ field, form }) => (
                    <Switch
                        checked={field.value}
                        onChange={(e) => form.setFieldValue("isAvailable", e.target.checked)}
                        color="primary"
                    />
                    )}
                </Field>
                <label htmlFor="isAvailable" className="text-sm">
                    Available
                </label>
                </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={toggleEdit}
                  className="px-4 py-2 bg-gray-300 rounded shadow hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default DocumentCard;
