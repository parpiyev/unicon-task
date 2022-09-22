export interface Task {
  id: number;
  title: string;
  discription: string;
  recipients: number[];
  createdBy: number;
  isDeleted: boolean;
}
