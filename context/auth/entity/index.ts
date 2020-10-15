import { User } from "@/userCtx";

export interface UserCredential {
  status: "in" | "out";
  user: User | null;
  token: string | null;
}
