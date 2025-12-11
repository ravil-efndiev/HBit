export interface ActivityPostRequestBody {
  name: string;
  details: string;
  iconPath: string;
  color: string;
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
