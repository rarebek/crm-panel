import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/teachers/entities/teacher.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,

    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const teacher = await this.teacherRepository.findOne({ where: { id: createGroupDto.teacherId } });
    if (!teacher) {
      throw new Error('Teacher not found');
    }
  
    const newGroup = this.groupRepository.create({
      ...createGroupDto,
      teacher,
    });
  
    await this.groupRepository.save(newGroup);
  
    return newGroup;
  }
  

  async findAll() {
    return this.groupRepository.find();
  }

  async findOne(id: string) {
    return this.groupRepository.findOne({where: {id}})
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    await this.groupRepository.update(id, updateGroupDto);
    return this.groupRepository.findOne({where: {id}});
  }

  async remove(id: string) {
    return this.groupRepository.delete(id);
  }
}
