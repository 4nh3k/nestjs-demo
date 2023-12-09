import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './schemas/cat.schema';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  create(createCatDto: CreateCatDto) {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  // ...

  findOne(id: string): Promise<Cat> {
    return this.catModel
      .findById(id)
      .exec()
      .then((cat) => {
        if (!cat) {
          throw new NotFoundException(`Cat with id ${id} not found`);
        }
        return cat;
      })
      .catch((error) => {
        throw new InternalServerErrorException(
          `Failed to find cat with id ${id}: ${error}`,
        );
      });
  }
  update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    return this.catModel
      .findByIdAndUpdate(id, updateCatDto, { new: true })
      .exec()
      .catch((error) => {
        throw new InternalServerErrorException(
          `Failed to update cat with id ${id}: ${error}`,
        );
      });
  }

  remove(id: string) {
    return this.catModel
      .findByIdAndDelete(id)
      .exec()
      .catch((error) => {
        throw new InternalServerErrorException(
          `Failed to remove cat with id ${id}: ${error}`,
        );
      });
  }
}
