import {StatusEnum} from "./status-enum";

export type ITaskType = {
  title: string;
  status: StatusEnum;
  startDate: Date;
  endDate: Date;
  id?: number;
  description?: string;
  taskCategory?: ITaskCategory;
  assignee?: ITaskAssignTo

}


export type ITaskAssignTo = {
  name: string;
  email: string;
  role: 'ADMIN' | 'USER'
  userId?: string
}

export type ITaskCategory = {
  categoryId: string;
  name: string;
  description: string;
}
