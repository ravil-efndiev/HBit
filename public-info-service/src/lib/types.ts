export interface ActivityPostRequestBody {
  userId: string;
  name: string;
  details: string;
  iconPath: string;
  color: string;
  lastEntryTime?: string;
  totalEntries: number;
  lastWeekEntries: number;
}

export interface UserPostRequestBody {
  privateId: string;
  username: string;
  name: string;
}

export interface UserPatchRequestBody {
  privateId: string;
  username?: string;
  name?: string;
  pfpUrl?: string;
}
