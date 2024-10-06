import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository, Between } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Student } from 'src/students/entities/student.entity';
import { GraphInspector } from '@nestjs/core';
import { Group } from 'src/groups/entities/group.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}


  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { studentId, groupId, teacherId, ...paymentData } = createPaymentDto;

    const student = await this.studentRepository.findOne({ where: { id: studentId } });
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const group = await this.groupRepository.findOne({ where: { id: groupId } });
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    const teacher = await this.teacherRepository.findOne({ where: { id: teacherId } });
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    const newPayment = this.paymentRepository.create({
      ...paymentData,
      student,
      group,
      teacher,
    });
    return this.paymentRepository.save(newPayment);
  }

  async findOne(id: string): Promise<Payment> {
    return this.paymentRepository.findOne({ where: { id }, relations: ['student', 'group', 'teacher']});
  }

  async getPaymentsByMonth(year: number, month: number): Promise<Payment[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    return this.paymentRepository.find({
      where: {
        paymentDate: Between(startDate, endDate), 
      },
      relations: ['student', 'group', 'teacher'], 
    });
  }

  async getPaidStudentsByMonth(year: number, month: number): Promise<Student[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const payments = await this.paymentRepository.find({
      where: {
        paymentDate: Between(startDate, endDate),
      },
      relations: ['student'],
    });

    return payments.map(payment => payment.student);
  }

  async getUnpaidStudentsByMonth(year: number, month: number): Promise<Student[]> {
    const allStudents = await this.studentRepository.find();
    const paidStudents = await this.getPaidStudentsByMonth(year, month);
    const paidStudentIds = paidStudents.map(student => student.id);

    return allStudents.filter(student => !paidStudentIds.includes(student.id));
  }

}