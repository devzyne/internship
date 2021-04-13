export const UserType = {
  miniqAdmin: 1,
  customerAdmin: 2,
  customerManager: 4,
  partnerAdmin: 8,
  partnerContingentWorker: 16,
  freelancer: 32,
};

export const Category = {
  Finance: { name: "Finance", value: 1 },
  It: { name: "Information Technology", value: 2 },
  HR: { name: "HR", value: 3 },
};

export const jobLevel = {
  //todo rename to SkillLevel
  "Entry Level (0 - 2 yrs)": 1, //remove
  "Junior Level (2 - 4 yrs)": 2,
  "Mid Level (4 - 6 yrs)": 3,
  "Senior Level (6 - 8 yrs)": 4,
  "Expert Level (8+ yrs)": 5,
};

export const SkillLevel = {
  Entry: { disp: "Entry Level (0 - 2 yrs)", value: 1 },
  Junior: { disp: "Junior Level (2 - 4 yrs)", value: 2 },
  Mid: { disp: "Mid Level (4 - 6 yrs)", value: 3 },
  Senior: { disp: "Senior Level (6 - 8 yrs)", value: 4 },
  Expert: { disp: "Expert Level (8+ yrs)", value: 5 },
};

export const GigWorkerStatus = {
  //SignedUp: { sts: 1, name: "Signed-up" },
  Active: { sts: 6, name: "Active" },
  OnJob: { sts: 11, name: "On Job" },
  Inactive: { sts: 16, name: "Inactive" },
};

export const GigWorkerJobStatusForFilter = {
  //todo write code to derive this from GigWorkerJobStatus
  Applied: {
    name: "Applied",
    sts: 21,
  },
  SentRequest: {
    name: "Job Request Sent",
    sts: [31, 51],
  },
  AcceptedRequest: {
    name: "Job Request Accepted",
    sts: 41,
  },
  PARejectedRequest: {
    name: "Job Request Rejected",
    sts: 61,
  },
  NotHired: {
    name: "Not Hired",
    sts: 71,
  },
  Offered: {
    name: "Job Offered",
    sts: [81, 101],
  },
  AcceptedOffer: {
    name: "Offer Accepted",
    sts: 91,
  },
  PARejectedOffer: {
    name: "Offer Rejected",
    sts: 111,
  },
  Ongoing: {
    name: "Ongoing",
    sts: 121,
  },
  JobCompleted: {
    name: "Job Completed",
    sts: 131,
  },
};

export const JobStatusDisplay = [
  { name: "Draft", sts: 1 },
  { name: "Created", sts: 2 },
  { name: "Posted", sts: 3 },
  { name: "Hiring", sts: 4 },
  { name: "Hiring Closed", sts: 5 },
  { name: "CLosed", sts: 6 },
];

export const GigWorkerJobStatus = {
  Applied: {
    name: "Applied",
    sts: 21,
    pa: "Applied",
  },
  SentRequest: {
    name: "Job Request Sent",
    sts: 31,
    pa: "Request Received",
  },
  AcceptedRequest: {
    name: "Job Request Accepted",
    sts: 41,
    pa: "Request Accepted",
  },
  CWRejectedRequest: {
    name: "Job Request Sent",
    sts: 51,
    pa: "Request Rejected by Contingent Worker",
  },
  PARejectedRequest: {
    name: "Job Request Rejected",
    sts: 61,
    pa: "Request Rejected",
  },
  NotHired: {
    name: "Not Hired",
    sts: 71,
    pa: "Not Hired",
  },
  Offered: {
    name: "Job Offered",
    sts: 81,
    pa: "Offer received",
  },
  AcceptedOffer: {
    name: "Offer Accepted",
    sts: 91,
    pa: "Offer Accepted",
  },
  CWRejectedOffer: {
    name: "Job Offered",
    sts: 101,
    pa: "Offer Rejected by Contingent Worker",
  },
  PARejectedOffer: {
    name: "Offer Rejected",
    sts: 111,
    pa: "Offer Rejected",
  },
  Ongoing: {
    name: "Ongoing",
    sts: 121,
    pa: "Ongoing",
  },
  JobCompleted: {
    name: "Job Completed",
    sts: 131,
    pa: "Completed",
  },
  Cancelled: {
    name: "Cancelled",
    sts: 141,
    pa: "Cancelled",
  },
};

export const JobStatus = {
  Draft: { name: "Draft", sts: 1 },
  Created: { name: "Created", sts: 2 },
  Posted: { name: "Posted", sts: 3 },
  Hiring: { name: "Hiring", sts: 4 },
  HiringClosed: { name: "Hiring Closed", sts: 5 },
  Closed: { name: "Closed", sts: 6 },
};

export const companyType = {
  Partner: 2,
  Customer: 3,
};
export const inputFieldsLength = {
  EmailAddressMaxLength: 64,
  PersonNameMaxLength: 64,
  PersonNameMinLength: 3,
  CostCenterMinLength: 3,
  CostCenterMaxLength: 32,
  InternalOrderMaxLength: 32,
  InternalOrderMinLength: 3,
  ReferenceNumberMinLength: 3,
  ReferenceNumberMaxLength: 32,
  JobNameMinLength: 3,
  JobNameMaxLength: 32,
  DepartmentMaxLength: 32,
  DepartmentMinLength: 2,
  ReviewMinLength: 100,
  ReviewMaxLength: 30000,
  PasswordMaxLength: 32,
  PasswordMinLength: 8,
  JobOpeningsMin: 1,
  JobOpeningsMax: 50,
  JobSynopsisMinLength: 10,
  JobSynopsisMaxLength: 6000,
};

export const socialMediaTypes = {
  LinkedIn: 1,
  StackOverFlow: 2,
  Medium: 3,
  Github: 4,
  Slack: 5,
  Others: 50,
};

export const pageSize = 5;
