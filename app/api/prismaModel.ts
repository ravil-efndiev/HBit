export interface PrismaModel {
  create: (args: any) => Promise<any>;
  findMany: (args: any) => Promise<any[]>;
  findUnique: (args: any) => Promise<any>;
  update: (args: any) => Promise<any>;
  delete: (args: any) => Promise<any>;
}
