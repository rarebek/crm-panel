import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { Group } from 'src/groups/entities/group.entity';
import { FilterStudentsDto } from './dto/filter-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    @InjectRepository(Group)
    private groupRepository: Repository<Group>
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const group =  await this.groupRepository.findOne({where: {id: createStudentDto.group_id}})
    if (!group) {
      throw new Error('Group not found');
    }

    const newStudent = this.studentRepository.create({
      ...createStudentDto,
      groups: [group]
    });
    await this.studentRepository.save(newStudent);

    return newStudent;
  }

  async findAll(filterStudentsDto: FilterStudentsDto) {
    const { name, phone_number, parent_name, parent_phone_number } = filterStudentsDto;

    const queryBuilder = this.studentRepository.createQueryBuilder('student');

    if (name) {
        queryBuilder.andWhere('student.name ILIKE :name', { name: `%${name}%` });
    }
    if (phone_number) {
        queryBuilder.andWhere('student.phone_number = :phone_number', { phone_number });
    }
    if (parent_name) {
        queryBuilder.andWhere('student.parent_name ILIKE :parent_name', { parent_name: `%${parent_name}%` });
    }
    if (parent_phone_number) {
        queryBuilder.andWhere('student.parent_phone_number = :parent_phone_number', { parent_phone_number });
    }

    return queryBuilder.getMany();
}

      
  async findOne(id: string) {
    return this.studentRepository.findOne({where: { id }, relations: ['groups']})
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.studentRepository.update(id, updateStudentDto);
  }

  async remove(id: string) {
    return this.studentRepository.delete(id)
  }

  async getAllStudentsByGroupId(group_id: string) {
    const group = await this.groupRepository.findOne({ where: { id: group_id } });
    if (!group) {
      throw new Error('Group not found');
    }

    return this.studentRepository.find({
      where: {
        groups: { id: group_id },
      },
      relations: ['groups'],
    });
  }

  async removeStudentFromGroup(student_id: string, group_id: string) {
    const student = await this.studentRepository.findOne({
      where: { id: student_id },
      relations: ['groups'],
    });
  
    if (!student) {
      throw new NotFoundException("Student not found");
    }
  
    const group = await this.groupRepository.findOne({
      where: { id: group_id },
    });
  
    if (!group) {
      throw new NotFoundException("Group not found");
    }
  
    student.groups = student.groups.filter(g => g.id !== group.id);
  
    await this.studentRepository.save(student);
    
    return student;
  }
  }
