import {
  Controller,
  Query,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilterStudentsDto } from './dto/filter-student.dto';

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
    try {
      return await this.studentsService.create(createStudentDto);
    } catch (error) {
      this.handleServiceError(error);
    }
  }

  @ApiOperation({ summary: "Retrieve all students" })
  @ApiResponse({ status: 200, description: "Successfully retrieved all students" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  @Get()
  async findAll(@Query() filterStudentsDto: FilterStudentsDto) {
    try {
      return await this.studentsService.findAll(filterStudentsDto);
    } catch (error) {
      this.handleServiceError(error);
    }
  }

  @ApiOperation({ summary: "Retrieve a student by ID" })
  @ApiResponse({ status: 200, description: "Successfully retrieved the student" })
  @ApiResponse({ status: 404, description: "Student not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.studentsService.findOne(id);
    } catch (error) {
      this.handleServiceError(error);
    }
  }

  @ApiOperation({ summary: "Update a student by ID" })
  @ApiResponse({ status: 200, description: "Successfully updated the student" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 404, description: "Student not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    try {
      return await this.studentsService.update(id, updateStudentDto);
    } catch (error) {
      this.handleServiceError(error);
    }
  }

  @ApiOperation({ summary: "Delete a student by ID" })
  @ApiResponse({ status: 200, description: "Successfully deleted the student" })
  @ApiResponse({ status: 404, description: "Student not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.studentsService.remove(id);
    } catch (error) {
      this.handleServiceError(error);
    }
  }

  @ApiOperation({ summary: "Get All Students by group ID" })
  @Get('/group/:group_id')
  async getAllStudentsByGroupId(@Param('group_id') group_id: string) {
    try {
      return await this.studentsService.getAllStudentsByGroupId(group_id);
    } catch (error) {
      this.handleServiceError(error);
    }
  }

  @ApiOperation({ summary: "Remove a student from a group" })
  @ApiResponse({ status: 200, description: "Successfully removed the student from the group" })
  @ApiResponse({ status: 404, description: "Group not found" })
  @ApiResponse({ status: 404, description: "Student not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  @Delete(':student_id/group/:group_id')
  async removeStudentFromGroup(
    @Param('student_id') student_id: string,
    @Param('group_id') group_id: string
  ) {
    try {
      return await this.studentsService.removeStudentFromGroup(student_id, group_id);
    } catch (error) {
      this.handleServiceError(error);
    }
  }

  private handleServiceError(error: any) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    } else if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message);
    } else {
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
