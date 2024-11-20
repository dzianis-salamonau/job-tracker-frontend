import React from 'react';
import { Job } from './types';

interface JobFormProps {
  isEditing: boolean;
  currentJob: Partial<Job>;
  handleSubmit: (e: React.FormEvent) => void;
  setCurrentJob: React.Dispatch<React.SetStateAction<Partial<Job>>>;
  FORM_FIELDS: {
    name: string;
    label: string;
    type: string;
    options?: string[];
    required: boolean;
  }[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const JobForm: React.FC<JobFormProps> = ({
  isEditing,
  currentJob,
  handleSubmit,
  setCurrentJob,
  FORM_FIELDS,
  setIsModalOpen
}) => {
  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {FORM_FIELDS.map((field) => (
        <div key={field.name}>
          <label className="block mb-2">{field.label}</label>
          {field.type === 'select' ? (
            <select
              value={currentJob[field.name as keyof Partial<Job>] || ''}
              onChange={(e) => setCurrentJob({ ...currentJob, [field.name]: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required={field.required}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : field.type === 'textarea' ? (
            <textarea
              value={currentJob[field.name as keyof Partial<Job>] || ''}
              onChange={(e) => setCurrentJob({ ...currentJob, [field.name]: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required={field.required}
            />
          ) : (
            <input
              type={field.type}
              value={currentJob[field.name as keyof Partial<Job>] || ''}
              onChange={(e) => setCurrentJob({ ...currentJob, [field.name]: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required={field.required}
            />
          )}
        </div>
      ))}
      <div className='flex space-x-4'>
        <button type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
            {isEditing ? 'Update Job' : 'Add Job'}
        </button>
        <button 
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
        >
            Cancel
        </button>
      </div>
    </form>
  );
};

export default JobForm;
