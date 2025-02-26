import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { CreateNotificationSentDto } from './dto/CreateNotification.dto';
import { UpdateNotificationSentDto } from './dto/UpdateNotification.dto';
import { NotificationSent } from 'src/schemas/NotificationSent.schema';


@Injectable()
export class NotificationService {
  constructor(@InjectModel(NotificationSent.name) private notificationModel: Model<Notification>) {}

  // Tạo mới notification
  async create(createNotificationDto: CreateNotificationSentDto): Promise<Notification> {
    const createdNotification = new this.notificationModel(createNotificationDto);
    return createdNotification.save();
  }

  // Lấy danh sách tất cả notification
  async getNotifications() {
    return this.notificationModel.find();
  }

  // Lấy notification theo ID
  async getNotificationById(id:Types.ObjectId | string) {
    return this.notificationModel.findById(id);
  }

  // Cập nhật notification
  async updateNotification(id: string, updateNotificationDto: UpdateNotificationSentDto) {
    return this.notificationModel.findByIdAndUpdate(id, updateNotificationDto, { new: true });
  }

  // Xóa notification
  async deleteNotification(id: string) {
    return this.notificationModel.findByIdAndDelete(id);
  }
}
