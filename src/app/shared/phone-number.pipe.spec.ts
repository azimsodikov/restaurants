import { ComponentFixture } from '@angular/core/testing';
import { DetailsComponent } from './../list/details/details.component';
import { PhoneNumberPipe } from './phone-number.pipe';

describe('PhoneNumberPipe', () => {
  const pipe = new PhoneNumberPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('transforms "6033079393" to "(603) 307-9393"', () => {
    expect(pipe.transform('6033079393')).toBe('(603) 307-9393');
  });
  it('transforms "603-3079393" to "(603) 307-9393"', () => {
    expect(pipe.transform('603-3079393')).toBe('(603) 307-9393');
  });
  it('transforms "(603)3079393" to "(603) 307-9393"', () => {
    expect(pipe.transform('(603)3079393')).toBe('(603) 307-9393');
  });
  it('transforms "(603)-3079393" to "(603) 307-9393"', () => {
    expect(pipe.transform('(603)-3079393')).toBe('(603) 307-9393');
  });
});
