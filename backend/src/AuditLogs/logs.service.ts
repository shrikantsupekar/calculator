import { HttpException, Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import LogModel from './models/log.model';

@Injectable()
export class LogsService {
  create(createLogDto: CreateLogDto, userId: string) {
    try {
      if (!userId) {
        userId = 'defaultUserId';
      }
      return LogModel.create({ ...createLogDto, userId });
    } catch (err) {
      throw new HttpException('Something went wrong', 500);
    }
  }

  async findAll(params: { userId: string; page: number; limit: number }) {
    try {
      const query: { userId?: string } = {};
      const skip = ((params.page || 1) - 1) * (params.limit || 20);
      if (params.userId) {
        query.userId = params.userId;
      }
      const [total, data] = await Promise.all<any>([
        LogModel.countDocuments(query) as any,

        LogModel.find(query)
          .sort({ userId: 1, id: 1 })
          .skip(skip)
          .limit(params.limit) as any,
      ]);
      return {
        success: true,
        data,
        pagination: {
          total,
          page: params.page,
          limit: params.limit,
          totalPages: Math.ceil(total / params.limit),
          hasNextPage: params.page < total / params.limit,
          hasPrevPage: params.page > 1,
        },
      };
    } catch (err) {
      throw new HttpException('Cannot fetch logs', 500);
    }
  }
}
