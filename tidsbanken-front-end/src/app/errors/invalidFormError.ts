export class InvalidFormError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidFormError';
  }
}
