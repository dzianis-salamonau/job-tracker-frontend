import JobTracker from '@/components/JobTracker';

export default function JobsPage() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Job Application Tracker</h2>
      
      <JobTracker />
    </div>
  );
}