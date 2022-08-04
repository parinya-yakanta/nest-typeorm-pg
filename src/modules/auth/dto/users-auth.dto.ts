import { Matches } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserAuthDto {
  @Expose()
  username: string;

  @Expose()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Minimum eight characters, at least one letter and one number',
  })
  password: string;
}
