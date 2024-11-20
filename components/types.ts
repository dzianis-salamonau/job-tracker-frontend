export interface Job {
    _id: string;
    company: string;
    position: string;
    salaryRange: '0-25K' | '25K-50K' | '50K-75K' | '75K-100K' | '100K-150K' | '150K+';
    status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
    notes: string;
  }
  