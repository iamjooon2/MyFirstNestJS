import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

    // status 변환
    transform(value: any): any {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is not status`);
        }

        return value;
    }

    // status 에러처리
    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);

        return index !== -1;
    }
}
