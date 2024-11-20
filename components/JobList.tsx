import React from 'react';
import { Job } from './types';

interface JobListProps {
  jobs: Job[];
  handleDelete: (id: string) => void;
  openEditModal: (job: Job) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, handleDelete, openEditModal }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Offer':
        return 'text-green-600';
      case 'Rejected':
        return 'text-red-600';
      case 'Interview':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Company</th>
            <th className="border p-2">Position</th>
            <th className="border p-2">Salary Range</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id} className="hover:bg-gray-50">
              <td className="border p-2">{job.company}</td>
              <td className="border p-2">{job.position}</td>
              <td className="border p-2">{job.salaryRange}</td>
              <td className={`border p-2 ${getStatusColor(job.status)}`}>
                {job.status}
              </td>
              <td className="border p-2">
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(job)}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;
