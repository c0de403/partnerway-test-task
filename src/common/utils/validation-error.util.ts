import { ValidationError } from 'class-validator';
import { iterate } from 'iterare';

export class ValidationErrorUtil {
  public static prettifyAndTransformToText(
    validationErrors: ValidationError[],
  ): string {
    const errorMessages = validationErrors.map((error, index) => {
      if (index === 0) {
        return error.toString(true, false, '', true);
      } else {
        return error.toString(true, true, '', true);
      }
    });

    const prettifiedTextErrors = errorMessages.join('');

    return prettifiedTextErrors;
  }

  public static flatten(validationErrors: ValidationError[]): string {
    return iterate<ValidationError>(validationErrors)
      .map((error) => this.mapChildrenToValidationErrors(error))
      .flatten()
      .filter((item) => !!item.constraints)
      .map((item) => Object.values(item.constraints))
      .flatten()
      .toArray()
      .reverse()
      .join('; ');
  }

  public static mapChildrenToValidationErrors(
    error: ValidationError,
    parentPath?: string,
  ): ValidationError[] {
    if (!(error.children && error.children.length)) {
      return [error];
    }

    const validationErrors: ValidationError[] = [];
    parentPath = parentPath
      ? `${parentPath}.${error.property}`
      : error.property;

    for (const item of error.children) {
      if (item.children && item.children.length) {
        validationErrors.push(
          ...this.mapChildrenToValidationErrors(item, parentPath),
        );
      }

      validationErrors.push(
        this.prependConstraintsWithParentProp(parentPath, item),
      );
    }

    return validationErrors;
  }

  private static prependConstraintsWithParentProp(
    parentPath: string,
    error: ValidationError,
  ): ValidationError {
    const constraints = {};

    for (const key in error.constraints) {
      constraints[key] = `${parentPath}.${error.constraints[key]}`;
    }
    return {
      ...error,
      constraints,
    };
  }
}
