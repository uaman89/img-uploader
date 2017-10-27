import {TestBed, inject, async} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {UsersService} from './users.service';
import {HttpClientModule} from '@angular/common/http';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        AuthService
      ],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('user should pass authorization', async(
    inject([AuthService], (service: AuthService) => {

      // get credentials from assets/users.json
      service.login({
        email: 'user3@gmail.com',
        password: 'test1233'
      }).then(
        result => expect(result).toBeTruthy()
      );

    }))
  );

  it('user should NOT pass authorization', async(
    inject([AuthService], (service: AuthService) => {

      return service.login({
        email: 'xxx',
        password: 'xxx'
      }).then(
        result => {
          console.log('result');
          expect(result).toBeFalsy();
        }
      );

    }))
  );

});
