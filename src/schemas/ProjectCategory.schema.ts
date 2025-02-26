import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ProjectCategory extends Document {
  @Prop({ required: true, trim: true })
  projectCategoryName: string;  
 };

export const ProjectCategorySchema = SchemaFactory.createForClass(ProjectCategory);
