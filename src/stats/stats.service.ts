import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../students/entities/student.entity';
import { Group } from '../groups/entities/group.entity';
import { Teacher } from '../teachers/entities/teacher.entity';
import { Repository, Between, MoreThanOrEqual, LessThan } from 'typeorm';
import { Payment } from 'src/payment/entities/payment.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>
  ) {}

  async getTotalStudents(year: number, month: number): Promise<number> {
    const startDate = new Date(year, month - 1, 1); 
    const endDate = new Date(year, month, 0); 
    return this.studentRepository.count({ 
      where: {
        createdAt: LessThan(endDate) 
      } 
    });
  }

  async getStudentsLeftCount(year: number, month: number): Promise<number> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    return this.studentRepository.count({
      where: {
        leftAt: Between(startDate, endDate),
      },
    });
  }

  async getTotalGroups(year: number, month: number): Promise<number> {
    const endDate = new Date(year, month, 0); 
    return this.groupRepository.count({ 
      where: {
        createdAt: LessThan(endDate) 
      }
    });
  }

  async getTotalTeachers(year: number, month: number): Promise<number> {
    const endDate = new Date(year, month, 0); 
    return this.teacherRepository.count({ 
      where: {
        createdAt: LessThan(endDate) 
      }
    });
  }
}