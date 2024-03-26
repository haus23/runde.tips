export type Toast = {
  type: 'success' | 'info' | 'error';
  text: string;
};

export type TaskToast = {
  taskId: number;
  mode: 'resolve' | 'update';
  text: string;
  description?: string;
};
