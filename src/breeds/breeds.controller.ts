 import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
 import { BreedsService } from './breeds.service';
 import { CreateBreedDto } from './dto/create-breed.dto';
 import { UpdateBreedDto } from './dto/update-breed.dto';

 @Controller('breeds')
 export class BreedsController {
    constructor(private readonly breedsService: BreedsService) {}

     @Post()
     async create(@Body() createBreedDto: CreateBreedDto) {
         return await this.breedsService.create(createBreedDto);
     } 

     @Get()
     async findAll() {
         return await this.breedsService.findAll();
     }

     @Get(':id')
     async findOne(@Param('id') id: number) {
         return await this.breedsService.findOne(id);
     } 

     @Patch(':id')
     async update(@Param('id') id: number, @Body() updateBreedDto: UpdateBreedDto) {
         return await this.breedsService.update(id, updateBreedDto);
     } 

     @Delete(':id')
     async remove(@Param('id') id: number) {
         return await this.breedsService.remove(id);
     }
}
