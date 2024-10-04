import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const newGroup = this.groupRepository.create(createGroupDto);
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
