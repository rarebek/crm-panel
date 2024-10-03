import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const newTeacher = this.teacherRepository.create(createTeacherDto);
    await this.teacherRepository.save(newTeacher);
    return newTeacher;
  }

  async findAll(): Promise<Teacher[]> {
    return this.teacherRepository.find();
  }
  async findOne(id: string): Promise<Teacher> {
    return this.teacherRepository.findOne({ where: { id } });
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto): Promise<Teacher> {
    await this.teacherRepository.update(id, updateTeacherDto);
    return this.teacherRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.teacherRepository.delete(id);
  }
}
