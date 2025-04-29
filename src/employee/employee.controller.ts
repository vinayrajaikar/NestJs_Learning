import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeService.create(createEmployeeDto);
    console.log(employee)
    return {
      success:"true",
      employee,
      message: "employee created successfully"
    }
  }

  @Get()
  async findAll() {
    const employees = await this.employeeService.findAll();
    return {
      success:"true",
      employees,
      message: "employees fetched successfully"
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const employee = await this.employeeService.findOne(+id);
    return {
      success:"true",
      employee,
      message: "employee fetched successfully"
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    const updatedEmployee = await this.employeeService.update(+id, updateEmployeeDto);
    return {
      success:"true",
      updatedEmployee,
      message: "employee updated successfully"
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const employee = await this.employeeService.remove(+id);
    return {
      success:"true",
      message: "employee deleted successfully",
      employee
    }
  }
}
