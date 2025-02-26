import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationController } from 'src/notifications/notifications.controller';
import { NotificationService } from 'src/notifications/notifications.service';
import { NotificationSent, NotificationSentSchema } from 'src/schemas/NotificationSent.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: NotificationSent.name, schema: NotificationSentSchema
      }
    ])
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
