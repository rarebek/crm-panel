import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { flatMap } from 'rxjs';

@ApiTags("students")
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiOperation({ summary: "Create a student" })
  @ApiResponse({ status: 201, description: "Student has been successfully created" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @ApiOperation({ summary: "Retrieve all students" })
  @ApiResponse({ status: 200, description: "Successfully retrieved all students" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  @Get()
  async findAll() {
    return this.studentsService.findAll();
  }

  @ApiOperation({ summary: "Retrieve a student by ID" })
  @ApiResponse({ status: 200, description: "Successfully retrieved the student" })
  @ApiResponse({ status: 404, description: "Student not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @ApiOperation({ summary: "Update a student by ID" })
  @ApiResponse({ status: 200, description: "Successfully updated the student" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 404, description: "Student not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @ApiOperation({ summary: "Delete a student by ID" })
  @ApiResponse({ status: 200, description: "Successfully deleted the student" })
  @ApiResponse({ status: 404, description: "Student not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
