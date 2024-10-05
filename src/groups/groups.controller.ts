import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@ApiTags('groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new group' })
  @ApiResponse({ status: 201, description: 'The group has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all groups' })
  @ApiResponse({ status: 200, description: 'List of groups.' })
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a group by ID' })
  @ApiResponse({ status: 200, description: 'The found group.' })
  @ApiResponse({ status: 404, description: 'Group not found.' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the group to retrieve.' })
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a group by ID' })
  @ApiResponse({ status: 200, description: 'The group has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Group not found.' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the group to update.' })
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(id, updateGroupDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a group by ID' })
  @ApiResponse({ status: 200, description: 'The group has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Group not found.' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the group to delete.' })
  remove(@Param('id') id: string) {
    return this.groupsService.remove(id);
  }
}
