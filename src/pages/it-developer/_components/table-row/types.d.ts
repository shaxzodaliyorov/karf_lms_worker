export interface Worker {
  id: number;
  name: string;
  career: string;
  major: string;
  age: number;
  school: string;
  nationality: string;
  cv: boolean;
  interviewVideo: boolean;
  skillVideo: boolean;
}

export interface WorkerTableRowProps {
  worker: Worker;
}
