import { 
    Controller, Post, Body, Get, Param, Patch, Delete, 
    UsePipes, ValidationPipe, UseInterceptors, UploadedFile 
  } from '@nestjs/common';
  import { ReportService } from './reports.service';
  import { CreateReportDto } from './dto/CreateReport.dto';
  import { UpdateReportDto } from './dto/UpdateReport.dto';
  import { diskStorage } from 'multer';
  import { v4 as uuidv4 } from 'uuid';
  import { FileInterceptor } from '@nestjs/platform-express';
  import * as path from 'path';
  
  @Controller('reports')
  export class ReportController {
    constructor(private readonly reportService: ReportService) {}
  
    // ✅ Tạo mới Report với file docx
    @Post()
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('filerepport', {
      storage: diskStorage({
        destination: './uploads/reports', // Đường dẫn lưu file report
        filename: (req, file, cb) => {
          const fileExt = path.extname(file.originalname); // Lấy đuôi file
          if (fileExt !== '.docx') {
            return cb(new Error('Chỉ cho phép tải lên file .docx'), '');
          }
          const filename = `${uuidv4()}${fileExt}`; // Đặt tên file là uuid
          cb(null, filename);
        }
      })
    }))
    async createReport(
      @Body() createReportDto: CreateReportDto,
      @UploadedFile() file: Express.Multer.File 
    ) {
      if (file) {
        createReportDto.filerepport = `/uploads/reports/${file.filename}`; // Gán đường dẫn file
      }
      const newReport = await this.reportService.createReport(createReportDto);
      return { success: true, data: newReport };
    }
  
    // ✅ Lấy danh sách tất cả Report
    @Get()
    async getAllReports() {
      return this.reportService.getAllReports();
    }
  
    // ✅ Lấy Report theo ID
    @Get(':id')
    async getReportById(@Param('id') id: string) {
      return this.reportService.getReportById(id);
    }
  
    // ✅ Cập nhật Report (cho phép cập nhật file docx)
    @Patch(':id')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('filerepport', {
      storage: diskStorage({
        destination: './uploads/reports', // Đường dẫn lưu file report
        filename: (req, file, cb) => {
          const fileExt = path.extname(file.originalname);
          if (fileExt !== '.docx') {
            return cb(new Error('Chỉ cho phép tải lên file .docx'), '');
          }
          const filename = `${uuidv4()}${fileExt}`;
          cb(null, filename);
        }
      })
    }))
    async updateReport(
      @Param('id') id: string, 
      @Body() updateReportDto: UpdateReportDto, 
      @UploadedFile() file: Express.Multer.File
    ) {
      if (file) {
        updateReportDto.filerepport = `/uploads/reports/${file.filename}`;
      }
      return this.reportService.updateReport(id, updateReportDto);
    }
  
    // ✅ Xóa Report
    @Delete(':id')
    async deleteReport(@Param('id') id: string) {
      return this.reportService.deleteReport(id);
    }
  }
  