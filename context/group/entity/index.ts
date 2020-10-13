import { User } from "@/userCtx";

export interface Group {
  id: string;
  timerId: string;
  members: Array<User | null>;
}
