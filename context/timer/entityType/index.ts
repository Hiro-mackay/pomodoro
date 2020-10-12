export interface Timer {
  id: string;
  timerTitle: string;
  isWorking: boolean;
  createdBy: Date;
  startedDate: Date;
  totalMilliSeconds: number;
  ownerId: string;
  currentTaskId: string;
  timerType: "personal" | "group";
}
