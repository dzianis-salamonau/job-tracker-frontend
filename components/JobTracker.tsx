"use client";

require('dotenv').config(); 

import React, { useState, useEffect } from 'react';
import { Job } from './types';
import JobForm from './JobForm';
import JobList from './JobList';

const FORM_FIELDS = [
  {
    name: 'company',
    label: 'Company',
    type: 'text',
    required: true,
  },
  {
    name: 'position',
    label: 'Position',
    type: 'text',
    required: true,
  },
  {
    name: 'salaryRange',
    label: 'Salary Range',
    type: 'select',
    options: ['0-25K', '25K-50K', '50K-75K', '75K-100K', '100K-150K', '150K+'],
    required: true,
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: ['Applied', 'Interview', 'Offer', 'Rejected'],
    required: true,
  },
  {
    name: 'notes',
    label: 'Notes',
    type: 'textarea',
    required: true,
  },
];

const JobTracker: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState<Partial<Job>>({
    company: '',
    position: '',
    salaryRange: '0-25K',
    status: 'Applied',
    notes: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`);
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentJob.company || !currentJob.position) {
      alert('Company and Position are required');
      return;
    }

    try {
      const url = isEditing
        ? `${process.env.NEXT_PUBLIC_API_URL}/jobs/${currentJob._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/jobs`;
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentJob),
      });

      if (response.ok) {
        fetchJobs();
        setIsModalOpen(false);
        setCurrentJob({
          company: '',
          position: '',
          salaryRange: '0-25K',
          status: 'Applied',
          notes: '',
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Failed to submit job:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchJobs();
      }
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  const openEditModal = (job: Job) => {
    setCurrentJob(job);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setCurrentJob({
      company: '',
      position: '',
      salaryRange: '0-25K',
      status: 'Applied',
      notes: '',
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  return (
    <div>
      <button
        onClick={openAddModal}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition"
      >
        Add New Job
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">
              {isEditing ? 'Edit Job' : 'Add New Job'}
            </h3>
            <JobForm
              isEditing={isEditing}
              currentJob={currentJob}
              FORM_FIELDS={FORM_FIELDS}
              handleSubmit={handleSubmit}
              setCurrentJob={setCurrentJob}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>
      )}

      <JobList jobs={jobs} handleDelete={handleDelete} openEditModal={openEditModal} />
    </div>
  );
};

export default JobTracker;
