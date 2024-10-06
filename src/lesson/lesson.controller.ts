import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
import { LessonsService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UpdateAttendanceDto } from './dto/update-lesson.dto';

@ApiTags('lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new lesson and initialize attendance records' })
  @ApiResponse({ status: 201, description: 'Lesson created successfully.' })
  async create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a lesson with attendance records' })
  @ApiParam({ name: 'id', description: 'The ID of the lesson' })
  async findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }

  @Patch(':id/end') 
  @ApiOperation({ summary: 'End a lesson (set endTime)' })
  @ApiParam({ name: 'id', description: 'The ID of the lesson' })
  async endLesson(@Param('id') id: string) {
    return this.lessonsService.endLesson(id);
  }

  @Patch(':lessonId/attendance')
  @ApiOperation({ summary: 'Update attendance for a student in a lesson' })
  @ApiParam({ name: 'lessonId', description: 'The ID of the lesson' })
  async updateAttendance(
    @Param('lessonId') lessonId: string, 
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return this.lessonsService.updateAttendance(lessonId, updateAttendanceDto);
  }
}