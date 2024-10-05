import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('teachers')  
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new teacher' })  
  @ApiResponse({ status: 201, description: 'The teacher has been successfully created.' })  
  @ApiResponse({ status: 400, description: 'Invalid input.' })  
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of all teachers' })  
  @ApiResponse({ status: 200, description: 'List of teachers retrieved successfully.' })  
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve details of a single teacher' })  
  @ApiParam({ name: 'id', description: 'Unique identifier of the teacher' })  
  @ApiResponse({ status: 200, description: 'Teacher details retrieved successfully.' }) 
  @ApiResponse({ status: 404, description: 'Teacher not found.' })  
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update teacher details' })  
  @ApiParam({ name: 'id', description: 'Unique identifier of the teacher' })  
  @ApiResponse({ status: 200, description: 'Teacher updated successfully.' })  
  @ApiResponse({ status: 404, description: 'Teacher not found.' })  
  @ApiResponse({ status: 400, description: 'Invalid input.' })  
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a teacher' })  
  @ApiParam({ name: 'id', description: 'Unique identifier of the teacher' })  
  @ApiResponse({ status: 200, description: 'Teacher removed successfully.' })  
  @ApiResponse({ status: 404, description: 'Teacher not found.' }) 
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }
}
