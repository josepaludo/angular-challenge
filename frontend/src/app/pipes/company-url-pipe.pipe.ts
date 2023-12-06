import { Pipe, PipeTransform } from '@angular/core';
import { CompanyService } from '../company/company.service';
import { CompanyType } from 'src/types';

@Pipe({
  name: 'companyUrlPipe',
  standalone: true
})
export class CompanyUrlPipePipe implements PipeTransform {

    constructor(private companyService: CompanyService) {}

    transform(company: CompanyType, ...args: unknown[]): string {
        return '/company/'+company.name+'/home'
    }

}
