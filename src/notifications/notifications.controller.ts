import { Controller, Get, Post, Body, Param, Delete, HttpException, UsePipes, ValidationPipe, Patch } from '@nestjs/common';
import { NotificationService } from './notifications.service';
import mongoose from 'mongoose';
import { CreateNotificationSentDto } from './dto/CreateNotification.dto';
import { UpdateNotificationSentDto } from './dto/UpdateNotification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationSentDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  async getNotifications() {
    return this.notificationService.getNotifications();
  }

  @Get(':id')
  async getNotificationById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Notification not found', 404);
    const findNotification = await this.notificationService.getNotificationById(id);
    if (!findNotification) throw new HttpException('Notification not found', 404);
    return findNotification;
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateNotification(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationSentDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);
    const updateNotification = await this.notificationService.updateNotification(id, updateNotificationDto);
    if (!updateNotification) throw new HttpException('Notification not found', 404);
    return updateNotification;
  }

  @Delete(':id')
  async deleteNotification(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);
    const deleteNotification = await this.notificationService.deleteNotification(id);
    if (!deleteNotification) throw new HttpException('Notification not found', 404);
    return deleteNotification;
  }
}
