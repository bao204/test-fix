import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class ProjectPermissions extends Document {
  @Prop({ required: true, trim: true })
  resourceName: string;

  @Prop({ trim: true })
  can_read?: boolean;

  @Prop({ trim: true })
  can_write?: boolean;

  @Prop({ default: false })
  can_create?: boolean;

  @Prop({ default: false })
  can_delete?: boolean;

  @Prop({ default: false })
  can_import?: boolean;

  @Prop({ default: false })
  can_export?: boolean;

}

export const ProjectPermissionsSchema = SchemaFactory.createForClass(ProjectPermissions);
