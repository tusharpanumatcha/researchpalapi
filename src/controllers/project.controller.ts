import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ProjectService } from '../services/project.service';
import { Project } from '../schema/project.schema'; 

import { Api } from '../util/api';

@Controller('api/project') // Adjust the route as needed
export class ProjectController {
  projectModel: any;
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getAllProjects(@Res() response: Response) {
    try {
      const projects: Project[] = await this.projectService.getAllProjects();
      return Api.ok(response, projects);
    } catch (error) {
      return Api.serverError(response, error);
      // return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      //   message: 'Error retrieving projects',
      //   error: error.message,
      // });
    }
  }

  @Get(':projectId')
  async getProjectByProjectId(
    @Res() response: Response,
    @Param('projectId') projectId: string,
  ) {
    try {
      const project: Project | null =
      await this.projectService.findProjectByProjectId(projectId);
      return Api.ok(response, project)
      // return response.status(HttpStatus.OK).json({
      //   message: 'Project retrieved successfully',
      //   data: project,
      // });
    } catch (error) {
      return Api.notFound(response);
      // return response.status(HttpStatus.NOT_FOUND).json({
      //   message: 'Error retrieving project by projectId',
      //   error: error.message,
      // });
    }
  }

  @Delete(':projectId')
  async deleteProjectByProjectId(
    @Res() response: Response,
    @Param('projectId') projectId: string,
  ) {
    try {
      await this.projectService.deleteProjectByProjectId(projectId);

      return response.status(HttpStatus.NO_CONTENT).send(); // 204 No Content for successful deletion
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: 'Error deleting project by projectId',
        error: error.message,
      });
    }
  }

  @Post()
  async createProject(
    @Res() response: Response,
    @Body() createProjectDto: any, // Use your DTO for creating projects
  ) {
    try {
      const newProject: Project = await this.projectService.createProject(createProjectDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Project created successfully',
        data: newProject,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error creating project',
        error: error.message,
      });
    }
  }
}
