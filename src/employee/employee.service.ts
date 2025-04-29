import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {

  constructor(
    @InjectRepository(Employee) //injects repository of Employee
    private readonly employeeRepository: Repository<Employee>,
  ){}

  //create employee
  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const {email,contactNumber} = createEmployeeDto;

    const existingEmployee = await this.employeeRepository.findOne({
      where:[
        {email},
        {contactNumber}
      ]
    })

    console.log(existingEmployee)

    if(existingEmployee){
      throw new BadRequestException("employe already exists with email or contactNumber ")
    }

    const newEmployee = await this.employeeRepository.create(createEmployeeDto);

    if(!newEmployee){
      throw new InternalServerErrorException("failed to create employee")
    }

    return this.employeeRepository.save(newEmployee);
  }

  async findAll(): Promise<Employee[]>  {
    const employees = await this.employeeRepository.find();
    
    if(!employees){
      throw new InternalServerErrorException('failed to fetch employees')
    }

    return employees;
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where:{employeeId : id}
    })

    if(!employee){
      throw new InternalServerErrorException('failed to fetch employee')
    }

    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const existingEmployee = await this.employeeRepository.findOne({
      where:{employeeId : id}
    });
    
    if(!existingEmployee){
      throw new BadRequestException("employee does not exists with this id");
    }

    const updatedEmployee = await this.employeeRepository.merge(existingEmployee,updateEmployeeDto)

    return await this.employeeRepository.save(updatedEmployee);
  }

  async remove(id: number):Promise<Employee> {
    const employee = await this.employeeRepository.findOne({ 
      where:{employeeId:id}
    });

    if(!employee){
      throw new BadRequestException("employee does not exists with this id");
    }

    return await this.employeeRepository.remove(employee)
  }
}
