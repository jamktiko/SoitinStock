import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginForm } from './login-form';

// testing dependencies
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// login mocking dependencies
import { vi } from 'vitest';
import { AuthService } from '../auth.service';

const mockAuthService = {
  login: vi.fn(),
  getToken: vi.fn(),
};

describe('LoginForm', () => {
  let component: LoginForm;
  let fixture: ComponentFixture<LoginForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginForm],
      // testing providers with mock values
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // CUSTOM TESTS:

  // tests that login method calls auth.login
  it('should call auth login method', () => {
    component.login();
    expect(mockAuthService.login).toHaveBeenCalled();
  });

  // tests that output changes when no token exists
  it('should set output to not logged in when token is missing', async () => {
    mockAuthService.getToken.mockReturnValue(null);
    await component.callApi();
    expect(component.output).toBe('Not logged in.');
  });

  // successful API call test
  it('should set output when api call succeeds', async () => {
    mockAuthService.getToken.mockReturnValue('fake-token');
    globalThis.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ success: true }),
    } as Response);
    await component.callApi();
    expect(component.output).toContain('success');
  });

  // failed API call test
  it('should set output to error message when api fails', async () => {
    mockAuthService.getToken.mockReturnValue('fake-token');
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('API failed'));
    await component.callApi();
    expect(component.output).toBe('API failed');
  });
});
