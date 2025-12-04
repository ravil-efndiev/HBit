import { Injectable } from "@nestjs/common";
import { ActivityPostRequestBody } from "src/lib/types";

@Injectable()
export class PublicActivitiesService {

  getAllActivities() {
    return [];
  }

  getActivity(id: string) {
    return id;
  }

  postActivity(body: ActivityPostRequestBody) {
    return {  };
  }
}
