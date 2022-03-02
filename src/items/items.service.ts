/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {

    constructor(@InjectModel('Item') private readonly itemModel: Model<Item>){}
    


    async findAll(): Promise<Item[]> {
        return await this.itemModel.find();
    }

    async fineOne(id: string): Promise<Item>{
        return await this.itemModel.findOne({_id: id});
    }

    async create(item: CreateItemDto): Promise<Item> {
       
        const newitem = new this.itemModel(item);
        return await newitem.save();
    }

    async delete(id: string) : Promise<Item> {
        return await this.itemModel.findByIdAndRemove(id)
    }

    async update(id:string, item: CreateItemDto) : Promise<Item> {
        return await this.itemModel.findByIdAndUpdate({_id: id}, item, { new: true} )
    }
 }
