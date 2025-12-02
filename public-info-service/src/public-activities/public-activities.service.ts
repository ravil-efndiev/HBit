import { Injectable } from '@nestjs/common';

@Injectable()
export class PublicActivitiesService {
    test = (): string => "service endpoint success";
}
