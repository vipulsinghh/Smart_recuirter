import React from 'react';

interface CareerPredictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentData: any; // Allow any for now, ideally type this properly
}

const CareerPredictionModal: React.FC<CareerPredictionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Career Path Prediction</h2>
        <div>
          <p><strong>Name:</strong> {studentData?.name}</p>
          <p><strong>Skills:</strong> {studentData?.skills}</p>
          {/* Add placeholders for other data */}
          <p><strong>10th Marks:</strong> {studentData?.tenthMarks || 'Not provided'}</p>
          <p><strong>12th Marks:</strong> {studentData?.twelfthMarks || 'Not provided'}</p>
          <p><strong>CGPA:</strong> {studentData?.cgpa || 'Not provided'}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CareerPredictionModal;