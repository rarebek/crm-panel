import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Group } from '../groups/entities/group.entity';
import { UpdateAttendanceDto } from './dto/update-lesson.dto';
import { Attendance } from './entities/attendance.entity';
import { Student } from 'src/students/entities/student.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>, 
  ) {}

  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    console.log('Incoming createLessonDto:', createLessonDto);

    const group = await this.groupRepository.findOne({ 
      where: { id: createLessonDto.groupId },
      relations: ['students'],
    });
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    const startTime = new Date(createLessonDto.startTime);

    const lesson = this.lessonRepository.create({
      group,
      startTime,
    });

    const savedLesson = await this.lessonRepository.save(lesson); 

    const attendances = group.students.map(student => 
      this.attendanceRepository.create({ 
        lesson: savedLesson, 
        student, 
        isPresent: false 
      })
    );

    console.log('Saved Lesson object:', savedLesson);
    console.log('Attendances before save:', attendances);

    await this.attendanceRepository.save(attendances);

    return savedLesson; 
  }


  async findOne(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ where: { id }, relations: ['attendances'] });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return lesson;
  }

  async endLesson(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ where: { id } });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    lesson.endTime = new Date(); 
    return this.lessonRepository.save(lesson);
  }


  async updateAttendance(lessonId: string, updateAttendanceDto: UpdateAttendanceDto): Promise<Attendance> {
    const lesson = await this.lessonRepository.findOne({ where: { id: lessonId } });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    const student = await this.studentRepository.findOne({ where: { id: updateAttendanceDto.studentId } });
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    let attendance = await this.attendanceRepository.findOne({ 
      where: { lesson: { id: lessonId }, student: { id: updateAttendanceDto.studentId } },
    });

    if (!attendance) {
      attendance = this.attendanceRepository.create({ lesson, student });
    }

    attendance.isPresent = updateAttendanceDto.isPresent;
    return this.attendanceRepository.save(attendance); 
  }

}