import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact.component';
import { CommonModule, JsonPipe } from '@angular/common';
 
describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, ContactComponent],
      declarations: [],
      providers: [JsonPipe]
    }).compileComponents();
 
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  // first test case
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
 
  // second test case
  it('should initialize form controls', () => {
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('phone')).toBeTruthy();
    expect(component.form.contains('message')).toBeTruthy();
  });
 
  // third test case
  it('should call onSave method on form submission', () => {
    spyOn(component, 'onSave').and.callThrough();
 
    component.form.controls['name'].setValue('John Doe');
    component.form.controls['email'].setValue('john@example.com');
    component.form.controls['phone'].setValue('1234567890');
    component.form.controls['message'].setValue('Hello! Paul');
 
    const formElement = fixture.nativeElement.querySelector('form');
    formElement.dispatchEvent(new Event('submit'));
 
    expect(component.onSave).toHaveBeenCalled();
    expect(component.form.value).toEqual({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      message: 'Hello! Paul'
    });
  });
 
  // fourth test case
  it('should validate name field correctly', () => {
    const nameControl = component.form.controls['name'];
    nameControl.setValue('');
    expect(nameControl.errors?.['required']).toBeTruthy();
 
    nameControl.setValue('abc');
    expect(nameControl.errors?.['minlength']).toBeTruthy();
 
    nameControl.setValue('abcd');
    expect(nameControl.valid).toBeTrue();
  });
 
  // fifth test case
  it('should validate email field correctly', () => {
    const emailControl = component.form.controls['email'];
    emailControl.setValue('');
    expect(emailControl.errors?.['required']).toBeTruthy();
 
    emailControl.setValue('invalid-email');
    expect(emailControl.errors?.['emailError']).toBeTruthy();
 
    emailControl.setValue('test@example');
    expect(emailControl.errors?.['emailError']).toBeTruthy();
 
    emailControl.setValue('test@example.com');
    expect(emailControl.valid).toBeTrue();
  });
 
  // sixth test case
  it('should validate phone field correctly', () => {
    const phoneControl = component.form.controls['phone'];
    phoneControl.setValue('');
    expect(phoneControl.errors?.['required']).toBeTruthy();
 
    phoneControl.setValue('1234567890');
    expect(phoneControl.valid).toBeTrue();
  });
})