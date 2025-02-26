import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model ,Types} from 'mongoose';
import { Designation } from '../schemas/Designation.schema';
import { CreateDesignationDto } from './dto/CreateDesignation.dto';
import { UpdateDesignationDto } from './dto/UpdateDesignation.dto';

@Injectable()
export class DesignationService {
  constructor(@InjectModel(Designation.name) private designationModel: Model<Designation>) {}

  // Tạo mới Designation
  async create(createDesignationDto: CreateDesignationDto): Promise<Designation> {
    const newDesignation = new this.designationModel(createDesignationDto);
    return newDesignation.save();
  }

  // Lấy danh sách tất cả Designation
  async getDesignation() {
    return this.designationModel.find();
  }

  // Lấy một Designation theo ID
  async getDesignationById(id:Types.ObjectId| string) {
    return this.designationModel.findById(id);
  }

  // Cập nhật Designation
  async updateDesignation(id: string, updateDesignationDto: UpdateDesignationDto) {
    return this.designationModel.findByIdAndUpdate(id, updateDesignationDto, { new: true });
  }

  // Xóa Designation
  async deleteDesignation(id: string) {
    return this.designationModel.findByIdAndDelete(id);
  }
}
